function darkModeFunc() {
    const isDarkMode = document.documentElement.classList.toggle("dark");

    // Save the checkbox state to localStorage
    const darkModeCheckbox = document.getElementById("darkMode");
    localStorage.setItem("darkModeEnabled", darkModeCheckbox.checked);
}

// if localStorage darkModeEnabled flag is true, apply darkmode on load
window.onload = () => {
    const darkModeCheckbox = document.getElementById("darkMode"); //defines the checkbox to toggle dark mode
    const darkModeEnabled = localStorage.getItem("darkModeEnabled") === "true"; //checks in local storage true/false flag for if darkmode is enabled

    darkModeCheckbox.checked = darkModeEnabled;//checks which state the true/false flag in local storage is in

    if (darkModeEnabled) {
        document.documentElement.classList.add("dark"); // Apply dark mode class 
    }
};

// listen for checkbox toggle
const darkMode = document.getElementById("darkMode");
darkMode.onclick = darkModeFunc;

//dark mode test
(function () {
    let intervalId = null;
    function toggleHMode() {
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
        }, 1000); // Interval in milliseconds (1000 is default)
    }

    // Listen for key combination
    let keysPressed = {};
    document.addEventListener("keydown", (event) => {
        keysPressed[event.key] = true;

        // Check if keys are pressed
        if (keysPressed["h"] && keysPressed["a"] && keysPressed["m"]) {
            toggleHMode();
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
    const completedAspects = JSON.parse(localStorage.getItem("completedAspects")) || []; //parses (gets) a  list of completed aspects from JSON in local storage (if it exist)

    completedAspects.forEach(aspectName => { //repeats for each aspect name found in the completed aspects JSON list parsed above
        const iconContainer = document.getElementById(`${aspectName}IconContainer`); // Select the icon container by its ID (a commbination of its respective aspect name found in local storage and "IconContainer")
        if (iconContainer) { // Check if the icon already exists to avoid duplicates
            if (!iconContainer.querySelector(`img[alt="${aspectName} complete"]`)) { //Checks if the existing icon's ALT text is not the alt of the icon it's trying to insert and create the check icon
                const checkIcon = document.createElement("img"); //creates an <img> element and refers to it by the constant "checkIcon"
                checkIcon.src = "./assets/images/icons/aspectCompleteIcon.png"; //sets the source of checkIcon to the image of the check icon in the assets/images/icons folder
                checkIcon.alt = `${aspectName} complete`; //Creates a string that says "[aspect name] complete", for example: "passwords complete"
                checkIcon.classList.add("icon", "no-invert"); // Adds the icon and no-invert class to the check icon, which shouldn't invert colours in dark mode unlike the other black icons

                // Creates the "COMPLETE" label for the check icon
                const checkIconLabel = document.createElement("label"); //creates a label element under the constant "checkIconLabel"
                checkIconLabel.textContent = "COMPLETE"; // Sets the label text to "COMPLETE"
                checkIconLabel.classList.add("check-icon-label"); //Adds a class for styling

                // Inserts the icon and label into the container
                iconContainer.insertBefore(checkIcon, iconContainer.firstChild); // Adds the icon first (before the icon container's first child)
                iconContainer.insertBefore(checkIconLabel, checkIcon.nextSibling); // Adds the label after the icon (before the next sibling)
            }
        }
    });
}

// Run the update function on the aspects page
if (window.location.pathname.includes("aspects.html")) {//checks if the pathname of the current page contains "aspects.html" (the aspects page)
    updateAspectsPage();//runs the function which updates the aspects page's completion icons
}

// Add event listeners for completion buttons on individual aspect pages
const aspectButtons = ["passwords", "connections", "phishing", "backups", "socmedia"];//a list with names of the html pages
aspectButtons.forEach(aspect => {
    const button = document.getElementById(`${aspect}Complete`);//creates a string which is the ID of the completion buttons at the bottom of each aspect page
    if (button) {
        button.addEventListener("click", () => {//adds an event listener to check if the button is clicked onn any of the aspect pages
            markAspectComplete(aspect);//triggers the function which marks the aspects as complete in the aspects page for the specific aspect who's button was triggered
        });
    }
});