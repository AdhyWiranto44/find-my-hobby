const sidebar = document.querySelector('#sidebar');
const companyName = document.querySelector(".company-name");
const navbar = document.querySelector('#navbar');

const toggleSidebar = () => {
    sidebar.classList.toggle('sidebarMinimized');
    sidebar.classList.toggle('sidebarHidden'); // if width <= 768px
    companyName.classList.toggle('d-none');
    navbar.classList.toggle('marginLeft');
    navbar.classList.toggle('marginLeftMinimized');
}