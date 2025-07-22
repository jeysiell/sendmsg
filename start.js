const { execSync } = require('child_process');


console.log("🚀 Iniciando o sistema...");
execSync('node index.js', { stdio: 'inherit' });
