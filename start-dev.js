const { spawn } = require('child_process');
require('dotenv').config();

const port = process.env.PORT || '3001';
console.log(`Starting development server on port ${port}...`);

const child = spawn('npx', ['next', 'dev', '--turbopack', '--port', port], {
  stdio: 'inherit',
  env: { ...process.env, PORT: port }
});

child.on('error', (error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

child.on('exit', (code) => {
  process.exit(code);
}); 