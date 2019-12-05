const fs = require('fs');

const input = fs.readFileSync('./input.txt', { encoding: 'utf8', });

const codes = input.split(',').map(n => parseInt(n));

let pointer = 0;
const inputVar = 5;

let ins = new Map([
    [1, add],
    [2, mul],
    [3, inp],
    [4, out],
    [5, jit],
    [6, jif],
    [7, lt],
    [8, eq],
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
    return true;
}

function end (modes) {
    return false;
}

function jit (modes) {
    pointer++;
    let choice = false;
    if (modes[0] === 0) {
        console.log(`${pointer}: ${codes[pointer]} | jump if codes[${codes[pointer]}] = ${codes[codes[pointer]]} is not 0`);
        choice = codes[codes[pointer]] !== 0;
    } else {
        console.log(`${pointer}: ${codes[pointer]} | jump if ${codes[pointer]} is not 0`);
        choice = codes[pointer] !== 0;
    }

    pointer++;
    if (choice) {
        return modes[1] === 1 ? codes[pointer] : codes[codes[pointer]];
    } else {
        return true;
    }
}

function jif (modes) {
    pointer++;
    let choice = false;
    if (modes[0] === 0) {
        console.log(`${pointer}: ${codes[pointer]} | jump if codes[${codes[pointer]}] = ${codes[codes[pointer]]} is 0`);
        choice = codes[codes[pointer]] === 0;
    } else {
        console.log(`${pointer}: ${codes[pointer]} | jump if ${codes[pointer]} is 0`);
        choice = codes[pointer] === 0;
    }

    pointer++;
    if (choice) {
        return modes[1] === 1 ? codes[pointer] : codes[codes[pointer]];
    } else {
        return true;
    }
}

function lt (modes) {
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
    codes[codes[pointer]] = a < b ? 1 : 0;
    console.log(`${pointer}: ${codes[pointer]} | store a < b = ${a < b} in ${codes[pointer]}`);
    return true;
}

function eq (modes) {
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
    codes[codes[pointer]] = a === b ? 1 : 0;
    console.log(`${pointer}: ${codes[pointer]} | store a === b = ${a === b} in ${codes[pointer]}`);
    return true;
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
    } else if (ret === true) {
        pointer++;
    } else {
        pointer = ret;
    }
}