let isPlaying = false;
const controller = {
    play: () => {
        if (!isPlaying) {
            isPlaying = true;
            tracker();
        } else {
            isPlaying = false;
        }
    },
    skip: steps => {
        ch1.skip(steps);
    }
};

// create web audio api context
var context = new (window.AudioContext || window.webkitAudioContext)();
var tempo = 94;

class EnvelopeGenerator {
    constructor(context) {
        this.context = context;

        this.attackTime = 0.0;
        this.releaseTime = 0.45;

        //this.trigger();
    }

    trigger() {
        let now = this.context.currentTime;
        this.param.cancelScheduledValues(now);
        this.param.setValueAtTime(0, now);
        this.param.linearRampToValueAtTime(1, now + this.attackTime);
        this.param.linearRampToValueAtTime(0, now + this.attackTime + this.releaseTime);
    }

    connect(param) {
        this.param = param;
    }
}

class Channel {
    constructor(audioContext, type, gain) {
        this.position = 0;
        this.totalLength = 0;
        this.progressListeners = [];

        this.gainNode = audioContext.createGain();
        this.gainNode.gain.setValueAtTime(gain, 0);
        this.gainNode.connect(audioContext.destination);

        this.oscillator = audioContext.createOscillator();
        this.oscillator.connect(this.gainNode);
        this.oscillator.type = type;
        this.currentTime = context.currentTime;
    }

    add(freq, duration, gain) {
        const length = duration * 60 / tempo;
        this.oscillator.frequency.setValueAtTime(freq, this.totalLength + length);
        if (!isNaN(parseInt(gain))) {
            this.gainNode.gain.setValueAtTime(gain, this.totalLength + length);
        }
        this.totalLength += length;
    }

    onProgress(fn) {
        this.progressListeners.push(fn);
        fn(this.position);
    }

    fireProgress() {
        this.progressListeners.forEach(l => l(Math.round(this.position / this.notes.length * 1000) / 1000));
    }

    play() {
        this.oscillator.start(0);
        // this.position++;
        // this.fireProgress();
    }

    skip(steps = 8) {
        if (steps < 0) {
            let toSubtract = this.position % 12;
            toSubtract = toSubtract < 4 ? 12 + toSubtract : toSubtract;
            const nextPosition = this.position - toSubtract;
            this.position = nextPosition < 0 ? 0 : nextPosition;
        } else {
            const toSubtract = this.position % 12;
            this.position = this.position - toSubtract + 12;
        }

        this.fireProgress();
    }

    goto(position) {
        this.position = position;
        this.fireProgress();
    }
}

const ch1 = new Channel(context, 'triangle', 1);
const position = localStorage.getItem('conan.position');
if (!isNaN(position)) ch1.goto(position);

ch1.add(notes['G2'], '1', 0);
ch1.add(notes['G2'], '0.5', 1);
ch1.add(notes['D3'], '0.5');
ch1.add(notes['G3'], '0.5');
ch1.add(notes['A#3'], '0.5');
ch1.add(notes['D4'], '0.5');
ch1.add(notes['G4'], '0.5');
ch1.add(notes['A#4'], '0.5');
ch1.add(notes['G4'], '0.5');
ch1.add(notes['D4'], '0.5');
ch1.add(notes['A#3'], '0.5');
ch1.add(notes['G3'], '0.5');
ch1.add(notes['D3'], '0.5');

ch1.add(notes['G2'], '0.5');

ch1.add(notes['D3'], '0.5');
ch1.add(notes['G3'], '0.5');
ch1.add(notes['A#3'], '0.5');
ch1.add(notes['D4'], '0.5');
ch1.add(notes['G4'], '0.5');
ch1.add(notes['A#4'], '0.5');
ch1.add(notes['G4'], '0.5');
ch1.add(notes['D4'], '0.5');
ch1.add(notes['A#3'], '0.5');
ch1.add(notes['G3'], '0.5');
ch1.add(notes['D3'], '0.5');

