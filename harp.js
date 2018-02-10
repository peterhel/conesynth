function harp([note, duration]) {
    const gainNode = context.createGain();
    gainNode.gain.setValueAtTime(0.05, 0);
    gainNode.connect(context.destination);

    return () => {
        const currentTime = context.currentTime;
        const oscillator = context.createOscillator();
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(notes[note], 0);
        oscillator.connect(gainNode);
        oscillator.start(currentTime);
        oscillator.stop(currentTime + duration * 60 / tempo);
    };
}
