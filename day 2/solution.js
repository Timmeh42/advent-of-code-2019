const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf8', });

let input = rawInput.split(',').map(x => parseInt(x));

input[1] = 12;
input[2] = 2;

//input = [1,1,1,4,99,5,6,0,99];


let i = 0;
while (true) {
    const x = input[i + 1];
    const y = input[i + 2];
    const output = input[i + 3];

    if (input[i] === 1) {
        input[output] = input[x] + input[y];
    } else if (input[i] === 2) {
        input[output] = input[x] * input[y];
    } else if (input[i] === 99) {
        console.log('end', input[0]);
        break;
    } else {
        console.log('REEEEEE', input[i]);
        break;
    }
    i += 4;
}