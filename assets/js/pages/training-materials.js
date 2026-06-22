const districts = [

    "Angul",
    "Balangir",
    "Baleswar",
    "Bargarh",
    "Bhadrak",
    "Boudh",
    "Cuttack",
    "Deogarh",
    "Dhenkanal",
    "Gajapati",
    "Ganjam",
    "Jagatsinghpur",
    "Jajpur",
    "Jharsuguda",
    "Kalahandi",
    "Kandhamal",
    "Kendrapara",
    "Kendujhar",
    "Khordha",
    "Koraput",
    "Malkangiri",
    "Mayurbhanj",
    "Nabarangpur",
    "Nayagarh",
    "Nuapada",
    "Puri",
    "Rayagada",
    "Sambalpur",
    "Subarnapur",
    "Sundargarh"

];

const districtGrid =
document.getElementById("districtGrid");

function generateFolderName(name){

    return name
    .toLowerCase()
    .replace(/\s+/g,'-');

}

function renderDistricts(data){

    districtGrid.innerHTML = "";

    data.forEach(district => {

        const folder =
        generateFolderName(district);

        const pdfFileName =`Population Based Cancer Registry Odisha ${district}.pdf`;

        const pdfPath =`assets/pdf/${folder}/${pdfFileName}`;

        districtGrid.innerHTML += `

        <div class="district-card fade-up">

            <h3>${district}</h3>

            <p>
                Training Manual & Registry Documentation
            </p>

            <div class="button-group">

                <a
                    href="${pdfPath}"
                    target="_blank"
                    class="view-btn"
                >
                    View PDF
                </a>

                <a
                    href="${pdfPath}"
                    download
                    class="download-btn"
                >
                    Download PDF
                </a>

            </div>

        </div>

        `;

    });

}

renderDistricts(districts);

document
.getElementById("districtSearch")
.addEventListener("input", function(){

    const value =
    this.value.toLowerCase();

    const filtered =
    districts.filter(district =>
        district.toLowerCase().includes(value)
    );

    renderDistricts(filtered);

});