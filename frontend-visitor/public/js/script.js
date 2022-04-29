// const navbar = document.querySelector('.navbar');

// window.onscroll = windowScroll;

// function windowScroll(e) {
//     let offset = window.pageYOffset;
//     let defaultNavbar = "navbar navbar-expand-lg navbar-dark fixed-top";
    
//     if (offset > 149) {
//         navbar.className = defaultNavbar + " bg-dark shadow";
//     } else {
//         navbar.className = defaultNavbar;
//     }
// }

function openNavMenu(x) {
  x.classList.toggle("change");
}

// const navLink = document.querySelector(".nav-link");
// navLink.addEventListener("click", (e) => {
//   let href = e.target.getAttribute("href");
//   let hrefElement = document.querySelector(href);

//   $("html, body").animate(
//       {
//           scrollTop: hrefElement.offset().top - 130,
//       },
//       1250,
//       "easeInOutExpo"
//   );

//   e.preventDefault();
// });