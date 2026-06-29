const teamMembers = [

    {
        name:"Dr Atul Budukh",
        designation:"Officer Incharge,Professor Epidemiology",
        department:"Medical Records & Cancer Registry, OS-PBCR Project",
        image:"assets/IMAGES_PDF_PPT_EXCEL/TEAM PAGE/ATUL SIR.png"
    },

    {
        name:"Mrs.Sushama Saoba",
        designation:"Scientific Officer E",
        department:"Medical Records & Cancer Registry, OS-PBCR Project",
        image:"assets/IMAGES_PDF_PPT_EXCEL/TEAM PAGE/SUSHMA MADAM.png"
    },

    {
        name:"Mrs.Deepali Lokhande",
        designation:"Scientific Officer D",
        department:"Medical Records & Cancer Registry, OS-PBCR Project",
        image:"assets/IMAGES_PDF_PPT_EXCEL/TEAM PAGE/deepali madam.png"
    },

    {
        name:"Er. Pratik Sawant",
        designation:"Programmer",
        department:"Medical Records & Cancer Registry, OS-PBCR Project",
        image:"assets/IMAGES_PDF_PPT_EXCEL/TEAM PAGE/PRATIK SIR.png"
    },

    // {
    //     name:"Mr. A. Das",
    //     designation:"Data Manager",
    //     department:"Medical Records & Cancer Registry, OS-PBCR Project",
    //     image:"assets/IMAGES_PDF_PPT_EXCEL/TEAM PAGE/member5.jpg"
    // },

    // {
    //     name:"Dr. N. Pattnaik",
    //     designation:"Statistician",
    //     department:"Data Analytics",
    //     image:"assets/IMAGES_PDF_PPT_EXCEL/TEAM PAGE/member6.jpg"
    // },

    // {
    //     name:"Dr. B. Nayak",
    //     designation:"Field Coordinator",
    //     department:"District Coordination",
    //     image:"assets/IMAGES_PDF_PPT_EXCEL/TEAM PAGE/member7.jpg"
    // },

    // {
    //     name:"Ms. K. Behera",
    //     designation:"Research Associate",
    //     department:"Registry Support",
    //     image:"assets/IMAGES_PDF_PPT_EXCEL/TEAM PAGE/member8.jpg"
    // }

];

const teamGrid =
document.getElementById("teamGrid");

function renderTeam(){

    teamGrid.innerHTML = "";

    teamMembers.forEach(member => {

        teamGrid.innerHTML += `

        <div class="team-card fade-up">

            <div class="team-image">

                <img
                    src="${member.image}"
                    alt="${member.name}"
                >

            </div>

            <div class="team-content">

                <h3 class="team-name">

                    ${member.name}

                </h3>

                <p class="team-designation">

                    ${member.designation}

                </p>

                <p class="team-department">

                    ${member.department}

                </p>

            </div>

        </div>

        `;

    });

}

renderTeam();

document.addEventListener("languagechange", renderTeam);
