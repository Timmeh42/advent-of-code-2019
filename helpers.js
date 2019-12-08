exports.slices = function (inp, l = 1) {
    l = Math.max(l, 1);
    let arr = [];
    for (let i = 0; i < inp.length; i += l) {
        arr.push(inp.slice(i, i + l));
    }
    return arr;
}

exports.range = function* (a, b = a, s = null) {
    const start = b === a ? 0 : a;
    const end = b;
    const step = s === null ? Math.sign(end - start) : s;
    const dir = Math.sign(step);
    let x = start - step;
    if (step === 0) {
        throw new Error('Must use a non-zero step size')
    };
    if (Math.sign(end - start) !== Math.sign(step)) {
        throw new Error('Step must eventually reach end of range')
    }

    while (dir === 1 && x < end - step || dir === -1 && x > end - step) {
        yield x += step;
    }
}