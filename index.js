import {  checkEnvironment, env, autoResizeTextarea, setLoading,  } from "./utils.js"
import OpenAI from "openai"

checkEnvironment()

const openai = new OpenAI({
    apiKey: env.VITE_AI_KEY,
    baseURL: env.VITE_AI_URL,
    dangerouslyAllowBrowser: true 
})

// UI elements
const giftForm = document.getElementById("gift-form")
const userInput = document.getElementById("user-input")
const outputContent = document.getElementById("output-content")

// Eventlisteners
function start() {
  userInput.addEventListener("input", () => autoResizeTextarea(userInput))
  giftForm.addEventListener("submit", getGiftSuggestions)
}

// System Prompt
const messages = [
  {
    role: "system",
    content: `You are the Gift Genie!
    Make your gift suggestions thoughtful and practical.
    Your response must be under 100 words. 
    Skip intros and conclusions. 
    Only output gift suggestions.`,
  },
]

async function getGiftSuggestions(e) {
    e.preventDefault()

    try {
        const userPrompt = userInput.value.trim()
        if (!userPrompt) throw new Error("User prompt is empty")
        
        setLoading(true)

        messages.push({
            role: "user",
            content: userPrompt
        })
        const response = await openai.chat.completions.create({
            model: env.VITE_AI_MODEL,
            messages
        })
        outputContent.textContent = response.choices[0].message.content

    } catch (error) {
        console.error(" Something went wrong, please try again later.", error.message)
        outputContent.textContent = "Sorry, I can't access what I need right now. Please try again."
    }finally{
        setLoading(false)
    }
}

start()