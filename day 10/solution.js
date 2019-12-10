"use strict"
module.exports = function (input) {
    const rows = input.split(/\r?\n/);
    const width = rows[0].length;
    const height = rows.length;
    let asteroids = [];
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (rows[y][x] === '#') {
                asteroids.push({
                    x: x,
                    y: y,
                });
            }
        }
    }

    let base = null;
    for (let me of asteroids) {
        me.angles = new Map();
        for (let asteroid of asteroids) {
            if (asteroid === me) {
                continue;
            }
            const [dx, dy] = [asteroid.x - me.x, asteroid.y - me.y];
            const ang = Math.atan2(-dx, dy) + 2 * Math.PI;
            const dis = Math.hypot(dx, dy);
            if (!me.angles.has(ang)) {
                me.angles.set(ang, []);
            }
            me.angles.get(ang).push({
                ang,
                dis,
                asteroid,
            });
        }
        if (base === null || base.angles.size < me.angles.size) {
            base = me;
        }
    }
    const part1 = base.angles.size;

    for (let asteroidList of base.angles.values()) {
        asteroidList.sort((a, b) => a.dis - b.dis);
    }

    let listQueue = [...base.angles.keys()].sort((a, b) => a - b).map(n => base.angles.get(n));

    let asteroidQueue = [];
    while (listQueue.length !== 0) {
        const activeAngle = listQueue.shift();
        asteroidQueue.push(activeAngle.shift());
        if (activeAngle.length !== 0) {
            listQueue.push(activeAngle);
        }
    }

    const a200 = asteroidQueue[199].asteroid;
    const part2 = a200.x * 100 + a200.y;



    return [
        part1,
        part2,
    ]
}

/**
 * 1,2 and 2, 4
 * 1,2 -> 1, 2
 * 2,4 -> 1, 2
 */