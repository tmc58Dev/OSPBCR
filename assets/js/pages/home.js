console.log("OS-PBCR Home Page Loaded");

document.addEventListener("DOMContentLoaded", () => {

    const hero = document.querySelector(".hero-section");

    if (!hero) {
        return;
    }

    const background = hero.querySelector(".hero-background");
    const slides = background ? Array.from(background.querySelectorAll(".hero-background-slide")) : [];
    const prevButton = hero.querySelector(".hero-prev");
    const nextButton = hero.querySelector(".hero-next");
    const autoplayDelay = 3000;

    if (!background || slides.length < 2 || !prevButton || !nextButton) {
        return;
    }

    const shuffledSlides = shuffleArray(slides.slice());
    shuffledSlides.forEach((slide) => background.appendChild(slide));

    let activeIndex = 0;
    let autoplayId = null;

    function showSlide(index) {

        activeIndex = (index + shuffledSlides.length) % shuffledSlides.length;

        shuffledSlides.forEach((slide, slideIndex) => {

            const isActive = slideIndex === activeIndex;

            slide.classList.toggle("is-active", isActive);
            slide.setAttribute("aria-hidden", String(!isActive));

        });

    }

    function stopAutoplay() {

        if (autoplayId) {
            window.clearInterval(autoplayId);
            autoplayId = null;
        }

    }

    function startAutoplay() {

        stopAutoplay();
        autoplayId = window.setInterval(() => showSlide(activeIndex + 1), autoplayDelay);

    }

    function restartAutoplay() {

        startAutoplay();

    }

    prevButton.addEventListener("click", () => {
        showSlide(activeIndex - 1);
        restartAutoplay();
    });

    nextButton.addEventListener("click", () => {
        showSlide(activeIndex + 1);
        restartAutoplay();
    });

    hero.addEventListener("mouseenter", stopAutoplay);
    hero.addEventListener("mouseleave", startAutoplay);
    hero.addEventListener("focusin", stopAutoplay);
    hero.addEventListener("focusout", startAutoplay);

    document.addEventListener("visibilitychange", () => {

        if (document.hidden) {
            stopAutoplay();
            return;
        }

        startAutoplay();

    });

    showSlide(0);
    startAutoplay();

});

function shuffleArray(items) {

    for (let index = items.length - 1; index > 0; index -= 1) {

        const swapIndex = Math.floor(Math.random() * (index + 1));
        [items[index], items[swapIndex]] = [items[swapIndex], items[index]];

    }

    return items;

}
