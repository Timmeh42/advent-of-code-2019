const fs = require('fs');
const { performance } = require('perf_hooks');
let [ min, max ] = fs.readFileSync('./input.txt', { encoding: 'utf8', }).split('-').map(n => Number.parseInt(n));

min = 0;
max = 9999999999;

let [count1, count2] = [0, 0];

let startTime = performance.now();

function checkViable (password) {
    let prevdigit = 0;
    let spree = 0;
    let true1 = 0;
    let true2 = 0;
    while (true) {
        let digit = password % 10;
        if (digit === prevdigit) {
            true1 = 1;
            spree++;
        } else {
            if (spree == 1) {
                true2 = 1;
                break;
            }
            spree = 0;
        }
        prevdigit = digit;
        if (password < 10) {
            true2 = spree === 1;
            break;
        }
        password = Math.floor(password / 10);
    }
    count1 += true1;
    count2 += true2;
}

let passwords = [];

function password (current) {
    if (current > max) {
        return;
    }
    if (current >= min) {
        checkViable(current);
    }
    let prevDigit = (current % 10) || 1;
    for (let i = prevDigit; i < 10; i++) {
        password(current * 10 + i);
    }
}
password(0);
console.log(performance.now() - startTime);
console.log(count1, count2);