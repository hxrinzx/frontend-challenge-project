const correctID = 'resat';
const correctPassword = 'resat123';

function login() {
    const id = document.querySelector('input[name="id"]').value;
    const password = document.querySelector('input[name="password"]').value;

    if (id === correctID && password === correctPassword) {
        alert('로그인 되었습니다! 🥰');
    } else {
        alert('ID 혹은 PW가 잘못되었습니다 😭');
    }
}

document.querySelector('#submit-button button').addEventListener('click', login);
