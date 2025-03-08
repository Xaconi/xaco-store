const fs = require('fs');
const path = require('path');

const files = ['README.md', 'LICENSE'];
const targetDir = path.join(__dirname, '..', 'dist', 'xaco-store');

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

files.forEach(file => {
    const sourcePath = path.join(__dirname, '..', file);
    const targetPath = path.join(targetDir, file);

    try {
        const content = fs.readFileSync(sourcePath);
        fs.writeFileSync(targetPath, content);
        console.log(`✓ ${file} copied correctly`);
    } catch (error) {
        console.error(`✗ Error during ${file} copy:`, error.message);
    }
}); 