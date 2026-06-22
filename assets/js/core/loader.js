async function loadComponent(id, file) {

    const response = await fetch(file);

    const html = await response.text();

    document.getElementById(id).innerHTML = html;
}

document.addEventListener("DOMContentLoaded", () => {

    loadComponent(
        "navbar-container",
        "components/navbar.html"
    );

    loadComponent(
        "footer-container",
        "components/footer.html"
    );

});