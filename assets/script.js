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



//Funnies:
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
            if (document.getElementById("darkMode").checked == true){
                document.getElementById("darkMode").checked = false;
            }else{
                document.getElementById("darkMode").checked = true;
            }
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