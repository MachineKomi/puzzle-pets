import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const ASSETS_DIR = path.join(PUBLIC_DIR, 'assets');
const OUTPUT_FILE = path.join(process.cwd(), 'src', 'assets', 'manifest.generated.json');

function walkDir(dir: string, fileList: string[] = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            walkDir(filePath, fileList);
        } else {
            fileList.push(filePath);
        }
    }
    return fileList;
}

function generateManifest() {
    if (!fs.existsSync(ASSETS_DIR)) {
        console.error(`Assets directory not found at ${ASSETS_DIR}`);
        process.exit(1);
    }

    const allFiles = walkDir(ASSETS_DIR);
    const manifest: Record<string, string> = {};

    allFiles.forEach((absolutePath) => {
        // Convert to forward slashes for cross-platform web URLs
        const relativeToPublic = absolutePath
            .replace(PUBLIC_DIR, '')
            .split(path.sep)
            .join('/');

        // Create a logical key (e.g., 'pets/dog.png' -> 'pets/dog')
        const logicalKey = relativeToPublic
            .replace('/assets/', '')
            .replace(/\.[^/.]+$/, ''); // Remove extension

        manifest[logicalKey] = relativeToPublic;
    });

    fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2));

    console.log(`✅ Asset manifest generated at src/assets/manifest.generated.json with ${Object.keys(manifest).length} entries.`);
}

generateManifest();
