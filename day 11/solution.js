"use strict";
const { STATE, MODE, Machine } = require('../intcode');

const BLACK = 0;
const WHITE = 1;

class Robot {
    constructor () {
        this.x = 0;
        this.y = 0;
        this.dx = 0;
        this.dy = -1;
        this.limits = {x1: Infinity, x2: -Infinity, y1: Infinity, y2: -Infinity};
    }

    turn (d) {
        this.dx ^= this.dy;
        this.dy ^= this.dx;
        this.dx ^= this.dy;
        if (d === 0) {
            this.dx *= -1;
        } else {
            this.dy *= -1;
        }
    }

    read (map) {
        const k = this.x + ',' + this.y;
        if (map.has(k)) {
            return map.get(k);
        } else {
            return BLACK;
        }
    }

    paint (map, colour) {
        const k = this.x + ',' + this.y;
        this.limits.x1 = Math.min(this.limits.x1, this.x);
        this.limits.x2 = Math.max(this.limits.x2, this.x);
        this.limits.y1 = Math.min(this.limits.y1, this.y);
        this.limits.y2 = Math.max(this.limits.y2, this.y);
        if (colour !== BLACK && colour !== WHITE) {
            throw Error;
        }
        map.set(k, colour);
    }

    move (d) {
        this.turn(d);
        this.x += this.dx;
        this.y += this.dy;
    }
}

module.exports = function ( input ) {
    let memory = input.split(',').map(n => parseInt(n));
    let inputs = [];
    let outputs = [];
    let machine = new Machine(memory, inputs, outputs);
    let robot = new Robot();
    let hull = new Map();
    let stat = STATE.RUNNING;
    let paint = true;
    while (stat !== STATE.COMPLETE) {
        inputs.push(robot.read(hull));
        stat = machine.run();
        if (outputs.length !== 0) {
            if (paint) {
                robot.paint(hull, outputs.pop());
            } else {
                robot.move(outputs.pop());
            }
            paint = !paint;
        }
    }
    const part1 = hull.size;

    let memory2 = input.split(',').map(n => parseInt(n));
    let inputs2 = [1];
    let outputs2 = [];
    let machine2 = new Machine(memory2, inputs2, outputs2);
    let robot2 = new Robot();
    let hull2 = new Map();
    let stat2 = STATE.RUNNING;
    let paint2 = true;
    while (stat2 !== STATE.COMPLETE) {
        inputs2.unshift(robot2.read(hull2));
        stat2 = machine2.run();
        if (outputs2.length !== 0) {
            if (paint2) {
                robot2.paint(hull2, outputs2.pop());
            } else {
                robot2.move(outputs2.pop());
            }
            paint2 = !paint2;
        }
    }

    let part2 = '';
    for (let y = robot2.limits.y1; y <= robot2.limits.y2; y++) {
        for (let x = robot2.limits.x1; x <= robot2.limits.x2; x++) {
            const bw = hull2.get(x + ',' + y) || 0;
            part2 += bw ? '#' : ' ';
        }
        part2 += '\n';
    }

    return [
        part1,
        part2,
    ];
}
