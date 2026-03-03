// index.js
import { checkEnvironment, env } from "./utils.js";
import OpenAI from "openai";

// 1. Verify we have everything before starting
checkEnvironment();

// 2. Initialize the client
const openai = new OpenAI({
    apiKey: env.VITE_AI_KEY,
    baseURL: env.VITE_AI_URL,
    dangerouslyAllowBrowser: true // Required if you ever run this in a browser
});

async function getGiftSuggestions() {
    try {
        console.log("🚀 Sending request to AI...");

        const response = await openai.chat.completions.create({
            model: env.VITE_AI_MODEL,
            messages: [
                { 
                    role: "user", 
                    content: "Suggest 3 unique gifts for someone who loves hiphop music." 
                }
            ],
        });

        // 3. Extract and display the answer
        const answer = response.choices[0].message.content;
        console.log("\n--- 🎤 AI GIFT SUGGESTIONS ---");
        console.log(answer);

    } catch (error) {
        console.error("❌ API Call Failed:", error.message);
    }
}

getGiftSuggestions();