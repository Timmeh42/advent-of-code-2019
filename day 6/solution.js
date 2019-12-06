const fs = require('fs');
const { performance } = require('perf_hooks');

const input = fs.readFileSync('./input.txt', { encoding: 'utf8'});

const orbits = input.split('\n');

let tree = new Map();

for (let orbit of orbits) {
    const [ center, satellite ] = orbit.split(')');
    if (!tree.has(center)) {
        tree.set(center, {
            label: center,
            satellites: [],
        });
    }
    if (!tree.has(satellite)) {
        tree.set(satellite, {
            label: satellite,
            satellites: [],
        });
    }
    tree.get(center).satellites.push(tree.get(satellite));
}

function treeverse (center, startDepth = 0) {
    let totalDepth = startDepth;
    for (let satellite of center.satellites) {
        totalDepth += treeverse(satellite, startDepth + 1);
    }
    return totalDepth
}

let startTime = performance.now();
console.log(treeverse(tree.get('COM')));
console.log(performance.now() - startTime);