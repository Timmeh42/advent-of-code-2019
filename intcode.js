"use strict";

const MODE = {
    POSITION: 0,
    IMMEDIATE: 1,
    RELATIVE: 2,
};

const STATE = {
    PAUSED: 0,
    RUNNING: 1,
    COMPLETE: 2,
}

class Machine {
    constructor (memory, inputs, outputs) {
        this.memory = memory;
        this.pointer = 0;
        this.relativeBase = 0;
        this.inputs = inputs;
        this.outputs = outputs;
        this.state = STATE.PAUSED;
        this.instructions = {
            1: this.add.bind(this),
            2: this.mul.bind(this),
            3: this.inp.bind(this),
            4: this.out.bind(this),
            5: this.jit.bind(this),
            6: this.jif.bind(this),
            7: this.clt.bind(this),
            8: this.ceq.bind(this),
            9: this.arb.bind(this),
            99: this.end.bind(this),
        }
    }

    run () {
        this.state = STATE.RUNNING;
        while (this.state === STATE.RUNNING) {
            this.step();
        }
        return this.state;
    }

    step () {
        const code = this.getMem(this.pointer);
        const instruction = this.instructions[code % 100];
        const modes = [
            Math.floor(code / 100) % 10,
            Math.floor(code / 1000) % 10,
            Math.floor(code / 10000) % 10,
        ];
        this.state = instruction(modes);
    }

    getMem (p, mode = MODE.IMMEDIATE) {
        if (mode === MODE.IMMEDIATE) {
            return this.memory[p];
        } else if (mode === MODE.POSITION) {
            return this.memory[this.memory[p]];
        } else if (mode === MODE.RELATIVE) {
            return this.memory[this.memory[p] + this.relativeBase];
        }
    }

    setMem (p, val, mode = MODE.POSITION) {
        if (mode === MODE.IMMEDIATE) {
            this.memory[p] = val;
        } else if (mode === MODE.POSITION) {
            this.memory[this.memory[p]] = val;
        } else if (mode === MODE.RELATIVE) {
            this.memory[this.memory[p] + this.relativeBase] = val;
        }
    }

    add (modes) {
        const p = this.pointer;
        this.setMem(p + 3, this.getMem(p + 1, modes[0]) + this.getMem(p + 2, modes[1]), modes[2]);
        this.pointer += 4;
        return STATE.RUNNING;
    }

    mul (modes) {
        const p = this.pointer;
        this.setMem(p + 3, this.getMem(p + 1, modes[0]) * this.getMem(p + 2, modes[1]), modes[2]);
        this.pointer += 4;
        return STATE.RUNNING;
    }

    inp (modes) {
        const p = this.pointer;
        if (this.inputs.length === 0) {
            return STATE.PAUSED;
        } else {
            this.setMem(p + 1, this.inputs.pop(), modes[0]);
            this.pointer += 2;
            return STATE.RUNNING;
        }
    }

    out (modes) {
        const p = this.pointer;
        this.outputs.unshift(this.getMem(p + 1, modes[0]));
        this.pointer += 2;
        return STATE.PAUSED;
    }

    jit (modes) {
        const p = this.pointer;
        if (this.getMem(p + 1, modes[0]) !== 0) {
            this.pointer = this.getMem(p + 2, modes[1]);
        } else {
            this.pointer += 3;
        }
        return STATE.RUNNING;
    }

    jif (modes) {
        const p = this.pointer;
        if (this.getMem(p + 1, modes[0]) === 0) {
            this.pointer = this.getMem(p + 2, modes[1]);
        } else {
            this.pointer += 3;
        }
        return STATE.RUNNING;
    }

    clt (modes) {
        const p = this.pointer;
        if (this.getMem(p + 1, modes[0]) < this.getMem(p + 2, modes[1])) {
            this.setMem(p + 3, 1, modes[2]);
        } else {
            this.setMem(p + 3, 0, modes[2]);
        }
        this.pointer += 4;
        return STATE.RUNNING;
    }

    ceq (modes) {
        const p = this.pointer;
        if (this.getMem(p + 1, modes[0]) === this.getMem(p + 2, modes[1])) {
            this.setMem(p + 3, 1, modes[2]);
        } else {
            this.setMem(p + 3, 0, modes[2]);
        }
        this.pointer += 4;
        return STATE.RUNNING;
    }

    arb (modes) {
        const p = this.pointer;
        this.relativeBase += this.getMem(p + 1, modes[0]);
        this.pointer += 2;
        return STATE.RUNNING;
    }

    end (modes) {
        return STATE.COMPLETE;
    }
}

module.exports = {
    STATE,
    MODE,
    Machine,
}