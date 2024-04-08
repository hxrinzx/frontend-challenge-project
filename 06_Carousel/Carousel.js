document.addEventListener('DOMContentLoaded', function () {
    let index = 0;

    const slides = document.querySelectorAll(".slide");
    const totalSlides = slides.length;

    document.querySelector(".prev").addEventListener("click", function () {
        moveToPrevSlide();
    });

    document.querySelector(".next").addEventListener("click", function () {
        moveToNextSlide();
    });

    function updateSlidePosition() {
        for (let slide of slides) {
            slide.style.transform = `translateX(-${index * 100}%)`;
        }
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
});
