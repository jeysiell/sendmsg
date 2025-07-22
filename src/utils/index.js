const readline = require("readline");
const { text } = require("stream/consumers");


exports.question = (message) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new promise((resolve) => rl.question(message, resolve));
};

exports.onlyNumbers = (text) => text.replace(/[^0-9]/g, "");