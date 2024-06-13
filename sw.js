let startTime, updatedTime, difference, tInterval, savedTime = 0;
let running = false;
let lapCount = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - savedTime;
        tInterval = setInterval(updateTime, 1000 / 60);
        startStopBtn.innerHTML = 'Stop';
        running = true;
    } else {
        clearInterval(tInterval);
        savedTime = new Date().getTime() - startTime;
        startStopBtn.innerHTML = 'Start';
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    savedTime = 0;
    running = false;
    startStopBtn.innerHTML = 'Start';
    display.innerHTML = '00:00:00';
    laps.innerHTML = '';
    lapCount = 0;
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    display.innerHTML = (hours > 9 ? hours : "0" + hours) + ':' + 
                        (minutes > 9 ? minutes : "0" + minutes) + ':' + 
                        (seconds > 9 ? seconds : "0" + seconds);
}

function recordLap() {
    if (running) {
        lapCount++;
        const lapTime = display.innerHTML;
        const lapElement = document.createElement('div');
        lapElement.innerHTML = `Lap ${lapCount}: ${lapTime}`;
        laps.appendChild(lapElement);
    }
}
