# 2일차 미션
## 카운트다운 타이머 만들기!⏱

**<요청사항>**
- 시간, 분, 초를 입력하는 영역이 존재한다.
- START, STOP, RESET 버튼이 존재한다.
- START 버튼을 누르면 시간, 분, 초 단위로 카운트 다운 작동 (시간, 분, 초를 입력하는 영역이 사라진다)
- STOP 버튼을 누르면 카운트 다운을 정지한다.
- RESET 버튼을 누르면 모든 항목 0으로 초기화 되면서 다시 시간,분,초를 입력하는 영역이 나타난다.

### 1차 function 구성
- START 버튼: 사용자가 입력한 시간을 초 단위로 계산하여 totalTimeInSeconds 변수에 저장. 입력 영역을 숨기고, setInterval 함수를 사용하여 1초마다 타이머를 업데이트 하기. 설정된 시간이 종료되면 타이머를 정지하고 사용자에게 알리기.

- STOP 버튼: clearInterval 함수를 사용하여 현재 진행 중인 타이머를 정지시키는 기능 구현.

- RESET 버튼: 타이머를 정지하고 모든 입력 값을 초기화. 입력 영역을 다시 표시하고, 타이머를 초기 상태(00:00:00)로 설정.

**수정해야될 부분** =>
STOP 버튼을 눌렀다가 다시 START를 눌렀을 때, 처음 입력했던 시간 값으로 타이머 재시작 => 타이머를 멈췄던 시점에서 다시 타이머가 작동하게 해야 함 

**totalTime 변수를 전역 변수로 선언하고, STOP 버튼을 눌렀을 때 totalTime의 값을 유지하도록 함. 그리고 START 버튼을 눌렀을 때, 사용자가 새로운 시간을 입력하지 않았다면 이전에 멈췄던 totalTime 값에서 카운트다운을 시작하도록 구성.**

### 최종 javascript 코드
```
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

```

