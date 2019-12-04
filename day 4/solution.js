const fs = require('fs');

let [ min, max ] = fs.readFileSync('./input.txt', { encoding: 'utf8', }).split('-').map(n => Number.parseInt(n));

console.log(`Range: ${min}(min) - ${max}(max)`);

function checkViable (password) {
    let pair = false;
    let digits = {};
    let prevDigit = 0;
    while (password > 0) {
        let digit = password % 10;
        password = Math.floor(password / 10);
        if (digits[digit]) {
            digits[digit] += 1;
        } else {
            digits[digit] = 1;
        }
    }
    return Object.values(digits).includes(2);
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
console.log(passwords.length);