// Check for saved dark mode preference on load
const themeSwitch = document.getElementById('theme-switch');
let darkmode = localStorage.getItem('darkmode') === 'active';

// Get both SVG icons
const moonIcon = themeSwitch.querySelector('svg:first-child'); // Moon icon
const sunIcon = themeSwitch.querySelector('svg:last-child'); // Sun icon

// Set initial icon and theme
const updateIcons = () => {
    if (darkmode) {
        // Dark mode active - show moon icon
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
        document.body.classList.add("darkmode");
    } else {
        // Light mode active - show sun icon
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
        document.body.classList.remove("darkmode");
    }
};

// Initialize
updateIcons();

const enableDarkmode = () => {
    localStorage.setItem('darkmode', 'active');
    darkmode = true;
    updateIcons();
};

const disableDarkmode = () => {
    localStorage.setItem('darkmode', null);
    darkmode = false;
    updateIcons();
};

themeSwitch.addEventListener("click", () => {
    darkmode ? disableDarkmode() : enableDarkmode();
});