// utils.js

// This helper picks the right "container" for your variables
export const env = typeof import.meta.env !== 'undefined' ? import.meta.env : process.env;

export function checkEnvironment() {
    const required = ['VITE_AI_URL', 'VITE_AI_MODEL', 'VITE_AI_KEY'];
    
    for (const key of required) {
        if (!env[key]) {
            throw new Error(`❌ Environment Error: Missing ${key} in .env file.`);
        }
    }
    console.log("✅ Environment check passed.");
}