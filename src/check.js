import fs from "fs";
import path from "path";


export function checkInconsistencies(directory) {
    if (!fs.existsSync(directory)) {
        console.log(" ❌  The Directory specified does not exist.");
        return;
    }

    const folders = fs.readdirSync(directory, { withFiletypes: true});

    folders.forEach(folder => {
        if(folder.isDirectory()) {
            const folderPath = path.join(directory, folder.name);
            const files = fs.readdirSync(folderPath);
            const fileTypes = files.map(file => path.extname(file)).filter(Boolean);

            if (new Set(fileTypes).size > 1) {
                console.log(`⚠️ Inconsistent file types found in ${folder.name}: ${fileTypes.join(", ")}`);
            }
        }
    });

    console.log(" ✅ Inconsistency check completed")
}