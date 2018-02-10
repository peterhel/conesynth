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
        this.progressListeners.push(fn);
        fn(this.position);
    }

    fireProgress() {
        this.progressListeners.forEach(l => l(Math.round(this.position / this.notes.length * 1000) / 1000));
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
        let nextPosition = this.position + steps;
        this.position = nextPosition < 0 ? 0 : nextPosition;
        console.log(this.position, steps);
    }
}

const ch1 = new Channel(context, 'triangle', 1);
ch1.add([harp(['A2', '0.5'])]); //A
ch1.add([harp(['E3', '0.5'])]);
ch1.add([harp(['A3', '0.5'])]);
ch1.add([harp(['C4', '0.5'])]);
ch1.add([harp(['E4', '0.5'])]);
ch1.add([harp(['A4', '0.5'])]);
ch1.add([harp(['C5', '0.5'])]);
ch1.add([harp(['A4', '0.5'])]);
ch1.add([harp(['E4', '0.5'])]);
ch1.add([harp(['C4', '0.5'])]);
ch1.add([harp(['A3', '0.5'])]);
ch1.add([harp(['E3', '0.5'])]);

ch1.add([harp(['A2', '0.5']), bass(['A2', '6'])]); //G

ch1.add([harp(['E3', '0.5'])]);
ch1.add([harp(['A3', '0.5'])]);
ch1.add([harp(['C4', '0.5'])]);
ch1.add([harp(['E4', '0.5'])]);
ch1.add([harp(['A4', '0.5'])]);
ch1.add([harp(['C5', '0.5'])]);
ch1.add([harp(['A4', '0.5'])]);
ch1.add([harp(['E4', '0.5'])]);
ch1.add([harp(['C4', '0.5'])]);
ch1.add([harp(['A3', '0.5'])]);
ch1.add([harp(['E3', '0.5'])]);

ch1.add([harp(['A2', '0.5']), flute(['C5', '3']), bass(['A2', '3'])]); // A
ch1.add([harp(['E3', '0.5'])]);
ch1.add([harp(['A3', '0.5'])]);
ch1.add([harp(['C4', '0.5'])]);
ch1.add([harp(['E4', '0.5'])]);
ch1.add([harp(['A4', '0.5'])]);
ch1.add([harp(['B4', '0.5']), flute(['B4', '3']), bass(['G2', '3'])]);
ch1.add([harp(['G4', '0.5'])]);
ch1.add([harp(['E4', '0.5'])]);
ch1.add([harp(['B3', '0.5'])]);
ch1.add([harp(['G3', '0.5'])]);
ch1.add([harp(['E3', '0.5'])]);

ch1.add([harp(['A2', '0.5']), flute(['C5', '3']), bass(['A2', '3'])]); // F
ch1.add([harp(['E3', '0.5'])]);
ch1.add([harp(['A3', '0.5'])]);
ch1.add([harp(['C4', '0.5'])]);
ch1.add([harp(['E4', '0.5'])]);
ch1.add([harp(['A4', '0.5'])]);
ch1.add([harp(['C5', '0.5']), flute(['A4', '3']), bass(['F2', '3'])]);
ch1.add([harp(['A4', '0.5'])]);
ch1.add([harp(['F4', '0.5'])]);
ch1.add([harp(['C4', '0.5'])]);
ch1.add([harp(['A3', '0.5'])]);
ch1.add([harp(['F3', '0.5'])]);

ch1.add([harp(['G2', '0.5']), flute(['B4', '3']), bass(['G2', '3'])]); // G
ch1.add([harp(['D3', '0.5'])]);
ch1.add([harp(['G3', '0.5'])]);
ch1.add([harp(['B3', '0.5'])]);
ch1.add([harp(['D4', '0.5'])]);
ch1.add([harp(['G4', '0.5'])]);
ch1.add([harp(['B4', '0.5']), flute(['G4', '3']), bass(['E2', '3'])]); //Em
ch1.add([harp(['G4', '0.5'])]);
ch1.add([harp(['E4', '0.5'])]);
ch1.add([harp(['B3', '0.5'])]);
ch1.add([harp(['G3', '0.5'])]);
ch1.add([harp(['E3', '0.5'])]);

