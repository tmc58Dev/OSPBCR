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

document.addEventListener("DOMContentLoaded", () => {

    const statNumbers = Array.from(document.querySelectorAll("[data-count-to]"));

    if (statNumbers.length === 0) {
        return;
    }

    const animateValue = (element) => {

        const target = Number(element.dataset.countTo);
        const suffix = element.dataset.countSuffix || "";
        if (typeof gsap !== "undefined") {
            const counter = { value: 0 };

            gsap.to(counter, {
                value: target,
                duration: target >= 1000 ? 2 : 1.6,
                ease: "power2.out",
                snap: { value: 1 },
                onUpdate: () => {
                    element.textContent = `${Math.round(counter.value)}${suffix}`;
                }
            });

            return;
        }

        const duration = target >= 1000 ? 2000 : 1600;
        const startTime = performance.now();

        const tick = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.round(target * eased);

            element.textContent = `${value}${suffix}`;

            if (progress < 1) {
                window.requestAnimationFrame(tick);
            }
        };

        window.requestAnimationFrame(tick);

    };

    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {

        statNumbers.forEach((element) => {
            ScrollTrigger.create({
                trigger: element,
                start: "top 88%",
                once: true,
                onEnter: () => animateValue(element)
            });
        });

        return;
    }

    const observer = new IntersectionObserver((entries, activeObserver) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            animateValue(entry.target);
            activeObserver.unobserve(entry.target);
        });
    }, { threshold: 0.35 });

    statNumbers.forEach((element) => observer.observe(element));

});

function shuffleArray(items) {

    for (let index = items.length - 1; index > 0; index -= 1) {

        const swapIndex = Math.floor(Math.random() * (index + 1));
        [items[index], items[swapIndex]] = [items[swapIndex], items[index]];

    }

    return items;

}
