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

exports.permutations = function (a) {
    return a.length ? a.reduce((r, v, i) => [ ...r, ...exports.permutations([ ...a.slice(0, i), ...a.slice(i + 1) ]).map(x => [ v, ...x ])], []) : [[]];
}

exports.clamp = function (n, min, max) {
    if (n < min) {
        return min;
    } else if (n > max) {
        return max;
    } else {
        return n;
    }
}