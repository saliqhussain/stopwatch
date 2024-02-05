let timer;
let isRunning = false;
let startTime;
let laps = [];

function startStop() {
    const startBtn = document.getElementById('startBtn');
    if (isRunning) {
        clearInterval(timer);
        startBtn.textContent = 'Start';
    } else {
        startTime = Date.now() - laps.reduce((acc, lap) => acc + lap, 0);
        timer = setInterval(updateDisplay, 10);
        startBtn.textContent = 'Stop';
    }
    isRunning = !isRunning;
}

function lap() {
    if (isRunning) {
        const lapTime = Date.now() - startTime;
        laps.push(lapTime);
        updateLapsList();
    }
}

function reset() {
    clearInterval(timer);
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
    document.getElementById('milliseconds').textContent = '00';
    document.getElementById('startBtn').textContent = 'Start';
    laps = [];
    updateLapsList();
}

function updateDisplay() {
    const elapsedTime = Date.now() - startTime;
    const minutes = Math.floor(elapsedTime / (60 * 1000));
    const seconds = Math.floor((elapsedTime % (60 * 1000)) / 1000);
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);

    document.getElementById('minutes').textContent = padNumber(minutes);
    document.getElementById('seconds').textContent = padNumber(seconds);
    document.getElementById('milliseconds').textContent = padNumber(milliseconds);
}

function padNumber(number) {
    return number.toString().padStart(2, '0');
}

function updateLapsList() {
    const lapsList = document.getElementById('lapsList');
    lapsList.innerHTML = '';
    laps.forEach((lap, index) => {
        const li = document.createElement('li');
        li.textContent = `Lap ${index + 1}: ${formatTime(lap)}`;
        lapsList.appendChild(li);
    });
}

function formatTime(time) {
    const minutes = Math.floor(time / (60 * 1000));
    const seconds = Math.floor((time % (60 * 1000)) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${padNumber(minutes)}:${padNumber(seconds)}.${padNumber(milliseconds)}`;
}
