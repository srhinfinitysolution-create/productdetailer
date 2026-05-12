import React, { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setStatusMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok || !payload?.success) {
        throw new Error(payload?.message || "Failed to send message");
      }

      setStatus("sent");
      setStatusMessage("Message sent successfully.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error: any) {
      setStatus("error");
      setStatusMessage(error.message || "Failed to send message");
    }
  };

  return (
    <div className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Get in touch
          </h1>

          <p className="text-slate-600 text-lg">
            Have questions about pricing, features, or enterprise plans?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">

          <div className="bg-slate-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-8">
              Contact Information
            </h2>

            <div className="space-y-8">

              <div>
                <h3 className="font-semibold text-lg">
                  Email
                </h3>

                <p className="text-slate-600 mt-2">
                  contact@productdetailer.com
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Office
                </h3>

                <p className="text-slate-600 mt-2">
                  1000 7th St
                  <br />
                  Farmington MN 55024
                </p>
              </div>

            </div>
          </div>

          <div className="bg-white rounded-2xl">

            <form className="space-y-6" onSubmit={handleSubmit}>
              {statusMessage && (
                <div
                  className={`rounded-xl px-4 py-3 text-sm ${
                    status === "sent"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {statusMessage}
                </div>
              )}

              <div>
                <label className="block mb-2">
                  Name
                </label>

                <input
                  type="text"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full border rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block mb-2">
                  Email
                </label>

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full border rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block mb-2">
                  Message
                </label>

                <textarea
                  rows={5}
                  required
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className="w-full border rounded-xl px-4 py-3"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-indigo-600 text-white py-4 rounded-xl"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;
