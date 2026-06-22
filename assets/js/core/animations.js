gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {

    gsap.from("main", {

        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out"

    });

});

gsap.utils.toArray(".fade-up").forEach((element) => {

    gsap.from(element, {

        scrollTrigger: {
            trigger: element,
            start: "top 85%"
        },

        opacity: 0,
        y: 20,
        duration: 0.6

    });

});