import OpenAI from "openai";  // ✅ Use OpenAI instead of Configuration, OpenAIApi
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // ✅ Pass API key directly
});

export async function generateAIAnalysis(summary) {
    const prompt = `Analyze the following folder structure and suggest improvements:\n${JSON.stringify(summary, null, 2)}`;
    
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "system", content: prompt }],
        max_tokens: 300,
    });

    return response.choices[0]?.message?.content.trim(); // ✅ Fix .trim() function usage
}
