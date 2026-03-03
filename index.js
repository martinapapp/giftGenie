import { checkEnvironment } from "./utils.js"
import OpenAI from "openai"

checkEnvironment();

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_AI_KEY,
  baseURL: import.meta.env.VITE_AI_URL, 
  dangerouslyAllowBrowser: true
})

