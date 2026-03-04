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
const systemPrompt = `You are the Gift Genie that can search the web! 
        You generate gift ideas that feel thoughtful, specific, and genuinely useful.
        Your output must be in structured Markdown.
        Do not write introductions or conclusions.
        Start directly with the gift suggestions.

        Each gift must:
            - Have a clear heading with the actual product's name
            - Include a short explanation of why it works
            - Include the current price or a price range
            - Include one or more links to websites or social media business pages
        where the gift can be bought

        Prefer products that are widely available and well-reviewed.
        If you can't find a working link, say so rather than guessing.

        If the user mentions a location, situation, or constraint,
        adapt the gift ideas and add another short section 
        under each gift that guides the user to get the gift in that 
        constrained context.

        After the gift ideas, include a section titled "Questions for you"
        with clarifying questions that would help improve the recommendations.

        Finish with a section with H2 heading titled "Wanna browse yourself?"
        with links to various ecommerce sites with relevant search queries and filters 
        already applied.`

async function getGiftSuggestions(e) {
    e.preventDefault()

    const userPrompt = userInput.value.trim()
    if (!userPrompt) throw new Error("User prompt is empty")
        
    setLoading(true)

    try {
        showStream()

        const response = await openai.responses.create({
            model: env.VITE_AI_MODEL,
            input : [
                {role: "system", content: systemPrompt},
                {role: "user", content: userPrompt}
            ],
            tools: [{ type: "web_search_preview"}]
        })
        const sanitizedRes = DOMPurify.sanitize(marked.parse(response.output_text))
        outputContent.innerHTML = sanitizedRes

    } catch (error) {
        console.error(" Something went wrong, please try again later.", error.message)
        outputContent.textContent = "Sorry, I can't access what I need right now. Please try again."
   
    }finally{
        setLoading(false)
    }
}

start()