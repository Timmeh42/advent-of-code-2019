"use strict";

const fs = require('fs');
const path = require('path');
const { slices, range } = require('../helpers');

module.exports = function () {
    let output = [];
    const input = fs.readFileSync(path.resolve(__dirname, './input.txt'), { encoding: 'utf8'}).trim();    
    const [ width, height ] = [ 25, 6 ];
    const layerSize = width * height;
    const layerCount = Math.floor(input.length/layerSize);
    const layerDigits = slices(input, layerSize).map(l => [l.match(/0/g).length, l.match(/1/g).length, l.match(/2/g).length]);
    const fewestZerosLayer = layerDigits.reduce((cur, nex) => cur = nex[0] < cur[0] ? nex : cur);
    
    let pixels = '';
    for (const x of range(layerSize)) {
        for (const z of range(layerCount)) {
            if (input[x + z*layerSize] !== '2') {
                pixels += input[x + z*layerSize];
                break;
            }
        }
    }
    
    
    pixels = pixels.replace(/1/g, '#').replace(/0/g, ' ');
    
    const image = slices(pixels, width).join('\n');
    
    output[0] = fewestZerosLayer[1] * fewestZerosLayer[2];
    output[1] = image;
    return output;
}