ch1.add(notes['G2'], '0.5');
ch1.add(notes['D3'], '0.5');
ch1.add(notes['G3'], '0.5');
ch1.add(notes['A#3'], '0.5');
ch1.add(notes['D4'], '0.5');
ch1.add(notes['G4'], '0.5');
ch1.add(notes['A4'], '0.5');
ch1.add(notes['F4'], '0.5');
ch1.add(notes['D4'], '0.5');
ch1.add(notes['A3'], '0.5');
ch1.add(notes['F3'], '0.5');
ch1.add(notes['D3'], '0.5');

ch1.add(notes['G2'], '0.5');
ch1.add(notes['D3'], '0.5');
ch1.add(notes['G3'], '0.5');
ch1.add(notes['A#3'], '0.5');
ch1.add(notes['D4'], '0.5');
ch1.add(notes['G4'], '0.5');
ch1.add(notes['A#4'], '0.5');
ch1.add(notes['G4'], '0.5');
ch1.add(notes['D#4'], '0.5');
ch1.add(notes['A#3'], '0.5');
ch1.add(notes['G3'], '0.5');
ch1.add(notes['D#3'], '0.5');

ch1.add(notes['F2'], '0.5'); // G
ch1.add(notes['C3'], '0.5');
ch1.add(notes['F3'], '0.5');
ch1.add(notes['A3'], '0.5');
ch1.add(notes['C4'], '0.5');
ch1.add(notes['F4'], '0.5');
ch1.add(notes['A4'], '0.5'); //Em
ch1.add(notes['F4'], '0.5');
ch1.add(notes['D4'], '0.5');
ch1.add(notes['A3'], '0.5');
ch1.add(notes['F3'], '0.5');
ch1.add(notes['D3'], '0.5');

ch1.add(notes['D#2'], '0.5'); // F
ch1.add(notes['A#2'], '0.5');
ch1.add(notes['D#3'], '0.5');
ch1.add(notes['G3'], '0.5');
ch1.add(notes['A#3'], '0.5');
ch1.add(notes['D#4'], '0.5');
ch1.add(notes['G4'], '0.5');
ch1.add(notes['D#4'], '0.5');
ch1.add(notes['A#3'], '0.5');
ch1.add(notes['G3'], '0.5');
ch1.add(notes['D#3'], '0.5');
ch1.add(notes['A#2'], '0.5');
ch1.add(notes['F3'], '0.5', 0);

