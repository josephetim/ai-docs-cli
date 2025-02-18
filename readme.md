# AI-Docs CLI

AI-Docs is a CLI tool that analyzes project directories and provides AI-powered documentation, pattern analysis, and structure improvement suggestions.

## Features
- Iterates through all files in a directory and summarizes their characteristics.
- Generates a `summary.txt` file in each folder detailing file types and patterns.
- Creates a `documentation.txt` file at the root summarizing all folders.
- Uses AI to suggest folder structure improvements and detect inconsistencies.
- Provides guidelines based on observed file content patterns.
- CLI-based commands for ease of use.

## Installation
To install globally from npm:
```sh
npm install -g ai-docs-cli
```

## Usage
### Analyze a Directory
Generates documentation for an entire directory.
```sh
ai-docs analyze <directory>
```

### Check for Inconsistencies
Detects inconsistent file patterns in a directory.
```sh
ai-docs check <directory>
```

### Suggest Improvements
Suggests better folder and file organization.
```sh
ai-docs improve <directory>
```

### Generate AI-Based Guidelines
Analyzes folder content and generates best practices.
```sh
ai-docs guidelines <folder>
```

## Example Output
### `summary.txt` (Inside Each Folder)
```
Folder: src/components

### Observed Patterns:
- Files use PascalCase for component names (e.g., `NavBar.js`).
- React components follow a functional structure.
- CSS files are stored in `styles/` subfolder.

### Recommended Guidelines:
1. Use PascalCase for component filenames.
2. Ensure all components are functional React components.
3. Separate styles into `styles/` folder.
```

## Updating the Package
If you make changes, update the version in `package.json` and publish:
```sh
npm version patch
npm publish
```

## License
This project is licensed under the MIT License.

## Author
Developed by Joseph Etim.

