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

function updatePanel(districtName) {

    const panel = document.getElementById("infoPanel");

    const data = districtData[districtName];

    if (!data) {

        panel.innerHTML = `
            <h2>${districtName}</h2>
            <hr>

            <p><strong>Population:</strong> Not Available</p>
            <p><strong>Cancer Cases:</strong> Not Available</p>
            <p><strong>Last Updated:</strong> Not Available</p>
        `;

        return;
    }

    panel.innerHTML = `
        <h2>${districtName}</h2>
        <hr>

        <p>
            <strong>Population:</strong>
            ${data.population}
        </p>

        <p>
            <strong>Cancer Cases:</strong>
            ${data.cancerCases}
        </p>

        <p>
            <strong>Last Updated:</strong>
            ${data.updated}
        </p>
    `;
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
