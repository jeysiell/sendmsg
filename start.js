const { execSync } = require('child_process');

console.log("📦 Instalando dependências...");
execSync('npm install', { stdio: 'inherit' });

console.log("🚀 Iniciando o sistema...");
execSync('npm start', { stdio: 'inherit' });
