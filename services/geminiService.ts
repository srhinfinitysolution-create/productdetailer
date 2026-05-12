import { ProductFormData } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const generateProductDescription = async (
  data: ProductFormData
): Promise<string> => {
  const response = await fetch(`${API_BASE_URL}/api/generate-text`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok || !payload?.success) {
    throw new Error(payload?.message || "Failed to generate description.");
  }

  if (!payload.text) {
    throw new Error("The server returned an empty description.");
  }

  return payload.text.trim();
};
