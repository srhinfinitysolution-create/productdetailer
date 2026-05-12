const express = require("express");
const cors = require("cors");
const multer = require("multer");
const XLSX = require("xlsx");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const { GoogleGenAI } = require("@google/genai");

dotenv.config();

const PORT = Number(process.env.PORT || 5000);
const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";
const GEMINI_API_VERSION = process.env.GEMINI_API_VERSION || "v1";
const GEMINI_MAX_RETRIES = Number(process.env.GEMINI_MAX_RETRIES || 3);
const GEMINI_TIMEOUT_MS = Number(process.env.GEMINI_TIMEOUT_MS || 60000);
const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
const CONTACT_TO = process.env.CONTACT_TO || "contact@productdetailer.com";

const app = express();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

let generatedResults = [];

app.use(cors({ origin: true }));
app.use(express.json({ limit: "1mb" }));

const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        apiVersion: GEMINI_API_VERSION,
        timeout: GEMINI_TIMEOUT_MS,
      },
    })
  : null;

function getMailTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Email service is not configured. Add SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS to backend/.env.");
    }

    console.warn("SMTP is not configured. Using local JSON email transport.");
    return nodemailer.createTransport({ jsonTransport: true });
  }

  return nodemailer.createTransport({
  host,
  port,
  secure: false,
  requireTLS: true,
  family: 4,
  auth: {
    user,
    pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
  connectionTimeout: 30000,
});
}

function requireGemini() {
  if (!ai) {
    throw new Error("GEMINI_API_KEY is missing in backend/.env");
  }

  return ai;
}

function cleanText(value) {
  if (value === undefined || value === null) return "";
  return String(value).trim();
}

