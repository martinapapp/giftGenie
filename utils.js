export const env = typeof import.meta.env !== 'undefined' ? import.meta.env : process.env

export function checkEnvironment() {
    const required = ['VITE_AI_URL', 'VITE_AI_MODEL', 'VITE_AI_KEY']
    
    for (const key of required) {
        if (!env[key]) {
            throw new Error(`Environment Error: Missing ${key} in .env file.`)
        }
    }
    console.log("Environment check passed.")
}


export function autoResizeTextarea(textarea) {
    textarea.style.height = "auto"
    textarea.style.height = `${textarea.scrollHeight}px`
}

export function setLoading(isLoading) {
    const lampButton = document.getElementById("lamp-button")
    const lampText = document.querySelector(".lamp-text")
    const userInput = document.getElementById("user-input")
    const outputContainer = document.getElementById("output-container")

    lampButton.disabled = isLoading

    if (isLoading) {
        // Reset textarea and hide previous output
        userInput.style.height = "auto"
        outputContainer.classList.add("hidden")
        outputContainer.classList.remove("visible")

        // Animate lamp
        lampButton.classList.remove("compact")
        lampButton.classList.add("loading")
        lampText.textContent = "Summoning Gift Ideas..."
    } else {
        // Restore lamp to compact state
        outputContainer.classList.remove("hidden")
        outputContainer.classList.add("visible")
        lampButton.classList.remove("loading")
        lampButton.classList.add("compact")
        lampText.textContent = "Rub the Lamp"
    }
}

export function showStream() {
  const outputContainer = document.getElementById("output-container");
  outputContainer.classList.remove("hidden");
  outputContainer.classList.add("visible");
}