const fs = require('fs');
const path = require('path');

const uiDir = path.join(__dirname, 'src', 'components', 'ui');

fs.readdirSync(uiDir).forEach(file => {
  if (file.endsWith('.tsx')) {
    const filePath = path.join(uiDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove @version from imports
    content = content.replace(/@[0-9]+\.[0-9]+\.[0-9]+"/g, '"');
    content = content.replace(/@[0-9]+\.[0-9]+\.[0-9]+;/g, ';');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed: ${file}`);
  }
});

console.log('\nAll imports fixed!');
