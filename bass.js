function bass([note, duration]) {
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(notes[note], 0);

    oscillator.connect(gainNode);

    gainNode.connect(context.destination);
    gainNode.gain.setValueAtTime(.2, 0);

    return () => {
        // const currentTime = context.currentTime;
        // oscillator.start(currentTime);
        // oscillator.stop(currentTime + duration * 60 / tempo);
    }
}
