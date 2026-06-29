const trainingGalleryImages = [
    "assets/IMAGES_PDF_PPT_EXCEL/TRAININGS PAGE/DISTRICT/SLIDER_SHOW_DISTRICT_PHOTOS/slide_4_image_10.webp",
    "assets/IMAGES_PDF_PPT_EXCEL/TRAININGS PAGE/DISTRICT/SLIDER_SHOW_DISTRICT_PHOTOS/slide_4_image_11.webp",
    "assets/IMAGES_PDF_PPT_EXCEL/TRAININGS PAGE/DISTRICT/SLIDER_SHOW_DISTRICT_PHOTOS/slide_4_image_12.webp",
    "assets/IMAGES_PDF_PPT_EXCEL/TRAININGS PAGE/DISTRICT/SLIDER_SHOW_DISTRICT_PHOTOS/slide_4_image_13.webp",
    "assets/IMAGES_PDF_PPT_EXCEL/TRAININGS PAGE/DISTRICT/SLIDER_SHOW_DISTRICT_PHOTOS/slide_4_image_14.webp",
    "assets/IMAGES_PDF_PPT_EXCEL/TRAININGS PAGE/DISTRICT/SLIDER_SHOW_DISTRICT_PHOTOS/slide_4_image_15.webp",
    "assets/IMAGES_PDF_PPT_EXCEL/TRAININGS PAGE/DISTRICT/SLIDER_SHOW_DISTRICT_PHOTOS/slide_4_image_16.webp",
    "assets/IMAGES_PDF_PPT_EXCEL/TRAININGS PAGE/DISTRICT/SLIDER_SHOW_DISTRICT_PHOTOS/slide_4_image_17.webp",
    "assets/IMAGES_PDF_PPT_EXCEL/TRAININGS PAGE/DISTRICT/SLIDER_SHOW_DISTRICT_PHOTOS/slide_4_image_2.webp",
    "assets/IMAGES_PDF_PPT_EXCEL/TRAININGS PAGE/DISTRICT/SLIDER_SHOW_DISTRICT_PHOTOS/slide_4_image_3.webp",
    "assets/IMAGES_PDF_PPT_EXCEL/TRAININGS PAGE/DISTRICT/SLIDER_SHOW_DISTRICT_PHOTOS/slide_4_image_4.webp",
    "assets/IMAGES_PDF_PPT_EXCEL/TRAININGS PAGE/DISTRICT/SLIDER_SHOW_DISTRICT_PHOTOS/slide_4_image_5.webp",
    "assets/IMAGES_PDF_PPT_EXCEL/TRAININGS PAGE/DISTRICT/SLIDER_SHOW_DISTRICT_PHOTOS/slide_4_image_6.webp",
    "assets/IMAGES_PDF_PPT_EXCEL/TRAININGS PAGE/DISTRICT/SLIDER_SHOW_DISTRICT_PHOTOS/slide_4_image_7.webp",
    "assets/IMAGES_PDF_PPT_EXCEL/TRAININGS PAGE/DISTRICT/SLIDER_SHOW_DISTRICT_PHOTOS/slide_4_image_8.webp",
    "assets/IMAGES_PDF_PPT_EXCEL/TRAININGS PAGE/DISTRICT/SLIDER_SHOW_DISTRICT_PHOTOS/slide_4_image_9.webp",
    "assets/IMAGES_PDF_PPT_EXCEL/TRAININGS PAGE/DISTRICT/SLIDER_SHOW_DISTRICT_PHOTOS/slide_8_image_1.webp",
    "assets/IMAGES_PDF_PPT_EXCEL/TRAININGS PAGE/DISTRICT/SLIDER_SHOW_DISTRICT_PHOTOS/slide_8_image_10.webp",
    "assets/IMAGES_PDF_PPT_EXCEL/TRAININGS PAGE/DISTRICT/SLIDER_SHOW_DISTRICT_PHOTOS/slide_8_image_11.webp",
    "assets/IMAGES_PDF_PPT_EXCEL/TRAININGS PAGE/DISTRICT/SLIDER_SHOW_DISTRICT_PHOTOS/slide_8_image_12.webp",
    "assets/IMAGES_PDF_PPT_EXCEL/TRAININGS PAGE/DISTRICT/SLIDER_SHOW_DISTRICT_PHOTOS/slide_8_image_13.webp",
    "assets/IMAGES_PDF_PPT_EXCEL/TRAININGS PAGE/DISTRICT/SLIDER_SHOW_DISTRICT_PHOTOS/slide_8_image_14.webp",
    "assets/IMAGES_PDF_PPT_EXCEL/TRAININGS PAGE/DISTRICT/SLIDER_SHOW_DISTRICT_PHOTOS/slide_8_image_15.webp",
    "assets/IMAGES_PDF_PPT_EXCEL/TRAININGS PAGE/DISTRICT/SLIDER_SHOW_DISTRICT_PHOTOS/slide_8_image_3.webp",
    "assets/IMAGES_PDF_PPT_EXCEL/TRAININGS PAGE/DISTRICT/SLIDER_SHOW_DISTRICT_PHOTOS/slide_8_image_4.webp",
    "assets/IMAGES_PDF_PPT_EXCEL/TRAININGS PAGE/DISTRICT/SLIDER_SHOW_DISTRICT_PHOTOS/slide_8_image_5.webp",
    "assets/IMAGES_PDF_PPT_EXCEL/TRAININGS PAGE/DISTRICT/SLIDER_SHOW_DISTRICT_PHOTOS/slide_8_image_6.webp",
    "assets/IMAGES_PDF_PPT_EXCEL/TRAININGS PAGE/DISTRICT/SLIDER_SHOW_DISTRICT_PHOTOS/slide_8_image_7.webp",
    "assets/IMAGES_PDF_PPT_EXCEL/TRAININGS PAGE/DISTRICT/SLIDER_SHOW_DISTRICT_PHOTOS/slide_8_image_8.webp",
    "assets/IMAGES_PDF_PPT_EXCEL/TRAININGS PAGE/DISTRICT/SLIDER_SHOW_DISTRICT_PHOTOS/slide_8_image_9.webp"
];

