# 4일차 미션
## 캘린더 만들기! 📅

date 객체를 활용한 캘린더 만들기!

**<요청사항>**
- 달력을 만들고 좌우 화살표를 누르면 해당하는 월로 넘어갑니다. !!
- 일마다 선택이 가능해야 하며, 해당 일을 선택했을 경우 메모장이 노출됩니다.
- 메모장에는 메모를 입력할 수 있습니다.
- 메모를 입력한 후 다시 캘린더 화면으로 돌아오면 해당 일에 작은 원으로 메모가 있음을 표시합니다.
- 메모 기록이 있는 날짜를 클릭할 경우 기록 했던 메모장이 노출됩니다.
- 메모장에 기록한 내용을 수정할 수 있습니다.

### 1차 구성
- date 객체를 사용하여 캘린더 구조를 짜는 것이 먼저!
- 메모 기능을 같이 진행하는 것보단 캘린더를 만든 후에 메모 기능을 추가하자!

***캘린더 기본 로직은 서치를 통해 가져왔습니다***  

<img width="430" alt="image" src="https://github.com/jxharin/frontend-challenge-project/assets/126852968/2de453cc-d790-48b8-ade1-0ef8e0f07642">  

```
document.addEventListener('DOMContentLoaded', function () {
    const currentDate = new Date();
    currentDate.setDate(1); // 현재 달의 첫 날로 설정

    const renderCalendar = () => {
        const monthTitle = document.getElementById('month-title');
        const datesElement = document.getElementById('dates');

        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        monthTitle.textContent = `${currentDate.getFullYear()}년 ${monthNames[currentDate.getMonth()]}`;

        datesElement.innerHTML = '';

        // 이번 달의 첫날과 마지막날 구하기
        const firstDayIndex = currentDate.getDay();
        const lastDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

        // 지난 달의 마지막 날짜와 다음 달의 첫 날짜 구하기 (빈 칸 채우기용)
        const prevLastDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

        // 지난 달의 날짜들을 채우기
        for (let x = firstDayIndex; x > 0; x--) {
            const div = document.createElement('div');
            div.classList.add('day');
            div.textContent = prevLastDate - x + 1;
            div.style.opacity = '0.5';
            datesElement.appendChild(div);
        }

        // 이번 달의 날짜들을 채우기
        for (let i = 1; i <= lastDate; i++) {
            const div = document.createElement('div');
            div.classList.add('day');
            div.textContent = i;
            const today = new Date();
            if (currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear() && i === today.getDate()) {
                div.classList.add('today'); // 'today' 클래스 추가
            }
            datesElement.appendChild(div);
        }

        // 다음 달의 첫주를 채우기 위한 빈 칸 계산
        const nextDays = 7 - (lastDate + firstDayIndex) % 7;
        if (nextDays < 7) {
            for (let j = 1; j <= nextDays; j++) {
                const div = document.createElement('div');
                div.classList.add('day');
                div.textContent = j;
                div.style.opacity = '0.5';
                datesElement.appendChild(div);
            }
        }
    };

    document.getElementById('prebutton').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    document.getElementById('nextbutton').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar(); 
});

```

