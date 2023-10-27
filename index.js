const frequencies = {
    "c":  [16.35, 32.70, 65.41,  130.81, 261.63, 523.25, 1046.50, 2093.00, 4186.01],
    "c#": [17.32, 34.65, 69.30,  138.59, 277.18, 554.37, 1108.73, 2217.46, 4434.92],
    "d":  [18.35, 36.71, 73.42,  146.83, 293.66, 587.33, 1174.66, 2349.32, 4698.63],
    "d#": [19.45, 38.89, 77.78,  155.56, 311.13, 622.25, 1244.51, 2489.02, 4978.03],
    "e":  [20.60, 41.20, 82.41,  164.81, 329.63, 659.25, 1318.51, 2637.02, 5274.04],
    "f":  [21.83, 43.65, 87.31,  174.61, 349.23, 698.46, 1396.91, 2793.83, 5587.65],
    "f#": [23.12, 46.25, 92.50,  185.00, 369.99, 739.99, 1479.98, 2959.96, 5919.91],
    "g":  [24.50, 49.00, 98.00,  196.00, 392.00, 783.99, 1567.98, 3135.96, 6271.93],
    "g#": [25.96, 51.91, 103.83, 207.65, 415.30, 830.61, 1661.22, 3322.44, 6644.88],
    "a":  [27.50, 55.00, 110.00, 220.00, 440.00, 880.00, 1760.00, 3520.00, 7040.00],
    "a#": [29.14, 58.27, 116.54, 233.08, 466.16, 932.33, 1864.66, 3729.31, 7458.62],
    "b":  [30.87, 61.74, 123.47, 246.94, 493.88, 987.77, 1975.53, 3951.07, 7902.13]
};

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let oscillator = null;

function getFrequency(note, octave, intonation) {
    const baseFreq = frequencies[note.toLowerCase()][octave];
    return baseFreq * Math.pow(2, intonation / 1200);
}

function playNote() {
    try {
        const pitch = prompt("enter pitch");
        const octave = parseInt(prompt("enter octave"));
        const intonation = parseInt(prompt("Enter intonation"));
        const frequency = getFrequency(pitch, octave, intonation);
        
        const playingText = document.createElement('p');
        playingText.innerText = "Playing frequency " + frequency;
        document.body.appendChild(playingText);

        startOscillator(frequency);
        setTimeout(stopSound, 4000);
    } catch (e) {
        alert(e.stack);
        oscillator.stop();
    }
}

function startOscillator(frequency) {
    if (oscillator !== null) {
        oscillator.stop();
    }

    oscillator = audioCtx.createOscillator();
    oscillator.connect(audioCtx.destination);
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    oscillator.start();
}

function stopSound() {
    if (oscillator !== null) {
        oscillator.stop();
        oscillator = null;
    }
    const playingText = document.querySelector('p');
    if (playingText) playingText.remove();
}

document.querySelector("#play").addEventListener("click", playNote);
document.querySelector("#stop").addEventListener("click", stopSound);