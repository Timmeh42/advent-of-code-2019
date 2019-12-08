const fs = require('fs');

const input = fs.readFileSync('./input.txt', { encoding: 'utf8'}).trim();

const [ width, height ] = [ 25, 6 ];
const layerSize = width * height;
const layerCount = input.length / layerSize;

console.log(`File length: ${input.length} - dimension: ${width} x ${height} - layers: ${layerCount}`);

let layers = []
for (let i = 0; i < input.length; i += layerSize) {
    layers.push(input.slice(i, i + layerSize));
}

let layerDigits = layers.map(l => [l.replace(/(1|2)*/g, '').length, l.replace(/(0|2)*/g, '').length, l.replace(/(0|1)*/g, '').length]);

const fewestZerosLayer = layerDigits.reduce((cur, nex) => cur = nex[0] < cur[0] ? nex : cur);
console.log(`Layer with fewest zeroes: ${fewestZerosLayer} - puzzle output: ${fewestZerosLayer[1] * fewestZerosLayer[2]}`);


let pixels = '';
for (let x = 0; x < layerSize; x++) {
    for (let z = 0; z < layerCount; z++) {
        if (input[x + z*layerSize] !== '2') {
            pixels += input[x + z*layerSize];
            break;
        }
    }
}

let image = [];
for (let i = 0; i < layerSize; i += width) {
    image.push(pixels.slice(i, i+width));
}

console.log(image);