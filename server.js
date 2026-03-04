import express from "express"
import OpenAI from "openai"
import 'dotenv/config'
import { checkEnvironment, env} from './utils.js'
import { systemPrompt } from "./systemPrompt.js"

checkEnvironment()

//initialize express
const app = express()
app.use(express.json())

//initialize openai
const openai = new OpenAI({
    apiKey: env.VITE_AI_KEY,
    baseURL: env.VITE_AI_URL
})

//initialize messages [] with system prompt
const messages = [
    {role: "system", content: systemPrompt}
]

//connect with AI and Frontend
app.post('/api/gift', async (req, res) => {
    
    const {userPrompt} = req.body
    messages.push({role: "user", content : userPrompt})

    try{
        const completion = await openai.chat.completions.create({
            model : env.VITE_AI_MODEL,
            messages
        })
        const giftSuggestions = completion.choices[0].message.content
        res.status(200).json({giftSuggestions})

    }catch(err){
        console.error(err)
        res.status(500).json({message: `Something went wrong on the server`})
    }
})

const PORT = 3001
app.listen(PORT, ()=>{console.log(`Server running on port: ${PORT}`)})