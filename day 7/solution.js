const fs = require('fs');

const input = fs.readFileSync('./input.txt', { encoding: 'utf8', });

let codes = input.split(',').map(n => parseInt(n));

let pointer = 0;
let computerInputs = [];

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
    // if (modes[0] === 0) {
    //     console.log(`${pointer}: ${codes[pointer]} | a = codes[${codes[pointer]}] = ${a}`);
    // } else {
    //     console.log(`${pointer}: ${codes[pointer]} | a = ${codes[pointer]}`);
    // }
    
    pointer++;
    const b = modes[1] ? codes[pointer] : codes[codes[pointer]];
    // if (modes[1] === 0) {
    //     console.log(`${pointer}: ${codes[pointer]} | b = codes[${codes[pointer]}] = ${b}`);
    // } else {
    //     console.log(`${pointer}: ${codes[pointer]} | b = ${codes[pointer]}`);
    // }

    pointer++;
    codes[codes[pointer]] = a + b;
    // console.log(`${pointer}: ${codes[pointer]} | store ${a + b} in ${codes[pointer]}`);
    return true;
}

function mul (modes) {
    pointer++;
    const a = modes[0] ? codes[pointer] : codes[codes[pointer]];
    // if (modes[0] === 0) {
    //     console.log(`${pointer}: ${codes[pointer]} | a = codes[${codes[pointer]}] = ${a}`);
    // } else {
    //     console.log(`${pointer}: ${codes[pointer]} | a = ${codes[pointer]}`);
    // }
    
    pointer++;
    const b = modes[1] ? codes[pointer] : codes[codes[pointer]];
    // if (modes[1] === 0) {
    //     console.log(`${pointer}: ${codes[pointer]} | b = codes[${codes[pointer]}] = ${b}`);
    // } else {
    //     console.log(`${pointer}: ${codes[pointer]} | b = ${codes[pointer]}`);
    // }

    pointer++;
    codes[codes[pointer]] = a * b;
    // console.log(`${pointer}: ${codes[pointer]} | store ${a * b} in ${codes[pointer]}`);
    return true;
}

function inp (modes) {
    pointer++;
    let inpv = computerInputs.pop()
    codes[codes[pointer]] = inpv;
    // console.log(`${pointer}: ${codes[pointer]} | store ${inpv} in position ${codes[pointer]}`);
    return true;
}

function out (modes) {
    pointer++;
    let outv = 0;
    if (modes[0] === 0) {
        // console.log(`${pointer}: ${codes[pointer]} | return codes[${codes[pointer]}] = ${codes[codes[pointer]]}`);
        outv = codes[codes[pointer]];
    } else {
        // console.log(`${pointer}: ${codes[pointer]} | return ${codes[pointer]}`);
        outv = codes[pointer];
    }
    computerInputs.push(outv);
    return true;
}

function end (modes) {
    return false;
}

function jit (modes) {
    pointer++;
    let choice = false;
    if (modes[0] === 0) {
        // console.log(`${pointer}: ${codes[pointer]} | jump if codes[${codes[pointer]}] = ${codes[codes[pointer]]} is not 0`);
        choice = codes[codes[pointer]] !== 0;
    } else {
        // console.log(`${pointer}: ${codes[pointer]} | jump if ${codes[pointer]} is not 0`);
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
        // console.log(`${pointer}: ${codes[pointer]} | jump if codes[${codes[pointer]}] = ${codes[codes[pointer]]} is 0`);
        choice = codes[codes[pointer]] === 0;
    } else {
        // console.log(`${pointer}: ${codes[pointer]} | jump if ${codes[pointer]} is 0`);
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
    // if (modes[0] === 0) {
    //     console.log(`${pointer}: ${codes[pointer]} | a = codes[${codes[pointer]}] = ${a}`);
    // } else {
    //     console.log(`${pointer}: ${codes[pointer]} | a = ${codes[pointer]}`);
    // }
    
    pointer++;
    const b = modes[1] ? codes[pointer] : codes[codes[pointer]];
    // if (modes[1] === 0) {
    //     console.log(`${pointer}: ${codes[pointer]} | b = codes[${codes[pointer]}] = ${b}`);
    // } else {
    //     console.log(`${pointer}: ${codes[pointer]} | b = ${codes[pointer]}`);
    // }

    pointer++;
    codes[codes[pointer]] = a < b ? 1 : 0;
    // console.log(`${pointer}: ${codes[pointer]} | store a < b = ${a < b} in ${codes[pointer]}`);
    return true;
}

function eq (modes) {
    pointer++;
    const a = modes[0] ? codes[pointer] : codes[codes[pointer]];
    // if (modes[0] === 0) {
    //     console.log(`${pointer}: ${codes[pointer]} | a = codes[${codes[pointer]}] = ${a}`);
    // } else {
    //     console.log(`${pointer}: ${codes[pointer]} | a = ${codes[pointer]}`);
    // }
    
    pointer++;
    const b = modes[1] ? codes[pointer] : codes[codes[pointer]];
    // if (modes[1] === 0) {
    //     console.log(`${pointer}: ${codes[pointer]} | b = codes[${codes[pointer]}] = ${b}`);
    // } else {
    //     console.log(`${pointer}: ${codes[pointer]} | b = ${codes[pointer]}`);
    // }

    pointer++;
    codes[codes[pointer]] = a === b ? 1 : 0;
    // console.log(`${pointer}: ${codes[pointer]} | store a === b = ${a === b} in ${codes[pointer]}`);
    return true;
}

function run (computerInput) {
    codes = input.split(',').map(n => parseInt(n));
    pointer = 0;
    computerInputs.push(computerInput);
    while (true) {
        const code = codes[pointer];
        const instruction = ins.get(Math.floor(code % 100));
        const modes = [
            Math.floor((code / 100) % 10),
            Math.floor((code / 1000) % 10),
            Math.floor((code / 10000) % 10),
        ];
        //console.log(`${pointer}: ${codes[pointer]} | ----------- ${instruction.name} | modes: ${modes}`);
        // console.log(instruction, code);
        const ret = instruction(modes);
        if (ret === false) {
            break;
        } else if (ret === true) {
            pointer++;
        } else {
            pointer = ret;
        }
    }
}

const perm = a => a.length ? a.reduce((r, v, i) => [ ...r, ...perm([ ...a.slice(0, i), ...a.slice(i + 1) ]).map(x => [ v, ...x ])], []) : [[]]

let maxval = -Infinity;
let perms = perm([0, 1, 2, 3, 4]);
for (phases of perms) {
    computerInputs = [0];

    phases.forEach(phase => run(phase));
    let outp = computerInputs.pop();
    if (outp > maxval) {
        maxval = outp;
    }
}
console.log(`Max: ${maxval}`);