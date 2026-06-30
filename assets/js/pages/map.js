// =====================================
// MAP INITIALIZATION
// =====================================

const map = L.map("map").setView([20.3, 85.8], 7);

// =====================================
// TILE LAYER
// =====================================

L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution: "© OpenStreetMap Contributors"
    }
).addTo(map);

// =====================================
// UPDATE SIDE PANEL
// =====================================

const t = (key, replacements = {}) => {
    if (window.i18n) return window.i18n.t(key, replacements);

    return Object.entries(replacements).reduce(
        (value, [name, replacement]) => value.replaceAll(`{{${name}}}`, replacement),
        key
    );
};

function updatePanel(districtName) {

    const panel = document.getElementById("infoPanel");

    const data = districtData[districtName];

    if (!data) {

        panel.innerHTML = `
            <h2>${t(districtName)}</h2>
            <hr>

            <p><strong>${t("Population:")}</strong> ${t("Not Available")}</p>
            <p><strong>${t("Cancer Cases:")}</strong> ${t("Not Available")}</p>
            <p><strong>${t("Last Updated:")}</strong> ${t("Not Available")}</p>
        `;

        return;
    }

    const populationValue = Number(data.population.replace(/,/g, ""));
    const cancerCasesValue = Number(data.cancerCases.replace(/,/g, ""));

    panel.innerHTML = `
        <h2>${t(districtName)}</h2>
        <hr>

        <p>
            <strong>${t("Population:")}</strong>
            <span data-count-to="${populationValue}" data-count-format="locale">${data.population}</span>
        </p>

        <p>
            <strong>${t("Cancer Cases:")}</strong>
            <span data-count-to="${cancerCasesValue}" data-count-format="locale">${data.cancerCases}</span>
        </p>

        <p>
            <strong>${t("Last Updated:")}</strong>
            ${data.updated}
        </p>
    `;

    window.initializeCountUp?.(panel);
}

let selectedDistrict = "Khordha";

const renderSelectedDistrict = (districtName) => {
    selectedDistrict = districtName;
    updatePanel(districtName);
};

document.addEventListener("languagechange", () => renderSelectedDistrict(selectedDistrict));

// =====================================
// DEFAULT DISTRICT
// =====================================

window.addEventListener("load", () => {
    renderSelectedDistrict("Khordha");
});

// =====================================
// LOAD GEOJSON
// =====================================

fetch("assets/data/Orissa.geojson")

.then(response => response.json())

.then(data => {

    const geoLayer = L.geoJSON(data, {

        style: {
            color: "#ffffff",
            weight: 1,
            fillColor: "#1E7FB8",
            fillOpacity: 0.75
        },

        onEachFeature: function(feature, layer) {

            const districtName =
                feature.properties.Dist_Name;

            layer.bindTooltip(
                districtName,
                {
                    sticky: true,
                    direction: "top",
                    className: "district-label"
                }
            );

            layer.on({

                mouseover: function(e) {

                    e.target.setStyle({
                        fillColor: "#930140",
                        fillOpacity: 0.95,
                        weight: 2,
                        color: "#000"
                    });

                    renderSelectedDistrict(districtName);
                },

                mouseout: function(e) {

                    geoLayer.resetStyle(
                        e.target
                    );
                },

                click: function() {

                    renderSelectedDistrict(districtName);
                }

            });
        }

    }).addTo(map);

    map.fitBounds(
        geoLayer.getBounds()
    );

})

.catch(error => {

    console.error(
        "GeoJSON Error:",
        error
    );

});
