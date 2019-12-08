"use strict";
const { range } = require('./helpers');


const route = `./day ${process.argv[2]}/solution.js`;
const runs = parseInt(process.argv[3]) || 1;

console.log(route);
const solution = require(route);

const output = solution();

const startTime = process.hrtime();

for (const i of range(runs)) {
    const _ = solution();
}

const totalTime = process.hrtime(startTime);
const avgTime = (totalTime[0] + totalTime[1] / 1_000_000_000) / runs;

console.log(`
Part 1:
${output[0]}
Part 2:
${output[1]}
Average runtime:
${avgTime * 1000}ms
`);