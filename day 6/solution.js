const fs = require('fs');
const { performance } = require('perf_hooks');

const input = fs.readFileSync('./input.txt', { encoding: 'utf8'});

const orbits = input.split(/\r?\n/);

let tree = new Map();

for (let orbit of orbits) {
    const [ center, satellite ] = orbit.split(')');
    if (!tree.has(center)) {
        tree.set(center, {
            label: center,
            satellites: [],
            depth: 0,
        });
    }
    if (!tree.has(satellite)) {
        tree.set(satellite, {
            label: satellite,
            satellites: [],
            depth: 0,
        });
    }
    tree.get(center).satellites.push(tree.get(satellite));
}

function treeverse (center) {
    let totalDepth = center.depth;
    for (let satellite of center.satellites) {
        satellite.depth = center.depth + 1;
        totalDepth += treeverse(satellite);
    }
    return totalDepth
}

function search (center) {
    const children = center.satellites;
    let descendants = [...children];
    for (let satellite of children) {
        let result = search(satellite);
        if (typeof result === 'number') {
            return result;
        }
        descendants.push(...result);
    }
    if (descendants.some(s => s.label === 'YOU') && descendants.some(s => s.label === 'SAN')) {
        let distance = descendants.find(s => s.label === 'YOU').depth + descendants.find(s => s.label === 'SAN').depth - 2 * (center.depth + 1);
        return distance;
    }
    return descendants;
}

let startTime = performance.now();
console.log(`total depth: ${treeverse(tree.get('COM'))}`);
console.log(`distance: ${search(tree.get('COM'))}`);
console.log(`time: ${performance.now() - startTime}ms`);