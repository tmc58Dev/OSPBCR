const districtData = [

    {district:"Angul",target:1275000,submitted:1120,pending:52,completion:88},
    {district:"Balangir",target:1450000,submitted:1050,pending:61,completion:82},
    {district:"Baleswar",target:2380000,submitted:1400,pending:90,completion:92},
    {district:"Bargarh",target:1600000,submitted:990,pending:70,completion:76},
    {district:"Bhadrak",target:1800000,submitted:1320,pending:40,completion:94},
    {district:"Boudh",target:500000,submitted:400,pending:25,completion:68},
    {district:"Cuttack",target:2800000,submitted:1900,pending:120,completion:96},
    {district:"Deogarh",target:350000,submitted:280,pending:12,completion:74},
    {district:"Dhenkanal",target:1200000,submitted:940,pending:30,completion:80},
    {district:"Gajapati",target:600000,submitted:510,pending:15,completion:79},

    {district:"Ganjam",target:3500000,submitted:2100,pending:180,completion:91},
    {district:"Jagatsinghpur",target:1100000,submitted:870,pending:30,completion:83},
    {district:"Jajpur",target:1900000,submitted:1360,pending:45,completion:87},
    {district:"Jharsuguda",target:700000,submitted:580,pending:16,completion:84},
    {district:"Kalahandi",target:1600000,submitted:990,pending:55,completion:78},
    {district:"Kandhamal",target:750000,submitted:510,pending:18,completion:72},
    {district:"Kendrapara",target:1450000,submitted:1080,pending:28,completion:86},
    {district:"Kendujhar",target:1850000,submitted:1260,pending:49,completion:81},
    {district:"Khordha",target:2600000,submitted:2100,pending:110,completion:98},
    {district:"Koraput",target:1400000,submitted:900,pending:44,completion:73},

    {district:"Malkangiri",target:650000,submitted:450,pending:22,completion:67},
    {district:"Mayurbhanj",target:2600000,submitted:1820,pending:72,completion:90},
    {district:"Nabarangpur",target:1250000,submitted:820,pending:37,completion:71},
    {district:"Nayagarh",target:1100000,submitted:760,pending:19,completion:77},
    {district:"Nuapada",target:700000,submitted:500,pending:18,completion:69},
    {district:"Puri",target:1800000,submitted:1420,pending:53,completion:93},
    {district:"Rayagada",target:1100000,submitted:720,pending:25,completion:70},
    {district:"Sambalpur",target:1100000,submitted:920,pending:31,completion:85},
    {district:"Subarnapur",target:700000,submitted:550,pending:17,completion:80},
    {district:"Sundargarh",target:2200000,submitted:1750,pending:65,completion:89}

];

const tableBody =
document.getElementById("statusTableBody");

const pageInfo =
document.getElementById("pageInfo");

let currentPage = 1;

const rowsPerPage = 10;

let filteredData = [...districtData];

function renderTable() {

    tableBody.innerHTML = "";

    const start =
    (currentPage - 1) * rowsPerPage;

    const end =
    start + rowsPerPage;

    const pageData =
    filteredData.slice(start, end);

    pageData.forEach(item => {

        tableBody.innerHTML += `

        <tr>

            <td>${item.district}</td>

            <td>${item.target.toLocaleString(window.i18n?.getLanguage() || "en")}</td>

            <td>${item.submitted}</td>

            <td>${item.pending}</td>

            <td>

                <div class="progress-container">

                    <div
                        class="progress-bar"
                        style="width:${item.completion}%"
                    ></div>

                    <div class="progress-text">
                        ${item.completion}%
                    </div>

                </div>

            </td>

        </tr>

        `;

    });

    pageInfo.textContent = window.i18n
        ? window.i18n.t("Page {{page}}", { page: currentPage })
        : `Page ${currentPage}`;

}

renderTable();

document.addEventListener("languagechange", renderTable);

document
.getElementById("searchDistrict")
.addEventListener("input", function(){

    const value =
    this.value.toLowerCase();

    filteredData =
    districtData.filter(item =>
        item.district
        .toLowerCase()
        .includes(value) ||
        (window.i18n?.t(item.district) || item.district)
        .toLowerCase()
        .includes(value)
    );

    currentPage = 1;

    renderTable();

});

document
.getElementById("sortStatus")
.addEventListener("change", function(){

    if(this.value === "completion"){

        filteredData.sort(
            (a,b)=>
            b.completion-a.completion
        );

    }else{

        filteredData.sort(
            (a,b)=>
            a.district.localeCompare(b.district)
        );

    }

    renderTable();

});

document
.getElementById("nextBtn")
.addEventListener("click", ()=>{

    if(
        currentPage <
        Math.ceil(
            filteredData.length/rowsPerPage
        )
    ){

        currentPage++;

        renderTable();

    }

});

document
.getElementById("prevBtn")
.addEventListener("click", ()=>{

    if(currentPage > 1){

        currentPage--;

        renderTable();

    }

});
