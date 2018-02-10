// create web audio api context
var context = new (window.AudioContext || window.webkitAudioContext)();
var tempo = 140;

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
        this.notes = [];
        this.hazNotes = true;

        this.position = 0;
        this.progressListeners = [];
    }

    add(noteData) {
        this.notes.push(noteData);
    }

    onProgress(fn) {
        this.progressListeners.push(fn)
    }

    fireProgress() {
        this.progressListeners.forEach(l => l(Math.round((this.position/this.notes.length)*1000)/1000));
    }

    playNext() {
        const args = this.notes[this.position];
        this.position++;
        this.fireProgress();

        if (!args) {
            this.hazNotes = false;
            return;
        }

        args.forEach(ch => {
            ch();
        });
    }

    skip(steps = 8) {
        this.position += 8;
    }
}

function flute() {
    for (var key in this) {
        var oscillator = context.createOscillator();
        var modulator = context.createOscillator();
        modulator.frequency.value = 12;
        var gainNode = context.createGain();
        var gainNode2 = context.createGain();
        oscillator.type = 'triangle';
        oscillator.frequency.value = notes[key]; // value in hertz
        gainNode.connect(gainNode2);
        gainNode2.connect(context.destination);

        modulator.connect(gainNode.gain);
        oscillator.connect(gainNode);

        gainNode2.gain.value = 0.1;
        var currentTime = context.currentTime;
        oscillator.start(currentTime);
        oscillator.stop(currentTime + this[key] * 60 / tempo);
        modulator.start(currentTime);
        modulator.stop(currentTime + this[key] * 60 / tempo);
    }
}

function bass() {
    for (var key in this) {
        var oscillator = context.createOscillator();
        var gainNode = context.createGain();
        oscillator.type = 'triangle';
        oscillator.frequency.value = notes[key]; // value in hertz

        oscillator.connect(gainNode);

        gainNode.connect(context.destination);
        gainNode.gain.value = 0.2;

        var currentTime = context.currentTime;
        oscillator.start(currentTime);
        oscillator.stop(currentTime + this[key] * 60 / tempo);
    }
}

function harp() {
    for (var key in this) {
        var oscillator = context.createOscillator();
        var gainNode = context.createGain();
        gainNode.gain.value = 0.05;
        oscillator.type = 'square';
        oscillator.frequency.value = notes[key];

        oscillator.connect(gainNode);

        gainNode.connect(context.destination);

        var currentTime = context.currentTime;
        oscillator.start(currentTime);
        oscillator.stop(currentTime + this[key] * 60 / tempo);
    }
}

var ch1 = new Channel(context, 'triangle', 1);
ch1.add([harp.bind({ A2: 0.5 })]); //A
ch1.add([harp.bind({ E3: 0.5 })]);
ch1.add([harp.bind({ A3: 0.5 })]);
ch1.add([harp.bind({ C4: 0.5 })]);
ch1.add([harp.bind({ E4: 0.5 })]);
ch1.add([harp.bind({ A4: 0.5 })]);
ch1.add([harp.bind({ C5: 0.5 })]);
ch1.add([harp.bind({ A4: 0.5 })]);
ch1.add([harp.bind({ E4: 0.5 })]);
ch1.add([harp.bind({ C4: 0.5 })]);
ch1.add([harp.bind({ A3: 0.5 })]);
ch1.add([harp.bind({ E3: 0.5 })]);

ch1.add([harp.bind({ A2: 0.5 }), bass.bind({ A2: 6 })]); //G

ch1.add([harp.bind({ E3: 0.5 })]);
ch1.add([harp.bind({ A3: 0.5 })]);
ch1.add([harp.bind({ C4: 0.5 })]);
ch1.add([harp.bind({ E4: 0.5 })]);
ch1.add([harp.bind({ A4: 0.5 })]);
ch1.add([harp.bind({ C5: 0.5 })]);
ch1.add([harp.bind({ A4: 0.5 })]);
ch1.add([harp.bind({ E4: 0.5 })]);
ch1.add([harp.bind({ C4: 0.5 })]);
ch1.add([harp.bind({ A3: 0.5 })]);
ch1.add([harp.bind({ E3: 0.5 })]);

