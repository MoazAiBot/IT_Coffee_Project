// Check for saved dark mode preference on load
const themeSwitch = document.getElementById('theme-switch')
let darkmode = localStorage.getItem('darkmode') === 'active'

// Apply dark mode if it was enabled
if (darkmode) {
    document.body.classList.add("darkmode")
}

const enableDarkmode = () => {
    document.body.classList.add("darkmode")
    localStorage.setItem('darkmode', 'active')
    darkmode = true
}

const disableDarkmode = () => {
    document.body.classList.remove('darkmode')
    localStorage.setItem('darkmode', null)
    darkmode = false
}

themeSwitch.addEventListener("click", () => {
    darkmode ? disableDarkmode() : enableDarkmode()
})