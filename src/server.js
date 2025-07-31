const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot está online ✅');
});

server.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor keep-alive iniciado na porta ${process.env.PORT || 3000}`);
});