// ch1.add(notes['C2'],  '0.5']), flute(['E4', '4']), bass(['C2', '4');
// ch1.add(notes['G2'],  '0.5');
// ch1.add(notes['C3'],  '0.5');
// ch1.add(notes['E3'],  '0.5');
// ch1.add(notes['G3'],  '0.5');
// ch1.add(notes['C4'],  '0.5');
// ch1.add(notes['E4'],  '0.5');
// ch1.add(notes['C4'],  '0.5');
// ch1.add(notes['G3'],  '0.5']), flute(['D4', '1']), bass(['B1', '1');
// ch1.add(notes['E3'],  '0.5');
// ch1.add(notes['C3'],  '0.5']), flute(['C4', '1']), bass(['A1', '1');
// ch1.add(notes['G2'],  '0.5');
//
// ch1.add(notes['C2'],  '0.5']), flute(['D4', '3']), bass(['B1', '3');
// ch1.add(notes['G2'],  '0.5');
// ch1.add(notes['C3'],  '0.5');
// ch1.add(notes['E3'],  '0.5');
// ch1.add(notes['G3'],  '0.5');
// ch1.add(notes['C4'],  '0.5');
// ch1.add(notes['G3'],  '0.5']), flute(['C4', '2']), bass(['A1', '2');
// ch1.add(notes['E4'],  '0.5');
// ch1.add(notes['C4'],  '0.5');
// ch1.add(notes['E3'],  '0.5');
// ch1.add(notes['C3'],  '0.5']), flute(['D4', '1']), bass(['B1', '1');
// ch1.add(notes['G2'],  '0.5');
//
// ch1.add(notes['C2'],  '0.5']), flute(['E4', '4']), bass(['C2', '4');
// ch1.add(notes['G2'],  '0.5');
// ch1.add(notes['C3'],  '0.5');
// ch1.add(notes['E3'],  '0.5');
// ch1.add(notes['G3'],  '0.5');
// ch1.add(notes['C4'],  '0.5');
// ch1.add(notes['E4'],  '0.5');
// ch1.add(notes['C4'],  '0.5');
// ch1.add(notes['G3'],  '0.5']), flute(['D4', '1']), bass(['B1', '1');
// ch1.add(notes['E3'],  '0.5');
// ch1.add(notes['C3'],  '0.5']), flute(['C4', '1']), bass(['A1', '1');
// ch1.add(notes['G2'],  '0.5');
//
// ch1.add(notes['G2'],  '0.5']), flute(['B3', '3']), bass(['G1', '3');
// ch1.add(notes['D2'],  '0.5');
// ch1.add(notes['G3'],  '0.5');
// ch1.add(notes['B3'],  '0.5');
// ch1.add(notes['D3'],  '0.5');
// ch1.add(notes['G4'],  '0.5');
// ch1.add(notes['B3'],  '0.5']), flute(['G3', '2']), bass(['E1', '3');
// ch1.add(notes['G4'],  '0.5');
// ch1.add(notes['E4'],  '0.5');
// ch1.add(notes['B3'],  '0.5');
// ch1.add(notes['E3'],  '0.5']), flute(['E3', '1');
// ch1.add(notes['B2'],  '0.5');
//
// ch1.add(notes['A2'],  '0.5']), flute(['A3', '6']), bass(['A1', '6');
// ch1.add(notes['E2'],  '0.5');
// ch1.add(notes['A3'],  '0.5');
// ch1.add(notes['C3'],  '0.5');
// ch1.add(notes['E3'],  '0.5');
// ch1.add(notes['A4'],  '0.5');
// ch1.add(notes['C3'],  '0.5');
// ch1.add(notes['A4'],  '0.5');
// ch1.add(notes['E4'],  '0.5');
// ch1.add(notes['C3'],  '0.5');
// ch1.add(notes['A3'],  '0.5');
// ch1.add(notes['E2'],  '0.5');

function tracker() {
    ch1.play();
}

ch1.onProgress(position => {
    // localStorage.setItem('conan.position', position);
});

const gainNode = context.createGain();
gainNode.gain.setValueAtTime(0, 0);
gainNode.connect(context.destination);
const oscillator = context.createOscillator();
oscillator.type = 'square';
oscillator.connect(gainNode);
gainNode.connect(context.destination);
oscillator.start(context.currentTime);

const keymap = {
    z: 'C1',
    x: 'D1',
    c: 'E1',
    v: 'F1',
    b: 'G1',
    n: 'A1',
    m: 'B1',
    ',': 'C2',
    '.': 'D2',
    '/': 'E2',
    a: 'F2',
    s: 'G2',
    d: 'A2',
    f: 'B2',
    g: 'C3',
    h: 'D3',
    j: 'E3',
    k: 'F3',
    l: 'G3',
    ';': 'A3',
    "'": 'B3',
    q: 'C4',
    w: 'D4',
    e: 'E4',
    r: 'F4',
    t: 'G4',
    y: 'A4',
    u: 'B4',
    i: 'C5',
    o: 'D5',
    p: 'E5',
    '[': 'F5',
    ']': 'G5',
    '`': 'A5',
    '1': 'B5',
    '2': 'C6',
    '3': 'D6',
    '4': 'E6',
    '5': 'F6',
    '6': 'G6',
    '7': 'A6',
    '8': 'B6'
};

let activeKeys = {};
window.onkeypress = e => {
    if (activeKeys[e.key]) return;
    console.log(e.key);

    activeKeys[e.key] = true;
    oscillator.frequency.setValueAtTime(notes[keymap[e.key]], context.currentTime);
    gainNode.gain.setValueAtTime(1, context.currentTime);

    console.log(activeKeys);
};

window.onkeyup = e => {
    delete activeKeys[e.key];
    if (Object.keys(activeKeys).length === 0) {
        gainNode.gain.setValueAtTime(0, context.currentTime);
    }

    console.log(activeKeys);
};
