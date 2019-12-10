"use strict"
module.exports = function (input) {
    const space = input.replace(/\r?\n/g, '');
    const width = input.match(/\r?\n/).index;
    let asteroids = Array.from(space.matchAll(/#/g), m => ({x: m.index % width, y: Math.floor(m.index / width)}));

    let base = asteroids[0];
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
        if (base.angles.size < me.angles.size) {
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