const { execSync } = require('child_process');

console.log("📦 Instalando dependências...");
execSync('npm install', { stdio: 'inherit' });

console.log("🚀 Iniciando o sistema...");
execSync('node whatsapp.js', { stdio: 'inherit' }); // Altere index.js se necessário
