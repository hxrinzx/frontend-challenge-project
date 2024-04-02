var interval;
var isRunning = false;
var totalTime;

function startTimer() {
    if (isRunning) return;
    isRunning = true;

    if (totalTime === undefined || totalTime <= 0) {
        var hours = parseInt(document.getElementById('hours').value) || 0;
        var minutes = parseInt(document.getElementById('minutes').value) || 0;
        var seconds = parseInt(document.getElementById('seconds').value) || 0;
        totalTime = hours * 3600 + minutes * 60 + seconds;
    }

    document.getElementById('inputArea').style.display = 'none';

    interval = setInterval(function () {
        var hours = Math.floor(totalTime / 3600);
        var minutes = Math.floor((totalTime % 3600) / 60);
        var seconds = totalTime % 60;

        document.getElementById('timer-view').innerText = hours.toString().padStart(2, '0') + ' : ' +
            minutes.toString().padStart(2, '0') + ' : ' +
            seconds.toString().padStart(2, '0');
        totalTime--;

        if (totalTime < 0) {
            clearInterval(interval);
            alert('타이머 종료!');
            resetTimer();
        }
    }, 1000);
}

function stopTimer() {
    if (!isRunning) return;
    clearInterval(interval);
    isRunning = false;
}

function resetTimer() {
    stopTimer();
    totalTime = undefined;
    document.getElementById('inputArea').style.display = '';
    document.getElementById('timer-view').innerText = '00 : 00 : 00';
}

document.getElementById('buttons').children[0].addEventListener('click', startTimer);
document.getElementById('buttons').children[1].addEventListener('click', stopTimer);
document.getElementById('buttons').children[2].addEventListener('click', resetTimer);
