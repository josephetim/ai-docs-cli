import fs from 'fs';
import path from 'path';
import { generateAIAnalysis } from "./ai.js";

export async function analyzeDirectory(directory) {
    if (!fs.existsSync(directory)) {
        console.log(`❌ Directory ${directory} does not exist`)
        return;
    }

    const summary = {};
    const folders = fs.readdirSync(directory, {withFileTypes: true});

    for (const folder of folders) {
        if (folder.isDirectory()) {
            const folderPath = path.join(directory, folder.name);
            const files = fs.readdirSync(folderPath);
            const fileTypes = files.map (file => path.extname(file)).filter(Boolean);

            summary[folder.name] = {
                totalFiles: files.length,
                fileTypes: [...new Set(fileTypes)]
            };

            const folderSummary =  `Folder: ${folder.name}\nTotal Files: ${files.length}\nFile Types: ${summary[folder.name].fileTypes.join(", ")}\n`;
            fs.writeFileSync(path.join(folderPath, "summary.txt"), folderSummary);
        }
    }

    const aiSuggestions = await generateAIAnalysis(summary);

    fs.writeFileSync(path.join(directory, "directory_summary.txt"), JSON.stringify({ summary, aiSuggestions}, null, 2));
    console.log("✅ Documentation Successful")
}