ch1.add([harp(['F2', '0.5']), flute(['A4', '4']), bass(['F2', '4'])]); // F
ch1.add([harp(['C3', '0.5'])]);
ch1.add([harp(['F3', '0.5'])]);
ch1.add([harp(['A3', '0.5'])]);
ch1.add([harp(['C4', '0.5'])]);
ch1.add([harp(['F4', '0.5'])]);
ch1.add([harp(['C5', '0.5'])]);
ch1.add([harp(['A4', '0.5'])]);
ch1.add([harp(['F4', '0.5']), flute(['G4', '1']), bass(['E2', '1'])]);
ch1.add([harp(['C4', '0.5'])]);
ch1.add([harp(['A3', '0.5']), flute(['F4', '1']), bass(['D2', '1'])]);
ch1.add([harp(['F3', '0.5'])]);

ch1.add([harp(['C2', '0.5']), flute(['E4', '4']), bass(['C2', '4'])]);
ch1.add([harp(['G2', '0.5'])]);
ch1.add([harp(['C3', '0.5'])]);
ch1.add([harp(['E3', '0.5'])]);
ch1.add([harp(['G3', '0.5'])]);
ch1.add([harp(['C4', '0.5'])]);
ch1.add([harp(['E4', '0.5'])]);
ch1.add([harp(['C4', '0.5'])]);
ch1.add([harp(['G3', '0.5']), flute(['D4', '1']), bass(['B1', '1'])]);
ch1.add([harp(['E3', '0.5'])]);
ch1.add([harp(['C3', '0.5']), flute(['C4', '1']), bass(['A1', '1'])]);
ch1.add([harp(['G2', '0.5'])]);

ch1.add([harp(['C2', '0.5']), flute(['D4', '3']), bass(['B1', '3'])]);
ch1.add([harp(['G2', '0.5'])]);
ch1.add([harp(['C3', '0.5'])]);
ch1.add([harp(['E3', '0.5'])]);
ch1.add([harp(['G3', '0.5'])]);
ch1.add([harp(['C4', '0.5'])]);
ch1.add([harp(['G3', '0.5']), flute(['C4', '2']), bass(['A1', '2'])]);
ch1.add([harp(['E4', '0.5'])]);
ch1.add([harp(['C4', '0.5'])]);
ch1.add([harp(['E3', '0.5'])]);
ch1.add([harp(['C3', '0.5']), flute(['D4', '1']), bass(['B1', '1'])]);
ch1.add([harp(['G2', '0.5'])]);

ch1.add([harp(['C2', '0.5']), flute(['E4', '4']), bass(['C2', '4'])]);
ch1.add([harp(['G2', '0.5'])]);
ch1.add([harp(['C3', '0.5'])]);
ch1.add([harp(['E3', '0.5'])]);
ch1.add([harp(['G3', '0.5'])]);
ch1.add([harp(['C4', '0.5'])]);
ch1.add([harp(['E4', '0.5'])]);
ch1.add([harp(['C4', '0.5'])]);
ch1.add([harp(['G3', '0.5']), flute(['D4', '1']), bass(['B1', '1'])]);
ch1.add([harp(['E3', '0.5'])]);
ch1.add([harp(['C3', '0.5']), flute(['C4', '1']), bass(['A1', '1'])]);
ch1.add([harp(['G2', '0.5'])]);

ch1.add([harp(['G2', '0.5']), flute(['B3', '3']), bass(['G1', '3'])]);
ch1.add([harp(['D2', '0.5'])]);
ch1.add([harp(['G3', '0.5'])]);
ch1.add([harp(['B3', '0.5'])]);
ch1.add([harp(['D3', '0.5'])]);
ch1.add([harp(['G4', '0.5'])]);
ch1.add([harp(['B3', '0.5']), flute(['G3', '2']), bass(['E1', '3'])]);
ch1.add([harp(['G4', '0.5'])]);
ch1.add([harp(['E4', '0.5'])]);
ch1.add([harp(['B3', '0.5'])]);
ch1.add([harp(['E3', '0.5']), flute(['E3', '1'])]);
ch1.add([harp(['B2', '0.5'])]);

ch1.add([harp(['A2', '0.5']), flute(['A3', '6']), bass(['A1', '6'])]);
ch1.add([harp(['E2', '0.5'])]);
ch1.add([harp(['A3', '0.5'])]);
ch1.add([harp(['C3', '0.5'])]);
ch1.add([harp(['E3', '0.5'])]);
ch1.add([harp(['A4', '0.5'])]);
ch1.add([harp(['C3', '0.5'])]);
ch1.add([harp(['A4', '0.5'])]);
ch1.add([harp(['E4', '0.5'])]);
ch1.add([harp(['C3', '0.5'])]);
ch1.add([harp(['A3', '0.5'])]);
ch1.add([harp(['E2', '0.5'])]);

function tracker() {
    var oscillator = context.createOscillator();
    var gain = context.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(0, 0);
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
