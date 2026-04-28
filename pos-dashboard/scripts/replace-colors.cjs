const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');

const replacements = {
  // Backgrounds
  'bg-primary-[0-9]{3}': 'bg-primary',
  'bg-secondary-[0-9]{3}': 'bg-secondary',
  'bg-gray-[0-9]{3}': 'bg-background',
  'bg-red-50': 'bg-destructive/10',
  'bg-green-50': 'bg-success/10',
  'bg-blue-50': 'bg-primary/10',
  'bg-orange-50': 'bg-warning/10',
  'bg-yellow-50': 'bg-warning/10',
  'bg-purple-50': 'bg-accent/10',

  // Borders
  'border-primary-[0-9]{3}': 'border-primary',
  'border-secondary-[0-9]{3}': 'border-border',
  'border-gray-[0-9]{3}': 'border-border',
  'border-red-[0-9]{3}': 'border-destructive/30',
  'border-green-[0-9]{3}': 'border-success/30',

  // Text
  'text-primary-[0-9]{3}': 'text-primary',
  'text-secondary-[0-9]{3}': 'text-muted-foreground',
  'text-gray-900': 'text-foreground',
  'text-gray-800': 'text-foreground/90',
  'text-gray-700': 'text-muted-foreground',
  'text-gray-600': 'text-muted-foreground',
  'text-gray-500': 'text-muted-foreground',
  'text-red-[0-9]{3}': 'text-destructive',
  'text-green-[0-9]{3}': 'text-success',

  // Rings
  'ring-primary-[0-9]{3}': 'ring-ring',
  'ring-secondary-[0-9]{3}': 'ring-border',
  'ring-gray-[0-9]{3}': 'ring-border',

  // Focus
  'focus:border-primary-[0-9]{3}': 'focus:border-ring'
};

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let original = content;
      
      for (const [pattern, replacement] of Object.entries(replacements)) {
        const regex = new RegExp(pattern, 'g');
        content = content.replace(regex, replacement);
      }

      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

console.log('Starting mass class replacement...');
processDirectory(srcDir);
console.log('Done.');