ch1.add([harp.bind({ A2: 0.5 }), flute.bind({ C5: 3 }), bass.bind({ A2: 3 })]); // A
ch1.add([harp.bind({ E3: 0.5 })]);
ch1.add([harp.bind({ A3: 0.5 })]);
ch1.add([harp.bind({ C4: 0.5 })]);
ch1.add([harp.bind({ E4: 0.5 })]);
ch1.add([harp.bind({ A4: 0.5 })]);
ch1.add([harp.bind({ B4: 0.5 }), flute.bind({ B4: 3 }), bass.bind({ G2: 3 })]);
ch1.add([harp.bind({ G4: 0.5 })]);
ch1.add([harp.bind({ E4: 0.5 })]);
ch1.add([harp.bind({ B3: 0.5 })]);
ch1.add([harp.bind({ G3: 0.5 })]);
ch1.add([harp.bind({ E3: 0.5 })]);

ch1.add([harp.bind({ A2: 0.5 }), flute.bind({ C5: 3 }), bass.bind({ A2: 3 })]); // F
ch1.add([harp.bind({ E3: 0.5 })]);
ch1.add([harp.bind({ A3: 0.5 })]);
ch1.add([harp.bind({ C4: 0.5 })]);
ch1.add([harp.bind({ E4: 0.5 })]);
ch1.add([harp.bind({ A4: 0.5 })]);
ch1.add([harp.bind({ C5: 0.5 }), flute.bind({ A4: 3 }), bass.bind({ F2: 3 })]);
ch1.add([harp.bind({ A4: 0.5 })]);
ch1.add([harp.bind({ F4: 0.5 })]);
ch1.add([harp.bind({ C4: 0.5 })]);
ch1.add([harp.bind({ A3: 0.5 })]);
ch1.add([harp.bind({ F3: 0.5 })]);

ch1.add([harp.bind({ G2: 0.5 }), flute.bind({ B4: 3 }), bass.bind({ G2: 3 })]); // G
ch1.add([harp.bind({ D3: 0.5 })]);
ch1.add([harp.bind({ G3: 0.5 })]);
ch1.add([harp.bind({ B3: 0.5 })]);
ch1.add([harp.bind({ D4: 0.5 })]);
ch1.add([harp.bind({ G4: 0.5 })]);
ch1.add([harp.bind({ B4: 0.5 }), flute.bind({ G4: 3 }), bass.bind({ E2: 3 })]); //Em
ch1.add([harp.bind({ G4: 0.5 })]);
ch1.add([harp.bind({ E4: 0.5 })]);
ch1.add([harp.bind({ B3: 0.5 })]);
ch1.add([harp.bind({ G3: 0.5 })]);
ch1.add([harp.bind({ E3: 0.5 })]);

ch1.add([harp.bind({ F2: 0.5 }), flute.bind({ A4: 4 }), bass.bind({ F2: 4 })]); // F
ch1.add([harp.bind({ C3: 0.5 })]);
ch1.add([harp.bind({ F3: 0.5 })]);
ch1.add([harp.bind({ A3: 0.5 })]);
ch1.add([harp.bind({ C4: 0.5 })]);
ch1.add([harp.bind({ F4: 0.5 })]);
ch1.add([harp.bind({ C5: 0.5 })]);
ch1.add([harp.bind({ A4: 0.5 })]);
ch1.add([harp.bind({ F4: 0.5 }), flute.bind({ G4: 1 }), bass.bind({ E2: 1 })]);
ch1.add([harp.bind({ C4: 0.5 })]);
ch1.add([harp.bind({ A3: 0.5 }), flute.bind({ F4: 1 }), bass.bind({ D2: 1 })]);
ch1.add([harp.bind({ F3: 0.5 })]);

ch1.add([harp.bind({ C2: 0.5 }), flute.bind({ E4: 4 }), bass.bind({ C2: 4 })]);
ch1.add([harp.bind({ G2: 0.5 })]);
ch1.add([harp.bind({ C3: 0.5 })]);
ch1.add([harp.bind({ E3: 0.5 })]);
ch1.add([harp.bind({ G3: 0.5 })]);
ch1.add([harp.bind({ C4: 0.5 })]);
ch1.add([harp.bind({ E4: 0.5 })]);
ch1.add([harp.bind({ C4: 0.5 })]);
ch1.add([harp.bind({ G3: 0.5 }), flute.bind({ D4: 1 }), bass.bind({ B1: 1 })]);
ch1.add([harp.bind({ E3: 0.5 })]);
ch1.add([harp.bind({ C3: 0.5 }), flute.bind({ C4: 1 }), bass.bind({ A1: 1 })]);
ch1.add([harp.bind({ G2: 0.5 })]);

