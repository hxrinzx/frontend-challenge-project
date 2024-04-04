document.addEventListener('DOMContentLoaded', function () {
    const currentDate = new Date();
    currentDate.setDate(1);

    const memoData = new Map(); // 날짜별 메모 저장
    const memoSection = document.getElementById('memo-content');
    memoSection.style.display = 'none'; // 초기에 memo-content 숨기기

    const renderCalendar = () => {
        const monthTitle = document.getElementById('month-title');
        const datesElement = document.getElementById('dates');
        monthTitle.textContent = `${currentDate.getFullYear()}년 ${(currentDate.getMonth() + 1)}월`;
        datesElement.innerHTML = '';
        memoSection.style.display = 'none'; // 캘린더를 새로 그릴 때마다 memo-content 숨기기

        const firstDayIndex = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
        const lastDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

        for (let i = 1; i <= lastDate; i++) {
            const div = document.createElement('div');
            div.classList.add('day');
            div.textContent = i;
            const fullDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            div.setAttribute('data-date', fullDate);
            if (memoData.has(fullDate)) {
                const memoIndicator = document.createElement('span');
                memoIndicator.textContent = '●';
                div.appendChild(memoIndicator);
            }
            const today = new Date();
            if (i === today.getDate() && currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear()) {
                div.classList.add('today'); // 현재 날짜에 'today' 클래스 추가
            }

            div.addEventListener('click', () => openMemo(fullDate)); // 날짜 클릭 이벤트 핸들러 수정
            datesElement.appendChild(div);
        }
    };

    function openMemo(date) {
        memoSection.innerHTML = '';
        memoSection.style.display = 'block'; // 메모 섹션 보이기

        const memoList = memoData.get(date) || [];
        memoList.forEach(memo => {
            const memoDiv = document.createElement('div');
            memoDiv.textContent = memo;
            const editButton = createEditButton(memoDiv, memo, date); // 수정 버튼 생성
            memoDiv.appendChild(editButton);
            memoSection.appendChild(memoDiv);
        });

        const inputField = document.createElement('input');
        inputField.type = 'text';
        const addButton = document.createElement('button');
        addButton.textContent = '추가';
        addButton.classList.add('add-button'); // '추가' 버튼에 클래스 추가
        addButton.onclick = () => {
            if (inputField.value.trim() !== '') {
                const newMemo = inputField.value.trim();
                const memos = memoData.get(date) || [];
                memos.push(newMemo);
                memoData.set(date, memos);
                openMemo(date);
                updateMemoIndicator(date);
            }
        };
        memoSection.appendChild(inputField);
        memoSection.appendChild(addButton);

    }

    function createEditButton(memoDiv, memo, date) {
        const button = document.createElement('button');
        button.textContent = '수정';
        button.classList.add('edit-button'); // 수정 버튼에 클래스 추가
        button.onclick = function () {
            const isEditable = memoDiv.contentEditable === 'true';
            memoDiv.contentEditable = !isEditable;
            if (isEditable) {
                // 내용 저장
                button.classList.remove('save-button');
                button.classList.add('edit-button');
                const memoIndex = memoData.get(date).indexOf(memo);
                if (memoIndex !== -1) {
                    memoData.get(date)[memoIndex] = memoDiv.textContent;
                    button.textContent = '수정';
                }
            } else {
                // 편집 가능하도록 변경
                button.textContent = '저장';
                button.classList.remove('edit-button');
                button.classList.add('save-button'); // 저장 버튼에 클래스 추가
                memoDiv.focus();
            }
        };
        return button;
    }


    function updateMemoIndicator(date) {
        const allDays = document.querySelectorAll('.day');
        allDays.forEach(day => {
            if (day.getAttribute('data-date') === date && memoData.get(date)) {
                if (!day.querySelector('span')) {
                    const memoIndicator = document.createElement('span');
                    memoIndicator.textContent = ' ●';
                    day.appendChild(memoIndicator);
                }
            }
        });
    }

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
