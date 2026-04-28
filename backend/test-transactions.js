// Simple JavaScript test script that uses the existing TypeScript modules
// This can be run with: node test-transactions.js

// Load the compiled version or use ts-node programmatically
// For simplicity, we'll use the existing TypeScript source with ts-node

const { spawn } = require('child_process');
const path = require('path');

console.log('📋 Running one-day transaction simulation...');
console.log('='.repeat(60));

// We'll run the TypeScript file using ts-node directly
const tsNodePath = require.resolve('ts-node');
const scriptPath = path.join(__dirname, 'test-transactions.ts');

const child = spawn('node', [tsNodePath, '--transpile-only', scriptPath], {
  stdio: 'inherit',
  shell: true
});

child.on('close', (code) => {
  console.log(`\nScript exited with code ${code}`);
  process.exit(code);
});