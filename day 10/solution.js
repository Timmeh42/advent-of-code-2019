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

    let base = {angCount: 0};
    for (let me of asteroids) {
        let angs = {};
        for (let asteroid of asteroids) {
            if (asteroid === me) {
                continue;
            }
            let [rx, ry] = [asteroid.x - me.x, asteroid.y - me.y];
            let ang = Math.atan2(ry, rx);
            let dis = Math.abs(rx) + Math.abs(ry);
            if (!angs.hasOwnProperty(ang)) {
                angs[ang] = [];
            }
            asteroid.dis = dis;
            angs[ang].push(asteroid);
        }
        if (base.angCount < Object.keys(angs).length) {
            me.angs = angs;
            me.angCount = Object.keys(angs).length;
            base = me;
        }
    }

    let UP = Math.atan2(1, 0);
    let victim = 0;
    let angsQueue = Object.keys(base.angs).sort((a, b) => a - b);
    console.log(angsQueue);
    while (angsQueue[0] < UP) {
        angsQueue.push(angsQueue.unshift());
    }
    console.log('lasor');
    while (victim < 200){
        let ang = base.angs[angsQueue[victim % angsQueue.length]];
        let nextVictim = ang.sort((a, b) => a.dis - b.dis).shift();
        console.log(victim, nextVictim.dis);
        victim++;
    }







    return [
        base.angCount,
        '',
    ]
}

/**
 * 1,2 and 2, 4
 * 1,2 -> 1, 2
 * 2,4 -> 1, 2
 */