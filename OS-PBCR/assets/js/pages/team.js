const teamMembers = [

    {
        name:"Dr Atul Budukh",
        designation:"Officer Incharge,Professor Epidemiology",
        department:"Medical Records & Cancer Registry, OS-PBCR Project",
        image:"assets/images/team/ATUL SIR.png"
    },

    {
        name:"Mrs.Sushama Saoba",
        designation:"Scientific Officer E",
        department:"Medical Records & Cancer Registry, OS-PBCR Project",
        image:"assets/images/team/SUSHMA MADAM.png"
    },

    {
        name:"Mrs.Deepali Lokhande",
        designation:"Scientific Officer D",
        department:"Medical Records & Cancer Registry, OS-PBCR Project",
        image:"assets/images/team/deepali madam.png"
    },

    {
        name:"Er. Pratik Sawant",
        designation:"Programmer",
        department:"Medical Records & Cancer Registry, OS-PBCR Project",
        image:"assets/images/team/PRATIK SIR.png"
    },

    // {
    //     name:"Mr. A. Das",
    //     designation:"Data Manager",
    //     department:"Medical Records & Cancer Registry, OS-PBCR Project",
    //     image:"assets/images/team/member5.jpg"
    // },

    // {
    //     name:"Dr. N. Pattnaik",
    //     designation:"Statistician",
    //     department:"Data Analytics",
    //     image:"assets/images/team/member6.jpg"
    // },

    // {
    //     name:"Dr. B. Nayak",
    //     designation:"Field Coordinator",
    //     department:"District Coordination",
    //     image:"assets/images/team/member7.jpg"
    // },

    // {
    //     name:"Ms. K. Behera",
    //     designation:"Research Associate",
    //     department:"Registry Support",
    //     image:"assets/images/team/member8.jpg"
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