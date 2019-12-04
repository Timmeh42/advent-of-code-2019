const fs = require('fs');

let [ min, max ] = fs.readFileSync('./input.txt', { encoding: 'utf8', }).split('-').map(n => Number.parseInt(n));

console.log(`Range: ${min}(min) - ${max}(max)`);


let passwords = [];
let viable = /^(?=.{6}$)(\d{0,4}(\d)\2\d{0,4})/;

function password (current) {
    if (current > max) {
        return;
    }
    if (current >= min && viable.test(current)) {
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