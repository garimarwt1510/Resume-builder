// filename: backend/services/aiService.js
const OpenAI = require("openai");

// Lazily instantiate the OpenAI client only when needed, so the app can boot
// without an API key set (AI routes will simply fail with a clear error).
let openaiClient = null;
const getOpenAIClient = () => {
  if (!openaiClient) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not configured on the server");
    }
    openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openaiClient;
};

/**
 * Calls the Google Gemini REST API (generateContent, streamed via SSE chunks
 * simulated by streamGenerateContent) using fetch, so we avoid an extra SDK dependency.
 */
const callGemini = async function* (prompt) {
  const model = process.env.GEMINI_MODEL || "gemini-1.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${process.env.GEMINI_API_KEY}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    }),
  });

  if (!response.ok || !response.body) {
    const text = await response.text();
    throw new Error(`Gemini API error: ${text}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split("\n");
    buffer = lines.pop(); // keep incomplete line for next chunk

    for (const line of lines) {
      if (!line.startsWith("data:")) continue;
      const jsonStr = line.replace(/^data:\s*/, "").trim();
      if (!jsonStr || jsonStr === "[DONE]") continue;
      try {
        const parsed = JSON.parse(jsonStr);
        const chunkText = parsed?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (chunkText) yield chunkText;
      } catch {
        // ignore malformed SSE fragments
      }
    }
  }
};

/**
 * Calls OpenAI's chat completions endpoint in streaming mode and yields text chunks.
 */
const callOpenAI = async function* (prompt) {
  const client = getOpenAIClient();
  const stream = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are an expert resume writer and career coach. Be concise, concrete, and use strong action verbs. Avoid generic filler.",
      },
      { role: "user", content: prompt },
    ],
    stream: true,
    temperature: 0.7,
  });

  for await (const chunk of stream) {
    const delta = chunk.choices?.[0]?.delta?.content;
    if (delta) yield delta;
  }
};

/**
 * Provider-agnostic streaming generator. Picks OpenAI or Gemini based on
 * AI_PROVIDER env var and yields text chunks as they arrive.
 */
async function* streamCompletion(prompt) {
  const provider = (process.env.AI_PROVIDER || "openai").toLowerCase();
  if (provider === "gemini") {
    yield* callGemini(prompt);
  } else {
    yield* callOpenAI(prompt);
  }
}

/**
 * Non-streaming helper used when the caller just wants a full string
 * (e.g. background jobs). Internally just drains the streaming generator.
 */
const getCompletion = async (prompt) => {
  let full = "";
  for await (const chunk of streamCompletion(prompt)) {
    full += chunk;
  }
  return full;
};

module.exports = { streamCompletion, getCompletion };
