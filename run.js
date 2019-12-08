"use strict";
const fs = require('fs');
const { range } = require('./helpers');


const dayRoute = `./day ${process.argv[2]}/`;
const runs = parseInt(process.argv[3]) || 1;

const solution = require(dayRoute + 'solution.js');

const input = fs.readFileSync(dayRoute + 'input.txt', { encoding: 'utf8'}).trim();
const output = solution(input);

const startTime = process.hrtime();

for (const i of range(runs)) {
    const _ = solution(input);
}

const totalTime = process.hrtime(startTime);
const avgTime = (totalTime[0] + totalTime[1] / 1_000_000_000) / runs;

console.log(`\
Part 1:
${output[0] || '[NOT DONE]'}
Part 2:
${output[1] || '[NOT DONE]'}
Average runtime:
${avgTime * 1000}ms
`);