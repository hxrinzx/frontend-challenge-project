document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('addButton');
    const todoInput = document.getElementById('todo');
    const prioritySelect = document.getElementById('priority');
    const todoList = document.getElementById('todolist');
    const filterAll = document.getElementById('filterAll');
    const filterCompleted = document.getElementById('filterCompleted');
    const filterUncompleted = document.getElementById('filterUncompleted');

    addButton.addEventListener('click', function () {
        const todoText = todoInput.value.trim();
        const priority = prioritySelect.value;

        if (todoText === '') {
            alert('할 일을 입력해주세요.');
            return;
        }

        const listItem = document.createElement('li');
        const textSpan = document.createElement('span');
        textSpan.textContent = todoText;
        const prioritySpan = document.createElement('span');
        prioritySpan.textContent = ' [' + priority + ']';
        switch (priority) {
            case '아주 높음':
                prioritySpan.className = 'priority-very-high';
                break;
            case '높음':
                prioritySpan.className = 'priority-high';
                break;
            case '보통':
                prioritySpan.className = 'priority-nomal';
                break;
            case '낮음':
                prioritySpan.className = 'priority-low';
                break;
        }

        const checkBox = document.createElement('input');

        checkBox.type = 'checkbox';
        checkBox.className = 'custom-checkbox'; 
        checkBox.addEventListener('change', function () {
            if (this.checked) {
                this.classList.add('checked'); 
            } else {
                this.classList.remove('checked');
            }
        });
        const editButton = createEditButton(textSpan);
        const deleteButton = createDeleteButton();

        listItem.appendChild(checkBox);
        listItem.appendChild(textSpan);
        listItem.appendChild(prioritySpan);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        todoList.appendChild(listItem);

        todoInput.value = '';
    });

    function handleCheckChange() {
        const listItem = this.parentNode;
        listItem.classList.toggle('completed', this.checked);
    }

    function createEditButton(textSpan) {
        const button = document.createElement('button');
        button.textContent = '수정';
        button.onclick = function () {
            const isEditable = textSpan.contentEditable === 'true';
            textSpan.contentEditable = !isEditable;
            textSpan.focus();
            button.textContent = isEditable ? '수정' : '저장';
        };
        return button;
    }

    function createDeleteButton() {
        const button = document.createElement('button');
        button.textContent = '삭제';
        button.onclick = function () {
            const listItem = this.parentNode;
            listItem.remove();
        };
        return button;
    }

    filterAll.onclick = () => filterTodos('all');
    filterCompleted.onclick = () => filterTodos('completed');
    filterUncompleted.onclick = () => filterTodos('uncompleted');

    function filterTodos(filter) {
        const todos = todoList.children; 
        Array.from(todos).forEach(todo => {
            switch (filter) {
                case 'all':
                    todo.style.display = '';
                    break;
                case 'completed':
                    if (todo.querySelector('input[type="checkbox"]').checked) {
                        todo.style.display = '';
                    } else {
                        todo.style.display = 'none';
                    }
                    break;
                case 'uncompleted':
                    if (!todo.querySelector('input[type="checkbox"]').checked) {
                        todo.style.display = '';
                    } else {
                        todo.style.display = 'none';
                    }
                    break;
            }
        });
    }

});
