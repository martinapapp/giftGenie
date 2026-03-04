import {  checkEnvironment, env, autoResizeTextarea, setLoading, showStream } from "./utils.js"
import OpenAI from "openai"
import {marked} from 'marked'
import DOMPurify from 'dompurify'

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
    The user will describe the gift's recipient. 
    Your response must be in structured Markdown.
    Each gift must: 
      - Have a clear heading
      - A short explanation of why it would work

    Skip intros and conclusions. 
    Only output gift suggestions.
    
    End with a section with an H3 heading titled "Questions for you" 
    that contains follow-ups that would help improve the 
    gift suggestions.`,
  },
]

async function getGiftSuggestions(e) {
    e.preventDefault()

    const userPrompt = userInput.value.trim()
    if (!userPrompt) throw new Error("User prompt is empty")
        
    setLoading(true)

    messages.push({
        role: "user",
        content: userPrompt
    })

    try {
        const response = await openai.chat.completions.create({
            model: env.VITE_AI_MODEL,
            messages,
            stream: true
        })
        
        let giftSuggestions = ''

        showStream()

        for await(const chunk of response){
            giftSuggestions += chunk.choices[0].delta.content ?? ""
            const sanitizedRes = DOMPurify.sanitize(marked.parse(giftSuggestions))
            outputContent.innerHTML = sanitizedRes
        }

    } catch (error) {
        console.error(" Something went wrong, please try again later.", error.message)
        outputContent.textContent = "Sorry, I can't access what I need right now. Please try again."
   
    }finally{
        setLoading(false)
    }
}

start()