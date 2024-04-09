document.addEventListener('DOMContentLoaded', function () {
    let index = 0;
    let intervalId = null;

    const slides = document.querySelectorAll(".slide");
    const totalSlides = slides.length;

    // 슬라이드를 자동으로 전환하는 함수
    function startSlideShow() {
        intervalId = setInterval(function () {
            moveToNextSlide();
        }, 2000); // 2초 간격으로 슬라이드 전환
    }

    function moveToPrevSlide() {
        if (index === 0) {
            index = totalSlides - 1;
        } else {
            index--;
        }
        updateSlidePosition();
    }

    function moveToNextSlide() {
        if (index === totalSlides - 1) {
            index = 0;
        } else {
            index++;
        }
        updateSlidePosition();
    }

    function updateSlidePosition() {
        for (let slide of slides) {
            slide.style.transform = `translateX(-${index * 100}%)`;
        }
    }

    document.querySelector(".prev").addEventListener("click", function () {
        moveToPrevSlide();
        restartSlideShow();
    });

    document.querySelector(".next").addEventListener("click", function () {
        moveToNextSlide();
        restartSlideShow();
    });

    // 슬라이드 쇼를 재시작하는 함수
    function restartSlideShow() {
        clearInterval(intervalId); // 기존 인터벌을 멈춤
        startSlideShow(); // 슬라이드 쇼를 다시 시작
    }

    startSlideShow(); // 웹 페이지 로딩 시 슬라이드 쇼 시작
});
