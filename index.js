#!/usr/bin/env node

import { program } from "commander";
import { analyzeDirectory } from "./src/analyze.js";
import { checkInconsistencies } from "./src/check.js";
import { analyzeFolderContent } from "./src/guidelines.js";
import { suggestImprovements } from "./src/improve.js";

program 
    .version("1.0.0")
    .description("AI-Integrated Documentation CLI")

program
    .command("analyze <directory>")
    .description("Generate documentation for the entire directory")
    .action(analyzeDirectory); 

program
    .command("check <directory>")
    .description("Check for inconsistencies in file patterns. ")
    .action(checkInconsistencies);

program
    .command("improve <directory>")
    .description("Suggest improvements to the folder structure and file organization.")
    .action(suggestImprovements);

program 
    .command("guidelines <folder>")
    .description("Analyze folder contents and generate coding guidelines")
    .action(analyzeFolderContent)

program
    .command("help")
    .description("Displays usage information.")
    .action(() => program.help());

program.parse(process.argv);