let currentIndex = 0;
const slides = document.querySelectorAll(".slide, .tall-slide");

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove("active");
        slide.style.display = "none"; // 모든 이미지 숨김

        if (i === index) {
            slide.classList.add("active");
            slide.style.display = "block"; // 선택한 이미지만 표시
        }
    });
}

function prevSlide() {
    currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
    showSlide(currentIndex);
}

function nextSlide() {
    currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
    showSlide(currentIndex);
}