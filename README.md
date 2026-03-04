# Gift Genie 🧞

![MIT License](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/node-v22-brightgreen)
![Vite](https://img.shields.io/badge/vite-7.x-646CFF)
![Express](https://img.shields.io/badge/express-4.x-black)
![OpenAI](https://img.shields.io/badge/openai-6.x-412991)

An AI-powered gift idea generator. Describe who you're shopping for, set a budget, and let the Genie do the rest.

## Index

- [About](#about)
- [Usage](#usage)
- [Development](#development)
- [Contribution](#contribution)
- [License](#license)

---

## About

Gift Genie uses an LLM to suggest thoughtful, specific gift ideas based on a natural language prompt. The main goal was to learn how to:

- Connect a **Vite** frontend to an **Express** backend during development using a proxy
- Use the **OpenAI SDK** to send and receive messages from an LLM
- Manage a **conversation history** array with a system prompt
- Work with **environment variables** across both Vite (browser) and Node.js (server) contexts using `dotenv`
- Parse and safely render **Markdown** responses using `marked` and `DOMPurify`
- Handle **loading states** and UI feedback for async operations

---

## Usage

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root with your API credentials:
   ```
   VITE_AI_KEY=your_api_key
   VITE_AI_URL=your_api_base_url
   VITE_AI_MODEL=your_model_name
   ```
4. Start the app:
   ```bash
   npm start
   ```
5. Open your browser at `http://localhost:5173`

### Commands

I'm using Vite to make development faster. Here are the main scripts I use:

```
npm start          // Starts both the Vite frontend and Express backend concurrently.
npm run client     // Starts only the Vite dev server.
npm run server     // Starts only the Express backend with hot reload.
npm run build      // Prepares the project for the real world (deployment).
npm run preview    // Lets me check the build version locally.
```

### Testing the Backend

To test the Express API directly without the frontend, make sure the server is running (`npm start` or `npm run server`) then run:

```bash
curl -X POST http://localhost:3001/api/gift \
  -H "Content-Type: application/json" \
  -d '{"userPrompt": "gift for a friend who loves hiking, $50 budget"}'
```

---

## Development

### Pre-Requisites

- A code editor
- Node.js v18 or higher
- An API key for an OpenAI-compatible LLM provider
- Basic familiarity with JavaScript and the terminal

### File Structure

| No | File Name | What it does |
| -- | --------- | ------------ |
| 1 | `index.html` | Main HTML shell — defines the layout and loads the JS module |
| 2 | `index.js` | Frontend logic — handles form submission, fetch call, and rendering the response |
| 3 | `server.js` | Express backend — receives the user prompt and calls the LLM API |
| 4 | `systemPrompt.js` | The LLM system prompt — defines the Genie's personality and output format |
| 5 | `utils.js` | Shared utilities — env loading, textarea auto-resize, loading state management |
| 6 | `style.css` | All styles — layout, animations, responsive design |
| 7 | `vite.config.js` | Vite config — sets up the `/api` proxy to the Express server |
| 8 | `package.json` | Project metadata, scripts, and dependencies |

### Build

The frontend (Vite) and backend (Express) run as two separate servers during development. Vite proxies any `/api/*` requests to Express on port 3001, so the browser only ever talks to one origin. The user types a prompt, the frontend POSTs it to `/api/gift`, Express forwards it to the LLM with a conversation history, and the Markdown response is parsed and rendered back in the UI.

---

## Contribution

1. Found a bug? Open an issue and I'll try to fix it.
2. Advice? If you have ideas for improving gift suggestions or the UI, let me know!

---

## License

Feel free to use this for your own practice! **MIT** License.