ch1.add([harp.bind({ C2: 0.5 }), flute.bind({ D4: 3 }), bass.bind({ B1: 3 })]);
ch1.add([harp.bind({ G2: 0.5 })]);
ch1.add([harp.bind({ C3: 0.5 })]);
ch1.add([harp.bind({ E3: 0.5 })]);
ch1.add([harp.bind({ G3: 0.5 })]);
ch1.add([harp.bind({ C4: 0.5 })]);
ch1.add([harp.bind({ G3: 0.5 }), flute.bind({ C4: 2 }), bass.bind({ A1: 2 })]);
ch1.add([harp.bind({ E4: 0.5 })]);
ch1.add([harp.bind({ C4: 0.5 })]);
ch1.add([harp.bind({ E3: 0.5 })]);
ch1.add([harp.bind({ C3: 0.5 }), flute.bind({ D4: 1 }), bass.bind({ B1: 1 })]);
ch1.add([harp.bind({ G2: 0.5 })]);

ch1.add([harp.bind({ C2: 0.5 }), flute.bind({ E4: 4 }), bass.bind({ C2: 4 })]);
ch1.add([harp.bind({ G2: 0.5 })]);
ch1.add([harp.bind({ C3: 0.5 })]);
ch1.add([harp.bind({ E3: 0.5 })]);
ch1.add([harp.bind({ G3: 0.5 })]);
ch1.add([harp.bind({ C4: 0.5 })]);
ch1.add([harp.bind({ E4: 0.5 })]);
ch1.add([harp.bind({ C4: 0.5 })]);
ch1.add([harp.bind({ G3: 0.5 }), flute.bind({ D4: 1 }), bass.bind({ B1: 1 })]);
ch1.add([harp.bind({ E3: 0.5 })]);
ch1.add([harp.bind({ C3: 0.5 }), flute.bind({ C4: 1 }), bass.bind({ A1: 1 })]);
ch1.add([harp.bind({ G2: 0.5 })]);

ch1.add([harp.bind({ G2: 0.5 }), flute.bind({ B3: 3 }), bass.bind({ G1: 3 })]);
ch1.add([harp.bind({ D2: 0.5 })]);
ch1.add([harp.bind({ G3: 0.5 })]);
ch1.add([harp.bind({ B3: 0.5 })]);
ch1.add([harp.bind({ D3: 0.5 })]);
ch1.add([harp.bind({ G4: 0.5 })]);
ch1.add([harp.bind({ B3: 0.5 }), flute.bind({ G3: 2 }), bass.bind({ E1: 3 })]);
ch1.add([harp.bind({ G4: 0.5 })]);
ch1.add([harp.bind({ E4: 0.5 })]);
ch1.add([harp.bind({ B3: 0.5 })]);
ch1.add([harp.bind({ E3: 0.5 }), flute.bind({ E3: 1 })]);
ch1.add([harp.bind({ B2: 0.5 })]);

ch1.add([harp.bind({ A2: 0.5 }), flute.bind({ A3: 6 }), bass.bind({ A1: 6 })]);
ch1.add([harp.bind({ E2: 0.5 })]);
ch1.add([harp.bind({ A3: 0.5 })]);
ch1.add([harp.bind({ C3: 0.5 })]);
ch1.add([harp.bind({ E3: 0.5 })]);
ch1.add([harp.bind({ A4: 0.5 })]);
ch1.add([harp.bind({ C3: 0.5 })]);
ch1.add([harp.bind({ A4: 0.5 })]);
ch1.add([harp.bind({ E4: 0.5 })]);
ch1.add([harp.bind({ C3: 0.5 })]);
ch1.add([harp.bind({ A3: 0.5 })]);
ch1.add([harp.bind({ E2: 0.5 })]);

function tracker() {
    var oscillator = context.createOscillator();
    var gain = context.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = 0;
    gain.connect(context.destination);
    oscillator.connect(gain);
    gain.value = 0;
    var currentTime = context.currentTime;
    oscillator.start(currentTime);
    oscillator.stop(currentTime + 0.5 * 60 / tempo);

    if (isPlaying && ch1.hazNotes) {
        oscillator.onended = () => tracker();
        ch1.playNext();
    }
}

// tracker();
let isPlaying = false;
window.play = () => {
    if (!isPlaying) {
        isPlaying = true;
        tracker();
    } else {
        isPlaying = false;
    }
};

window.skip = steps => {
    ch1.skip(steps);
};

ch1.onProgress(console.log);
