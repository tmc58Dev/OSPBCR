if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReducedMotion) {

        window.addEventListener("load", () => {

            gsap.from("main", {
                autoAlpha: 0,
                y: 20,
                duration: 0.65,
                ease: "power3.out",
                clearProps: "transform,opacity,visibility"
            });

        });

        const fadeUpItems = gsap.utils.toArray(".fade-up");
        const lightweightFadeItems = fadeUpItems.filter((item) =>
            item.classList.contains("district-card") ||
            item.closest(".district-grid")
        );
        const standardFadeItems = fadeUpItems.filter((item) =>
            !lightweightFadeItems.includes(item)
        );

        if (standardFadeItems.length > 0) {

            gsap.set(standardFadeItems, {
                autoAlpha: 0,
                y: 28,
                filter: "blur(6px)"
            });

            ScrollTrigger.batch(standardFadeItems, {
                start: "top 88%",
                once: true,
                onEnter: (batch) => {
                    gsap.to(batch, {
                        autoAlpha: 1,
                        y: 0,
                        filter: "blur(0px)",
                        duration: 0.6,
                        ease: "power3.out",
                        stagger: 0.07,
                        clearProps: "transform,opacity,visibility,filter"
                    });
                }
            });

        }

        if (lightweightFadeItems.length > 0) {

            gsap.set(lightweightFadeItems, {
                autoAlpha: 0,
                y: 12
            });

            ScrollTrigger.batch(lightweightFadeItems, {
                start: "top 92%",
                once: true,
                onEnter: (batch) => {
                    gsap.to(batch, {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.32,
                        ease: "power2.out",
                        stagger: 0.025,
                        clearProps: "transform,opacity,visibility"
                    });
                }
            });

        }

    } else {

        gsap.set(".fade-up", {
            clearProps: "all"
        });

    }

}