function escapeHtml(value) {
  return cleanText(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function pickValue(row, keys) {
  for (const key of keys) {
    if (row[key] !== undefined && row[key] !== null && cleanText(row[key])) {
      return cleanText(row[key]);
    }
  }

  const normalized = Object.entries(row).reduce((acc, [key, value]) => {
    acc[key.toLowerCase().replace(/[^a-z0-9]/g, "")] = value;
    return acc;
  }, {});

  for (const key of keys) {
    const found = normalized[key.toLowerCase().replace(/[^a-z0-9]/g, "")];
    if (found !== undefined && found !== null && cleanText(found)) {
      return cleanText(found);
    }
  }

  return "";
}

function buildPrompt(product) {
  return `
You are an expert ecommerce copywriter.

Write a polished, SEO-friendly product description using only the product details below.

Product name: ${product.productName}
Category: ${product.category || "Not provided"}
Key features: ${product.features || "Not provided"}
Target audience: ${product.targetAudience || "General ecommerce shoppers"}
Platform: ${product.platform || "General ecommerce"}
Tone: ${product.tone || "Professional and persuasive"}
SEO keywords: ${product.keywords || "Not provided"}
Length: ${product.length || "Around 120-180 words"}

Requirements:
- Do not mention missing fields.
- Avoid markdown formatting.
- Focus on customer benefits, not just specifications.
- Use natural, sales-ready language.
- Return only the finished product copy.
`.trim();
}

function normalizeGeminiError(error, fallbackMessage) {
  let status = error.status || error.code || 500;
  let message = error.message || fallbackMessage;

  try {
    const parsed = JSON.parse(message);
    if (parsed?.error) {
      message = parsed.error.message || message;
      status = parsed.error.code || status;
    }
  } catch {
    // Gemini sometimes returns plain text messages.
  }

  if (String(message).includes("RESOURCE_EXHAUSTED")) {
    status = 429;
  }

  if (String(message).toLowerCase().includes("overload")) {
    status = 503;
  }

  if (String(message).toLowerCase().includes("api key")) {
    status = status === 500 ? 401 : status;
  }

  return {
    status: Number(status) >= 400 && Number(status) < 600 ? Number(status) : 500,
    message,
  };
}

function isRetryableGeminiError(error) {
  const normalized = normalizeGeminiError(error, "Gemini request failed");
  const message = cleanText(error?.message).toLowerCase();

  return (
    [429, 500, 502, 503, 504].includes(normalized.status) ||
    message.includes("resource_exhausted") ||
    message.includes("rate limit") ||
    message.includes("quota") ||
    message.includes("overload") ||
    message.includes("unavailable") ||
    message.includes("temporarily")
  );
}

function getRetryDelayMs(error, attempt) {
  const retryAfter =
    error?.response?.headers?.get?.("retry-after") ||
    error?.headers?.get?.("retry-after") ||
    error?.headers?.["retry-after"];

  if (retryAfter) {
    const retryAfterSeconds = Number(retryAfter);
    if (Number.isFinite(retryAfterSeconds)) {
      return Math.min(retryAfterSeconds * 1000, 10000);
    }

    const retryAfterDate = Date.parse(retryAfter);
    if (!Number.isNaN(retryAfterDate)) {
      return Math.min(Math.max(retryAfterDate - Date.now(), 0), 10000);
    }
  }

  const baseDelay = 600 * 2 ** (attempt - 1);
  const jitter = Math.floor(Math.random() * 250);

  return Math.min(baseDelay + jitter, 8000);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function clientErrorMessage(error, fallbackMessage) {
  const normalized = normalizeGeminiError(error, fallbackMessage);

  if (normalized.status === 401 || normalized.status === 403) {
    return "Gemini is not configured correctly on the server. Please check the API key and permissions.";
  }

  if (normalized.status === 429) {
    return "Gemini is rate limited right now. Please wait a moment and try again.";
  }

  if ([500, 502, 503, 504].includes(normalized.status)) {
    return "Gemini is temporarily unavailable. Please try again in a moment.";
  }

  if (normalized.status === 400 && normalized.message.toLowerCase().includes("model")) {
    return `The configured Gemini model "${MODEL}" is not available for this API key. Set GEMINI_MODEL to a supported model such as gemini-2.5-flash-lite.`;
  }

  return normalized.message || fallbackMessage;
}

function sendError(res, error, fallbackMessage) {
  const normalized = normalizeGeminiError(error, fallbackMessage);

  res.status(normalized.status).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? clientErrorMessage(error, fallbackMessage)
        : normalized.message,
    retryable: isRetryableGeminiError(error),
  });
}

function extractGeminiText(response) {
  const directText =
    typeof response.text === "function" ? response.text() : response.text;

  if (cleanText(directText)) {
    return cleanText(directText);
  }

  const parts = response.candidates?.flatMap((candidate) => candidate.content?.parts || []) || [];
  const text = parts.map((part) => part.text).filter(Boolean).join("\n");

  return cleanText(text);
}

async function generateDescription(product) {
  const client = requireGemini();
  const prompt = buildPrompt(product);
  let lastError;

  for (let attempt = 1; attempt <= GEMINI_MAX_RETRIES + 1; attempt += 1) {
    try {
      const response = await client.models.generateContent({
        model: MODEL,
        contents: prompt,
        config: {
          temperature: 0.75,
          topP: 0.95,
        },
      });

      const text = extractGeminiText(response);
      if (!text) {
        throw new Error("Gemini returned an empty response");
      }

      return text;
    } catch (error) {
      lastError = error;

      if (attempt > GEMINI_MAX_RETRIES || !isRetryableGeminiError(error)) {
        throw error;
      }

      const delayMs = getRetryDelayMs(error, attempt);
      console.warn(
        `Gemini request failed on attempt ${attempt}; retrying in ${delayMs}ms`,
        normalizeGeminiError(error, "Gemini request failed")
      );
      await sleep(delayMs);
    }
  }

  throw lastError || new Error("Gemini request failed");
}

function parseWorkbook(buffer) {
  const workbook = XLSX.read(buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];

  if (!sheetName) {
    throw new Error("The uploaded spreadsheet has no sheets");
  }

  const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
    defval: "",
  });

  if (!rows.length) {
    throw new Error("The uploaded spreadsheet has no product rows");
  }

  return rows;
}

