// Dark mode toggle
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const icon = document.getElementById('themeIcon');

    if (document.body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
}

// Menu hambúrguer toggle
function toggleMenu() {
    const overlay = document.getElementById('menuOverlay');
    const drawer = document.getElementById('menuDrawer');

    overlay.classList.toggle('active');
    drawer.classList.toggle('active');

    if (drawer.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Toggle submenu in mobile drawer
function toggleSubmenu(event, submenuId) {
    event.preventDefault();
    event.stopPropagation();

    const submenu = document.getElementById(submenuId);
    const expandIcon = event.currentTarget.querySelector('.expand-icon');

    // Toggle submenu visibility
    submenu.classList.toggle('active');

    // Rotate icon
    if (submenu.classList.contains('active')) {
        expandIcon.style.transform = 'rotate(180deg)';
    } else {
        expandIcon.style.transform = 'rotate(0deg)';
    }
}

// Initialize dark mode on page load
document.addEventListener('DOMContentLoaded', function () {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        document.getElementById('themeIcon').classList.replace('fa-moon', 'fa-sun');
    }
});
