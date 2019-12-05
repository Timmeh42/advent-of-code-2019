const fs = require('fs');

const input = fs.readFileSync('./input.txt', { encoding: 'utf8', });

const codes = input.split(',').map(n => parseInt(n));

let pointer = 0;
const inputVar = 1;

let ins = new Map([
    [1, add],
    [2, mul],
    [3, inp],
    [4, out],
    [99, end],
]);

function add (modes) {
    pointer++;
    const a = modes[0] ? codes[pointer] : codes[codes[pointer]];
    if (modes[0] === 0) {
        console.log(`${pointer}: ${codes[pointer]} | a = codes[${codes[pointer]}] = ${a}`);
    } else {
        console.log(`${pointer}: ${codes[pointer]} | a = ${codes[pointer]}`);
    }
    
    pointer++;
    const b = modes[1] ? codes[pointer] : codes[codes[pointer]];
    if (modes[1] === 0) {
        console.log(`${pointer}: ${codes[pointer]} | b = codes[${codes[pointer]}] = ${b}`);
    } else {
        console.log(`${pointer}: ${codes[pointer]} | b = ${codes[pointer]}`);
    }

    pointer++;
    codes[codes[pointer]] = a + b;
    console.log(`${pointer}: ${codes[pointer]} | store ${a + b} in ${codes[pointer]}`);
    return true;
}

function mul (modes) {
    pointer++;
    const a = modes[0] ? codes[pointer] : codes[codes[pointer]];
    if (modes[0] === 0) {
        console.log(`${pointer}: ${codes[pointer]} | a = codes[${codes[pointer]}] = ${a}`);
    } else {
        console.log(`${pointer}: ${codes[pointer]} | a = ${codes[pointer]}`);
    }
    
    pointer++;
    const b = modes[1] ? codes[pointer] : codes[codes[pointer]];
    if (modes[1] === 0) {
        console.log(`${pointer}: ${codes[pointer]} | b = codes[${codes[pointer]}] = ${b}`);
    } else {
        console.log(`${pointer}: ${codes[pointer]} | b = ${codes[pointer]}`);
    }

    pointer++;
    codes[codes[pointer]] = a * b;
    console.log(`${pointer}: ${codes[pointer]} | store ${a * b} in ${codes[pointer]}`);
    return true;
}

function inp (modes) {
    pointer++;
    codes[codes[pointer]] = inputVar;
    console.log(`${pointer}: ${codes[pointer]} | store ${inputVar} in position ${codes[pointer]}`);
    return true;
}

function out (modes) {
    pointer++;
    if (modes[0] === 0) {
        console.log(`${pointer}: ${codes[pointer]} | return codes[${codes[pointer]}] = ${codes[codes[pointer]]}`);
    } else {
        console.log(`${pointer}: ${codes[pointer]} | return ${codes[pointer]}`);
    }
    return modes[0] === 1 ? codes[pointer] : codes[codes[pointer]];
}

function end (modes) {
    return false;
}

while (true) {
    const code = codes[pointer];
    const instruction = ins.get(Math.floor(code % 100));
    const modes = [
        Math.floor((code / 100) % 10),
        Math.floor((code / 1000) % 10),
        Math.floor((code / 10000) % 10),
    ];
    console.log(`${pointer}: ${codes[pointer]} | ----------- ${instruction.name} | modes: ${modes}`);
    const ret = instruction(modes);
    if (ret === false) {
        break;
    }
    pointer++;
}