const navbar = document.querySelector('.navbar');

window.onscroll = windowScroll;

function windowScroll(e) {
    let offset = window.pageYOffset;
    let defaultNavbar = "navbar navbar-expand-lg navbar-dark fixed-top";
    
    if (offset > 149) {
        navbar.className = defaultNavbar + " bg-dark shadow";
    } else {
        navbar.className = defaultNavbar;
    }
}

function openNavMenu(x) {
    x.classList.toggle("change");
}

$(".nav-link").on("click", function (e) {
    let href = $(this).attr("href");
    let hrefElement = $(href);

    $("html, body").animate(
        {
            scrollTop: hrefElement.offset().top - 130,
        },
        1250,
        "easeInOutExpo"
    );

    e.preventDefault();
});