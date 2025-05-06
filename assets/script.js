function darkModeFunc() {
    const darkAccentSelectors = ["p", "div:not(.divHeader):not(.statisticDiv):not(.statisticDivWide)"]; // Add class selectors here
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

// if localStorage darkModeEnabled flag is true, apply darkmode on load
window.onload = () => {
    const darkModeCheckbox = document.getElementById("darkMode");
    const darkModeEnabled = localStorage.getItem("darkModeEnabled") === "true";

    // checkbox state carries over dependant on localStorage
    darkModeCheckbox.checked = darkModeEnabled;

    if (darkModeEnabled) {
        darkModeFunc(); // Apply dark mode
    }
};

// listen for checkbox toggle
const darkMode = document.getElementById("darkMode");
darkMode.onclick = darkModeFunc;

(function () {
    let intervalId = null;
    function toggleHeadacheMode() {
        if (intervalId) {
            clearInterval(intervalId); // Stop headache mode
            intervalId = null;
            return;
        }

        intervalId = setInterval(() => {
            darkModeFunc(); // Toggle between light and dark mode
        }, 10); // Interval in milliseconds
    }

    // Listen for the "h", "a" & "m" key combination
    let keysPressed = {};
    document.addEventListener("keydown", (event) => {
        keysPressed[event.key] = true;

        // Check if "h", "a" & "m" keys are pressed
        if (keysPressed["h"] && keysPressed["a"] && keysPressed["m"]) {
            toggleHeadacheMode();
        }
    });

    document.addEventListener("keyup", (event) => {
        delete keysPressed[event.key]; // Remove the key from the pressed keys list
    });
})();