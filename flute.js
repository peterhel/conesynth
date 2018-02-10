function flute([note, duration]) {
    const oscillator = context.createOscillator();
    const modulator = context.createOscillator();
    modulator.frequency.setValueAtTime(12, 0);
    const gainNode = context.createGain();
    const gainNode2 = context.createGain();
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(notes[note], 0);
    gainNode.connect(gainNode2);
    gainNode2.connect(context.destination);

    modulator.connect(gainNode.gain);
    oscillator.connect(gainNode);

    gainNode2.gain.setValueAtTime(.1, 0);

    return () => {
        // const currentTime = context.currentTime;
        // oscillator.start(currentTime);
        // oscillator.stop(currentTime + duration * 60 / tempo);
        // modulator.start(currentTime);
        // modulator.stop(currentTime + duration * 60 / tempo);
    }
}
