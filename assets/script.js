function darkModeFunc() {
    const isDarkMode = document.documentElement.classList.toggle("dark");

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
        document.documentElement.classList.add("dark"); // Apply dark mode
    }
};

// listen for checkbox toggle
const darkMode = document.getElementById("darkMode");
darkMode.onclick = darkModeFunc;

//unrelated
(function () {
    let intervalId = null;
    function toggleHeadacheMode() {
        if (intervalId) {
            clearInterval(intervalId); // Stop this mode
            intervalId = null;
            return;
        }

        intervalId = setInterval(() => {
            darkModeFunc(); // Toggle between light and dark mode
            if (document.getElementById("darkMode").checked == true){
                document.getElementById("darkMode").checked = false;
            }else{
                document.getElementById("darkMode").checked = true;
            }
        }, 10); // Interval in milliseconds
    }

    // Listen for key combination
    let keysPressed = {};
    document.addEventListener("keydown", (event) => {
        keysPressed[event.key] = true;

        // Check if keys are pressed
        if (keysPressed["h"] && keysPressed["a"] && keysPressed["m"]) {
            toggleHeadacheMode();
        }
    });

    document.addEventListener("keyup", (event) => {
        delete keysPressed[event.key]; // Remove the key from the pressed keys list
    });
})();

// Function to mark an aspect as complete
function markAspectComplete(aspectName) {
    // Get the completed aspects from localStorage or initialize an empty array
    const completedAspects = JSON.parse(localStorage.getItem("completedAspects")) || [];

    // Add the aspect to the completed list if not already present
    if (!completedAspects.includes(aspectName)) {
        completedAspects.push(aspectName);
        localStorage.setItem("completedAspects", JSON.stringify(completedAspects));
    }
}

// Function to update the aspects page with completion icons
function updateAspectsPage() {
    const completedAspects = JSON.parse(localStorage.getItem("completedAspects")) || [];

    completedAspects.forEach(aspectName => {
        // Select the icon container by its ID
        const iconContainer = document.getElementById(`${aspectName}IconContainer`);
        if (iconContainer) {
            // Check if the icon already exists to avoid duplicates
            if (!iconContainer.querySelector(`img[alt="${aspectName} complete"]`)) {
                const checkIcon = document.createElement("img");
                checkIcon.src = "./assets/images/icons/aspectCompleteIcon.png";
                checkIcon.alt = `${aspectName} complete`;
                checkIcon.classList.add("icon", "no-invert"); // Add the no-invert class

                // Insert the new icon as the first child of the iconContainer
                iconContainer.insertBefore(checkIcon, iconContainer.firstChild);
            }
        }
    });
}

// Run the update function on the aspects page
if (window.location.pathname.includes("aspects.html")) {
    updateAspectsPage();
}

// Add event listeners for completion buttons on individual aspect pages
const aspectButtons = ["passwords", "connections", "phishing", "backups", "socmedia"];
aspectButtons.forEach(aspect => {
    const button = document.getElementById(`${aspect}Complete`);
    if (button) {
        button.addEventListener("click", () => {
            markAspectComplete(aspect);
        });
    }
});