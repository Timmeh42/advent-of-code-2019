"use strict";
const { slices } = require('../helpers');

module.exports = function ( input ) {
    const [ width, height ] = [ 25, 6 ];
    const layerSize = width * height;
    const layerCount = Math.floor(input.length/layerSize);
    const [ reg0, reg1, reg2 ] = [ RegExp(/0/g), RegExp(/1/g), RegExp(/2/g) ]
    const layerDigits = slices(input, layerSize).map(l => [l.match(reg0).length, l]);
    const fewestZerosLayer = layerDigits.reduce((cur, nex) => nex[0] < cur[0] ? nex : cur);
    
    let pixels = '';
    for (let x = 0; x < layerSize; x++) {
        for (let z = 0; z < layerCount; z++) {
            if (input[x + z*layerSize] !== '2') {
                pixels += input[x + z*layerSize];
                break;
            }
        }
    }
    
    pixels = pixels.replace(/0|1/g, (match) => match === '0' ? ' ' : '#');
    const image = slices(pixels, width).join('\n');
    
    return [
        fewestZerosLayer[1].match(reg1).length * fewestZerosLayer[1].match(reg2).length,
        image,
    ];
}
