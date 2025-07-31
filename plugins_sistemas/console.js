/*

** Muito bem aqui vc pode modificar a console e as cores ao seu gosto por favor tenha cuidado com as variáveis não altere caso não saiba o que esta fazendo ** 

*/

// Função para aplicar cores usando códigos ANSI
const color = (text, cor) => {
const cores = {
red: '\x1b[31m',
green: '\x1b[32m',
yellow: '\x1b[33m',
blue: '\x1b[34m',
magenta: '\x1b[35m',
cyan: '\x1b[36m',
white: '\x1b[37m',
reset: '\x1b[0m' 
};
return `${cores[cor] || cores.reset}${text}${cores.reset}`;
};

// Função para escolher uma cor aleatória
const randomColor = () => {
const colors = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
return colors[Math.floor(Math.random() * colors.length)];
};

// Função para exibir logs formatados
const logConsole = ({ isGroup, isCmd, isBot, comando, sender, nomegrupo, nomedele }) => {
const numero = sender.split("@")[0];

if (isGroup) {
if (isCmd && !isBot) {
console.log(
color(`\n❐ EM GRUPO ❐`, 'yellow'),
color(`\n[ 🕹️ ] COMANDO: ${comando}`, randomColor()),
color(`\n[ 🔢 ] NUMERO:  ${numero}`, randomColor()),
color(`\n[ 🗯️ ] GRUPO: ${nomegrupo}`, randomColor()),
color(`\n[ 👿 ] NOME: ${nomedele}`, randomColor())
);
} else if (!isBot) {
console.log(
color(`\n❐ EM GRUPO ❐`, 'yellow'),
color(`\n[ 🕹️ ] COMANDO: ${color('Não', 'blue')}`, randomColor()),
color(`\n[ 🔢 ] NUMERO:  ${numero}`, randomColor()),
color(`\n[ 🗯️ ] GRUPO: ${nomegrupo}`, randomColor()),
color(`\n[ 👿 ] NOME: ${nomedele}`, randomColor())
);
}
} else {
if (isCmd && !isBot) {
console.log(
color(`\n❐ EM PRIVADO ❐`, 'yellow'),
color(`\n[ 🕹️ ] COMANDO: ${comando}`, randomColor()),
color(`\n[ 🔢 ] NUMERO: ${numero}`, randomColor()),
color(`\n[ 👿 ] NOME: ${nomedele}`, randomColor())
);
} else if (!isBot) {
console.log(
color(`\n❐ EM PRIVADO ❐`, 'yellow'),
color(`\n[ 🕹️ ] COMANDO: ${color('Não', 'blue')}`, randomColor()),
color(`\n[ 🔢 ] NUMERO: ${numero}`, randomColor()),
color(`\n[ 👿 ] NOME: ${nomedele}`, randomColor())
);
}
}
};

module.exports = logConsole;

const fs = require("fs");
let file = require.resolve(__filename);
fs.watchFile(file, () => {
fs.unwatchFile(file);
console.log('\x1b[31mATUALIZADO ' + __filename + '\x1b[0m');  
delete require.cache[file];
require(file);
});

// Copyright © 𝑊𝐼𝐿𝑀𝑂 𝐶𝐻𝐴𝑁𝐺 2025