const fs = require('fs');

let [ min, max ] = fs.readFileSync('./input.txt', { encoding: 'utf8', }).split('-').map(n => Number.parseInt(n));

let startTime = process.hrtime();

function checkViable (password) {
    let prevdigit = 0;
    let spree = 0;
    while (true) {
        let digit = password % 10;
        if (digit === prevdigit) {
            spree++;
        } else {
            if (spree == 1) {
                return true;
            }
            spree = 0;
        }
        prevdigit = digit;
        if (password < 10) {
            return spree === 1;
        }
        password = Math.floor(password / 10);
    }
}

let passwords = [];

function password (current) {
    if (current > max) {
        return;
    }
    if (current >= min && checkViable(current)) {
        passwords.push(current);
        return;
    }
    let prevDigit = (current % 10) || 1;
    for (let i = prevDigit; i < 10; i++) {
        password(current * 10 + i);
    }
}
password(0);
console.log(process.hrtime(startTime));
console.log(passwords.length);