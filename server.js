import express from "express"
import OpenAI from "openai"
import 'dotenv/config'
import { checkEnvironment, env} from './utils.js'
import { systemPrompt } from "./systemPrompt.js"
import { fileURLToPath } from 'url'
import path from 'path'


checkEnvironment()

//initialize express
const app = express()
app.use(express.json())

//initialize openai
const openai = new OpenAI({
    apiKey: env.AI_KEY,
    baseURL: env.AI_URL
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
            model : env.AI_MODEL,
            messages
        })
        const giftSuggestions = completion.choices[0].message.content
        res.status(200).json({giftSuggestions})

    }catch(err){
        console.error(err)
        res.status(500).json({message: `Something went wrong on the server`})
    }
})

//
const __dirname = path.dirname(fileURLToPath(import.meta.url))

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'dist')))
    app.get('*', ((req,res)=>{
        res.sendFile(path.join(__dirname, 'dist', 'index.html'))
    }))
}

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{console.log(`Server running on port: ${PORT}`)})