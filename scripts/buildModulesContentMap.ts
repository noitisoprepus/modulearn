/*
 * Due to React Native's limitations with dynamic asset loading,
 * all JSON and image files must be statically imported at build time.
 * 
 * This script scans all module JSON files and their associated assets (e.g., images),
 * then generates a TypeScript file that maps each module’s content and imports.
 * 
 * It should be run manually (for now) before building the app,
 * to ensure that all module data and assets are properly bundled into the build.
 */


function findModuleJSONs() {
    // get all JSON files inside './assets/modules'
}

function generateModuleContentMap() {
    // generate a TypeScript file and place it in './data'
    // the file will contain
}