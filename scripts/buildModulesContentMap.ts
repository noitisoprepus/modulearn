/*
 * Due to React Native's limitations with dynamic asset loading,
 * all JSON and image files must be statically imported at build time.
 *
 * This script extracts module JSONs and shared image assets from a zip file,
 * extracts them to the project directories, and generates a TypeScript file that
 * statically imports and maps the content for use at runtime.
 *
 * To run: `npx ts-node ./scripts/buildModulesContentMap.ts ./modules.zip`
 */

const fs = require("fs/promises");
const StreamZip = require("node-stream-zip");
const path = require("path");

// Directories
const modulesDirPath = path.resolve(__dirname, "..", "assets/modules");
const mediaDirPath = path.resolve(__dirname, "..", "assets/modules/media");
const outputPath = path.resolve(__dirname, "..", "data/modulesContentMap.ts");

// TypeScript code containers
const importJsonLines: string[] = [];
const importImageLines: string[] = [];
const moduleObjects: string[] = [];
const mediaObjects: string[] = [];

// Utility to remove a directory and its contents
async function cleanDirectory(dirPath: string) {
  try {
    const files = await fs.readdir(dirPath);
    for (const file of files) {
      const fullPath = path.join(dirPath, file);
      const stat = await fs.stat(fullPath);
      if (stat.isDirectory()) {
        await cleanDirectory(fullPath);
        await fs.rmdir(fullPath);
      } else {
        await fs.unlink(fullPath);
      }
    }
  } catch (err) {
    // It's okay if the dir doesn't exist
  }
}

// Step 0: Validate input
const zipFilePath = process.argv[2];
if (!zipFilePath || path.extname(zipFilePath) !== ".zip") {
  console.error("Please provide a path to the zip file as the first argument.");
  process.exit(1);
}
const zipFileName = path.basename(zipFilePath, path.extname(zipFilePath));

(async () => {
  // Clean existing modules content
  await cleanDirectory(modulesDirPath);

  // Ensures the target directories exist
  await fs.mkdir(modulesDirPath, { recursive: true });
  await fs.mkdir(mediaDirPath, { recursive: true });

  // Load the zip
  const zip = new StreamZip.async({ file: zipFilePath });
  const entries = await zip.entries();

  // Step 1: Extract JSON and media files
  for (const entryName in entries) {
    const entry = entries[entryName];

    if (!entry.isDirectory) {
      if (
        path.extname(entryName) === ".json" &&
        !entryName.startsWith("media/")
      ) {
        // Root JSON file
        const outPath = path.join(modulesDirPath, path.basename(entryName));
        await zip.extract(entryName, outPath);
      } else if (entryName.startsWith("media/")) {
        // Media asset
        const outPath = path.join(mediaDirPath, path.basename(entryName));
        await zip.extract(entryName, outPath);
      }
    }
  }

  await zip.close();

  // Step 2: Process JSON files
  const moduleFiles = await fs.readdir(modulesDirPath);
  for (const fileName of moduleFiles) {
    const filePath = path.join(modulesDirPath, fileName);
    const stat = await fs.stat(filePath);
    if (stat.isFile() && path.extname(filePath) === ".json") {
      const moduleName = path.basename(fileName, ".json");

      const jsonData = JSON.parse(await fs.readFile(filePath, "utf-8"));

      // Get module info
      const moduleId = jsonData.id;
      const moduleTitle = jsonData.title;
      const moduleImg = jsonData.imgSrc
        ? path.basename(jsonData.imgSrc, path.extname(jsonData.imgSrc))
        : null;

      const foundImages = new Set<string>();
      // This is a recursive function for traversing through the Json data
      const search = (node: any) => {
        if (Array.isArray(node)) {
          node.forEach(search);
        } else if (typeof node === "object" && node !== null) {
          for (const key in node) {
            // Search for image source keys in the JSON data
            if (
              typeof node[key] === "string" &&
              (key === "src" || key === "imgSrc")
            ) {
              foundImages.add(path.basename(node[key]));
            } else {
              search(node[key]);
            }
          }
        }
      };
      // Start the search
      search(jsonData);

      // Compose TypeScript code for importing and mapping the found images
      foundImages.forEach((imgFileName) => {
        const imageBaseName = path.basename(
          imgFileName,
          path.extname(imgFileName)
        );
        importImageLines.push(
          `const ${imageBaseName} = require('@/assets/modules/media/${imgFileName}');`
        );
        mediaObjects.push(imageBaseName);
      });

      // Compose TypeScript code for importing and mapping the module
      importJsonLines.push(
        `const ${moduleName} = require('@/assets/modules/${fileName}');`
      );
      moduleObjects.push(`{
		id: '${moduleId}',
		title: '${moduleTitle}',
		imgSrc: '${moduleImg}',
		data: ${moduleName}
	}`);
    }
  }

  // Step 3: Compose output TypeScript file
  const outputContent = `
import { ImageSourcePropType } from "react-native";

${importJsonLines.join("\n")}

${importImageLines.join("\n")}

export const title = "${zipFileName}";

export const modules = [
  ${moduleObjects.join(",\n  ")}
];

export const media: { [key: string]: ImageSourcePropType } = {
	${mediaObjects.join(",\n  ")}
}`;

	// Ensure that the output directory exists
	await fs.mkdir(path.dirname(outputPath), { recursive: true });

	// Write the output file
  await fs.writeFile(outputPath, outputContent);
  console.log(
    `Successfully generated modules content map in 'modulearn/data/modulesContentMap.ts'`
  );
})();
