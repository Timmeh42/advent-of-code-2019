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

function treeverse (center, startDepth = 0) {
    let totalDepth = startDepth;
    for (let satellite of center.satellites) {
        satellite.depth = startDepth + 1;
        totalDepth += treeverse(satellite, startDepth + 1);
    }
    return totalDepth
}

function search (center) {
    let children = [...center.satellites];
    let descendants = [];
    console.log(children.length);
    for (let satellite of children) {
        console.log(satellite.label, [...satellite.satellites]);
        let result = search(satellite);
        if (typeof result !== 'array') {
            return result;
        }
        console.log('res ' + result);
        descendants.push(result);
    }
    children = [...children, ...descendants];
    if (children.some(s => s.label === 'YOU') && children.some(s => s.label === 'SAN')) {
        return children.find(s => s.label === 'YOU').depth + children.find(s => s.label === 'SAN').depth - 2 * center.depth;
    }
    return [];
}

let startTime = performance.now();
console.log(treeverse(tree.get('COM')));
console.log(search(tree.get('COM')));
console.log(performance.now() - startTime);