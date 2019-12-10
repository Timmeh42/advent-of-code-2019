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

    let base = {eyes: new Set()};
    for (let me of asteroids) {
        const [x, y] = [me.x, me.y];
        me.eyes = new Set();
        for (let asteroid of asteroids) {
            let [rx, ry] = [asteroid.x - me.x, asteroid.y - me.y];
            let ang = Math.atan2(ry, rx);
            me.eyes.add(ang);
        }
        if (base.eyes.size < me.eyes.size) {
            base = me;
        }
    }

    return [
        base.eyes.size,
        '',
    ]
}

/**
 * 1,2 and 2, 4
 * 1,2 -> 1, 2
 * 2,4 -> 1, 2
 */