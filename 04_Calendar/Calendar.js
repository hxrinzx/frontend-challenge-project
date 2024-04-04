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
