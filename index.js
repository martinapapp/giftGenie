import {  autoResizeTextarea, setLoading } from "./utils.js"
import {marked} from 'marked'
import DOMPurify from 'dompurify'


// UI elements
const giftForm = document.getElementById("gift-form")
const userInput = document.getElementById("user-input")
const outputContent = document.getElementById("output-content")

// Eventlisteners
function start() {
  userInput.addEventListener("input", () => autoResizeTextarea(userInput))
  giftForm.addEventListener("submit", handleGiftSuggestions)
}

//Connect with Server
async function handleGiftSuggestions(e) {
    e.preventDefault()

    const userPrompt = userInput.value.trim()
    if (!userPrompt) throw new Error("User prompt is empty")
        
    setLoading(true)

    try {
        const response = await fetch("/api/gift", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                userPrompt
            })
        })

        const data = await response.json()

        if(!response.ok) throw new Error(data.message)

        const sanitizedRes = DOMPurify.sanitize(marked.parse(data.giftSuggestions))
        outputContent.innerHTML = sanitizedRes

    } catch (err) {
        console.error(err)
        outputContent.textContent = "Sorry, I can't access what I need right now. Please try again later."
   
    }finally{
        setLoading(false)
    }
}

start()