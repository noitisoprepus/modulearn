/*
 * Due to React Native's limitations with dynamic asset loading,
 * all JSON and image files must be statically imported at build time.
 * 
 * This script scans all module JSON files and their associated assets (e.g., images),
 * then generates a TypeScript file that maps each module’s content and imports.
 * 
 * It should be run manually (for now) before building the app,
 * to ensure that all module data and assets are properly bundled into the build.
 * 
 * To run: enter 'npx ts-node .\scripts\buildModulesContentMap.ts' into the terminal
 */

const fs = require('fs');
const path = require('path');

// I'll refactor these later

// 1. get all JSON files inside './assets/modules'
const modulesDirPath = './assets/modules';
const files: string[] = fs.readdirSync(modulesDirPath);

// 2. iterate through each json files, and read its content
// the id will act as the key for the json map
// scan for all mentions of media file paths
files.forEach((fileName: string) => {
    const filePath: string = `${modulesDirPath}/${fileName}`;
    
    const stat = fs.statSync(filePath);
    if (stat.isFile() && path.extname(filePath) == '.json') {
        const file = fs.readFileSync(filePath);
        const jsonData = JSON.parse(file);
        console.log(jsonData);
    }
});

// n. generate a TypeScript file and place it in './data'
