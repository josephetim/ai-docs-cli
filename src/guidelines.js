import fs from "fs";
import path from "path";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

 
export async function analyzeFolderContent(folderPath) {
    if (!fs.existsSync(folderPath)) {
        console.error("Folder does not exist:", folderPath);
        return;
    }

    const files = fs.readdirSync(folderPath).filter(file => {
        return fs.statSync(path.join(folderPath, file)).isFile();
    });

    let fileContents = [];
    
    for (const file of files) {
        const filePath = path.join(folderPath, file);
        const ext = path.extname(file);
        
        if ([".js", ".ts", ".jsx", ".tsx", ".py", ".html", ".css", ".json"].includes(ext)) {
            const content = fs.readFileSync(filePath, "utf-8");
            fileContents.push(`File: ${file}\nContent:\n${content}\n\n`);
        }
    }

    if (fileContents.length === 0) {
        console.log("No readable code or text files found in this folder.");
        return;
    }

    const prompt = `
        You are an AI assistant that analyzes code structure, patterns, and conventions. 
        Based on the following file contents, generate a list of observed patterns 
        and a set of best practices for maintaining consistency in this folder.

        ${fileContents.join("\n")}

        Output should include:
        - Observed patterns in file structure and naming.
        - Guidelines for writing future files consistently.
    `;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content: prompt }],
        });

        const guidelines = response.choices[0].message.content;
        const guidelinesPath = path.join(folderPath, "guidelines.txt");

        fs.writeFileSync(guidelinesPath, guidelines);
        console.log(`✅ Guidelines generated: ${guidelinesPath}`);
    } catch (error) {
        console.error("Error generating guidelines:", error);
    }
}

// CLI Execution
const folderPath = process.argv[2];
if (!folderPath) {
    console.error("Usage: node src/guidelines.js <folderPath>");
    process.exit(1);
}

analyzeFolderContent(folderPath);