document.addEventListener("DOMContentLoaded", async () => {

    renderTrainingGallery();
    initializeTrainingCarousel();
    await initializeDistrictTrainingExplorer();

});

function renderTrainingGallery() {

    const track = document.getElementById("trainingGalleryTrack");

    if (!track) {
        return;
    }

    track.innerHTML = trainingGalleryImages.map((imagePath, index) => `
        <article class="gallery-slide">
            <img src="${imagePath}" alt="District hospital training photograph ${index + 1}">
        </article>
    `).join("");

}

function initializeTrainingCarousel() {

    const carousel = document.querySelector("[data-training-carousel]");

    if (!carousel) {
        return;
    }

    const track = carousel.querySelector(".gallery-carousel-track");
    const slides = Array.from(carousel.querySelectorAll(".gallery-slide"));
    const controls = Array.from(carousel.querySelectorAll(".gallery-nav"));

    if (!track || slides.length === 0 || controls.length === 0) {
        return;
    }

    let visibleSlides = window.innerWidth <= 767 ? 1 : 2;
    let currentIndex = 0;
    let autoSlideTimer = null;

    function getMaxIndex() {
        return Math.max(0, slides.length - visibleSlides);
    }

    function updateCarousel() {
        const translateUnit = 100 / visibleSlides;
        track.style.transform = `translateX(-${currentIndex * translateUnit}%)`;
    }

    function moveCarousel(direction) {
        const maxIndex = getMaxIndex();

        if (direction > 0) {
            currentIndex = currentIndex >= maxIndex ? 0 : Math.min(currentIndex + visibleSlides, maxIndex);
        } else {
            currentIndex = currentIndex <= 0 ? maxIndex : Math.max(currentIndex - visibleSlides, 0);
        }

        updateCarousel();
    }

    function startAutoSlide() {
        stopAutoSlide();
        autoSlideTimer = window.setInterval(() => moveCarousel(1), 3500);
    }

    function stopAutoSlide() {
        if (autoSlideTimer) {
            window.clearInterval(autoSlideTimer);
            autoSlideTimer = null;
        }
    }

    controls.forEach((button) => {
        button.addEventListener("click", () => {
            stopAutoSlide();
            moveCarousel(Number(button.dataset.direction));
            startAutoSlide();
        });
    });

    window.addEventListener("resize", () => {
        const nextVisibleSlides = window.innerWidth <= 767 ? 1 : 2;

        if (nextVisibleSlides === visibleSlides) {
            return;
        }

        visibleSlides = nextVisibleSlides;
        currentIndex = 0;
        updateCarousel();
    });

    carousel.addEventListener("mouseenter", stopAutoSlide);
    carousel.addEventListener("mouseleave", startAutoSlide);

    updateCarousel();
    startAutoSlide();

}

