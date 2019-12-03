const fs = require('fs');
const log = process.stdout.write;

let input = fs.readFileSync('./input.txt', { encoding: 'utf8', });


let start = Date.now();
const directions = {
    R: {x: 1, y: 0},
    L: {x: -1, y: 0},
    U: {x: 0, y: 1},
    D: {x: 0, y: -1},
}

let [ line1, line2 ] = input.split('\n');
let points = {};
let [x, y, dis] = [0, 0, 0];
for (command of line1.split(',')) {
    const len = Number.parseInt(command.slice(1));
    const direction = directions[command[0]];
    for (let i = 0; i < len; i++) {
        x += direction.x;
        y += direction.y;
        dis += 1;
        if (points[x + ',' + y] == undefined) {
            points[x + ',' + y] = dis;
        }
    }
}

let closest = 0;
[x, y, dis] = [0, 0, 0];
for (command of line2.split(',')) {

    const len = Number.parseInt(command.slice(1));
    const direction = directions[command[0]];

    for (let i = 0; i < len; i++) {
        x += direction.x;
        y += direction.y;
        dis += 1;
        if (points[x + ',' + y]) {
            let newCollision = dis + points[x + ',' + y];
            if (closest === 0 || closest > newCollision) {
                closest = newCollision;
            }
        }
    }
}

console.log(closest);
console.log((Date.now() - start) / 1000)