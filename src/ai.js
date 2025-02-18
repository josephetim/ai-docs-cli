import { Configuration, OpenAIApi } from 'openai';
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY}));

export async function generateAIAnalysis(summary){
    const prompt =  `Analyze the following folder structure and suggest improvements:\n${JSON.stringify(summary, null, 2)}`;
    const response =await openai.createCompletion({
        model: "gpt-4",
        prompt,
        max_tokens: 300,

    })

    return response.data.choices[0].text.trim
}