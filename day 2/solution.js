const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf8', });

let baseInput = rawInput.split(',').map(x => parseInt(x));

for (let a = 0; a < 100; a++) {
    for (let b = 0; b < 100; b++) {
        let input = [...baseInput];

        input[1] = a;
        input[2] = b;

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
                break;
            } else {
                break;
            }
            i += 4;
        }
        if (input[0] === 19690720) {
            console.log(100 * a + b);
        }
    }
}