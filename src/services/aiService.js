// filename: frontend/src/services/aiService.js
import { API_BASE_URL } from "./api";

/**
 * Calls a streaming AI endpoint using fetch (axios cannot stream response
 * bodies in the browser). Invokes onChunk(text) as data arrives, and
 * resolves with the full accumulated text when the stream ends.
 *
 * @param {string} endpoint - e.g. "/ai/summary"
 * @param {object} body - JSON payload for the request
 * @param {(chunk: string) => void} onChunk - called for each text chunk received
 * @param {AbortSignal} [signal] - optional abort signal to cancel the request
 */
export const streamAI = async (endpoint, body, onChunk, signal) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(body),
    signal,
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.message || `AI request failed (${response.status})`);
  }

  if (!response.body) {
    // Fallback: some environments may not support streaming bodies
    const text = await response.text();
    onChunk(text);
    return text;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let fullText = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    fullText += chunk;
    onChunk(chunk);
  }

  return fullText;
};

// Convenience wrappers for each AI feature endpoint
export const aiEndpoints = {
  summary: "/ai/summary",
  improveExperience: "/ai/improve-experience",
  skills: "/ai/skills",
  rewriteBullet: "/ai/rewrite-bullet",
  achievements: "/ai/achievements",
  coverLetter: "/ai/cover-letter",
  atsCheck: "/ai/ats-check",
  grammar: "/ai/grammar",
  tone: "/ai/tone",
  review: "/ai/review",
};
