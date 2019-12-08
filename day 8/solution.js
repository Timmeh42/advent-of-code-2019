"use strict";
const { slices, range } = require('../helpers');

module.exports = function ( input ) {
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
    
    return [
        fewestZerosLayer[1] * fewestZerosLayer[2],
        image,
    ];
}
