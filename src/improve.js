import { generateAIAnalysis } from "./ai.js";
import fs from "fs";
import path from "path";

export async function suggestImprovements(directory) {
    if (!fs.existsSync(directory)) {
        console.log("❌ Directory does not exist.");
        return;
    }

    const summary = {};
    const folders = fs.readdirSync(directory, { withFileTypes: true });

    for (const folder of folders) {
        if (folder.isDirectory()) {
            const folderPath = path.join(directory, folder.name);
            const files = fs.readdirSync(folderPath);
            summary[folder.name] = files.length;
        }
    }

    const suggestions = await generateAIAnalysis(summary);
    console.log(`🔍 AI Suggestions:\n${suggestions}`);
}
