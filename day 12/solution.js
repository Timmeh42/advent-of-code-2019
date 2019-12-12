"use strict";
const { slices, range, clamp } = require('../helpers');

module.exports = function ( input ) {

    let moons = slices(input.match(/-?\d+/g).map(n => parseInt(n)), 3).map(ins => ({
        x: ins[0],
        y: ins[1],
        z: ins[2],
        dx: 0,
        dy: 0,
        dz: 0,
    }));

    for (let i of range(1000)) {
        for (let m of moons) {
            for (let s of moons) {
                m.dx += clamp(s.x - m.x, -1, 1);
                m.dy += clamp(s.y - m.y, -1, 1);
                m.dz += clamp(s.z - m.z, -1, 1);
            }
        }
        for (let m of moons) {
            m.x += m.dx;
            m.y += m.dy;
            m.z += m.dz;
        }
    }

    let part1 = 0;
    
    for (let m of moons) {
        let p = Math.abs(m.x) + Math.abs(m.y) + Math.abs(m.z);
        let k = Math.abs(m.dx) + Math.abs(m.dy) + Math.abs(m.dz);
        part1 += p*k;
    }







    return [
        part1,
        null,
    ]
}