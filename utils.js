export function checkEnvironment() {
  if (!import.meta.env.VITE_AI_URL) {
    throw new Error("Missing AI_URL. This tells us which AI provider you're using.")
  }

  if (!import.meta.env.VITE_AI_MODEL) {
    throw new Error("Missing AI_MODEL. The AI request needs a model name.")
  }

  if (!import.meta.env.VITE_AI_KEY) {
    throw new Error("Missing AI_KEY. Your API key is not being picked up.")
  }
}