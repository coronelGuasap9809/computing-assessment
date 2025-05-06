function darkModeFunc() {
    const darkAccentSelectors = ["p:not(footer > p)", "div:not(.divHeader):not(.statisticDiv):not(.statisticDivWide)"]; // Add class selectors here
    const darkSelectors = ["body", ".statisticDiv", ".statisticDivWide", ".divHeader", ".goContainer", ".aspectsCard", ".iconContainer"]; // Add tag and class selectors here

    darkAccentSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.classList.toggle("darkAccent");
        });
    });

    darkSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.classList.toggle("dark");
        });
    });

    // Save the checkbox state to localStorage
    const darkModeCheckbox = document.getElementById("darkMode");
    localStorage.setItem("darkModeEnabled", darkModeCheckbox.checked);
}

// Apply dark mode on page load based on localStorage
window.onload = () => {
    const darkModeCheckbox = document.getElementById("darkMode");
    const darkModeEnabled = localStorage.getItem("darkModeEnabled") === "true";

    // Set the checkbox state
    darkModeCheckbox.checked = darkModeEnabled;

    if (darkModeEnabled) {
        darkModeFunc(); // Apply dark mode
    }
};

// Attach the event listener to the checkbox
const darkMode = document.getElementById("darkMode");
darkMode.onclick = darkModeFunc;