function rowToProduct(row, index) {
  const productName =
    pickValue(row, ["Product", "Product Name", "Name", "Title", "product", "title", "name"]) ||
    `Product ${index + 1}`;

  return {
    productName,
    category: pickValue(row, ["Category", "Product Category", "category"]),
    features: pickValue(row, ["Key Features", "Features", "Description", "Bullets", "features"]),
    targetAudience: pickValue(row, ["Target Audience", "Audience", "targetAudience"]),
    platform: pickValue(row, ["Platform", "Marketplace", "platform"]),
    tone: pickValue(row, ["Tone", "tone"]),
    keywords: pickValue(row, ["Keywords", "SEO Keywords", "Search Terms", "keywords"]),
    length: pickValue(row, ["Length", "Word Count", "length"]),
  };
}

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ProductDetailer backend is running",
    model: MODEL,
  });
});

app.get("/health", (req, res) => {
  res.json({
    success: true,
    geminiConfigured: Boolean(apiKey),
    storedResults: generatedResults.length,
  });
});

app.post("/api/generate-text", async (req, res) => {
  try {
    const productName = cleanText(req.body.productName);

    if (!productName) {
      return res.status(400).json({
        success: false,
        message: "Product name is required",
      });
    }

    const text = await generateDescription({
      productName,
      category: cleanText(req.body.category),
      features: cleanText(req.body.features),
      targetAudience: cleanText(req.body.targetAudience),
      platform: cleanText(req.body.platform),
      tone: cleanText(req.body.tone),
      keywords: cleanText(req.body.keywords),
      length: cleanText(req.body.length),
    });

    res.json({ success: true, text });
  } catch (error) {
    console.error("Text generation failed:", error);
    sendError(res, error, "Text generation failed");
  }
});

app.post("/api/contact", async (req, res) => {
  try {
    const name = cleanText(req.body.name);
    const email = cleanText(req.body.email);
    const message = cleanText(req.body.message);

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required",
      });
    }

    const transporter = getMailTransporter();
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: CONTACT_TO,
      replyTo: email,
      subject: `New ProductDetailer contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
    });

    res.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Contact email failed:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to send message",
    });
  }
});

app.post("/generate", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const rows = parseWorkbook(req.file.buffer);
    const results = [];

    for (const [index, row] of rows.entries()) {
      const product = rowToProduct(row, index);
      const description = await generateDescription(product);

      results.push({
        Product: product.productName,
        Category: product.category,
        Description: description,
      });
    }

    generatedResults = results;

    res.json({
      success: true,
      count: results.length,
      results,
    });
  } catch (error) {
    console.error("Bulk generation failed:", error);
    sendError(res, error, "Bulk generation failed");
  }
});

app.get("/download", (req, res) => {
  try {
    if (!generatedResults.length) {
      return res.status(404).json({
        success: false,
        message: "No generated results are available to download",
      });
    }

    const worksheet = XLSX.utils.json_to_sheet(generatedResults);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Descriptions");

    const buffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "buffer",
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", 'attachment; filename="generated.xlsx"');
    res.send(buffer);
  } catch (error) {
    console.error("Download failed:", error);
    sendError(res, error, "Download failed");
  }
});

app.get("/test-ai", async (req, res) => {
  try {
    const text = await generateDescription({
      productName: "Test Product",
      category: "Test",
      features: "Simple API connectivity test",
      targetAudience: "Developers",
      platform: "General",
      tone: "Professional",
      keywords: "test",
      length: "One sentence",
    });

    res.json({ success: true, text });
  } catch (error) {
    console.error("Gemini test failed:", error);
    sendError(res, error, "Gemini test failed");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