async function initializeDistrictTrainingExplorer() {

    const select = document.getElementById("districtTrainingFilter");
    const details = document.getElementById("districtTrainingDetails");

    if (!select || !details) {
        return;
    }

    try {
        const response = await fetch("assets/data/district-trainings.json");
        const payload = await response.json();
        const districts = payload.districts || [];

        if (districts.length === 0) {
            details.innerHTML = `<p>No district training data is available right now.</p>`;
            return;
        }

        select.innerHTML = districts.map((district) => `
            <option value="${district.slug}">${district.name}</option>
        `).join("");

        let currentDistrictIndex = 0;
        let autoRotateId = null;

        function renderDistrict(slug) {
            const districtIndex = districts.findIndex((item) => item.slug === slug);
            const district = districtIndex >= 0 ? districts[districtIndex] : districts[0];

            if (!district) {
                details.innerHTML = "";
                return;
            }

            currentDistrictIndex = districtIndex >= 0 ? districtIndex : 0;
            select.value = district.slug;

            const participantRows = district.participants.map((participant, index) => `
                <tr>
                    ${index === 0 ? `<td rowspan="${district.participants.length}">${district.name}</td>` : ""}
                    <td>${participant.name}</td>
                    <td>${participant.designation}</td>
                </tr>
            `).join("");

            details.innerHTML = `
                <article class="district-detail-card">
                    <div class="district-photo-panel">
                        <div class="district-photo-meta">
                            <h4>${district.name}</h4>
                        </div>
                        <img src="${encodeURI(district.photo)}" alt="${district.name} district hospital training group photo">
                    </div>
                    <div class="district-table-panel">
                        <h4>${district.name} Participants</h4>
                        <div class="district-participants-wrapper">
                            <table class="district-participants-table">
                                <thead>
                                    <tr>
                                        <th>District</th>
                                        <th>Name</th>
                                        <th>Designation</th>
                                    </tr>
                                </thead>
                                <tbody>${participantRows}</tbody>
                            </table>
                        </div>
                    </div>
                </article>
            `;
        }

        function showNextDistrict() {
            currentDistrictIndex = (currentDistrictIndex + 1) % districts.length;
            renderDistrict(districts[currentDistrictIndex].slug);
        }

        function stopAutoRotate() {
            if (autoRotateId) {
                window.clearInterval(autoRotateId);
                autoRotateId = null;
            }
        }

        function startAutoRotate() {
            stopAutoRotate();
            autoRotateId = window.setInterval(showNextDistrict, 4000);
        }

        select.addEventListener("change", (event) => {
            renderDistrict(event.target.value);
            startAutoRotate();
        });

        renderDistrict(districts[0].slug);
        startAutoRotate();

    } catch (error) {
        console.error("Failed to load district training data", error);
        details.innerHTML = `<p>District training data could not be loaded.</p>`;
    }

}
