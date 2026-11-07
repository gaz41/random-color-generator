// Function to generate random RGB color values
function getRandomColor() {
  const r = Math.floor(Math.random() * 256); // Random red value
  const g = Math.floor(Math.random() * 256); // Random green value
  const b = Math.floor(Math.random() * 256); // Random blue value
  return { r, g, b }; // Return an object containing RGB values
}

// Function to convert a single RGB component to HEX format
const componentToHex = (c) => {
  const hex = c.toString(16); // Convert component to hexadecimal
  return hex.length == 1 ? "0" + hex : hex; // Pad with zero if necessary to ensure two-dogit HEX
};

// *****
// ALTERNATIVE USING LEFT SHIFT OPERATOR
// function rgbToHex(r, g, b) {
//   return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
// } // *****

// Function to convert RGB values to HEX format
const rgbToHex = (r, g, b) => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b); // Concatenate HEX values
};

// Function to convert RGB values to HSL format
function rgbToHsl(r, g, b) {
  // Normalize RGB values to the range [0, 1]
  ((r /= 255), (g /= 255), (b /= 255));
  const max = Math.max(r, g, b), // Find the maximum value
    min = Math.min(r, g, b); // Find the minimum value
  let h,
    s,
    l = (max + min) / 2; // Calculate lightness

  if (max === min) {
    h = s = 0; // Achromatic case
  } else {
    const d = max - min; // Difference between max and min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min); // Calculate saturation
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0); // Calculate hue for red
        break;
      case g:
        h = (b - r) / d + 2; // Calculate hue for green
        break;
      case b:
        h = (r - g) / d + 4; // Calculate hue for blue
        break;
    }
    h /= 6; // Normalize hue to [0, 1]
  }
  return {
    h: Math.round(h * 360), // Convert hue to degrees
    s: Math.round(s * 100), // Convert saturation to percentage
    l: Math.round(l * 100), // Convert lightness to percentage
  };
}

// Event listener for button click to generate and display color
document.getElementById("generateColorBtn").addEventListener("click", () => {
  const { r, g, b } = getRandomColor(); // Get random RGB values
  const hex = rgbToHex(r, g, b).toUpperCase(); // Convert RGB to HEX
  const { h, s, l } = rgbToHsl(r, g, b); // Convert RGB to HSL

  // Update the background color and display color information
  document.getElementById("colorDisplay").style.backgroundColor =
    `rgb(${r}, ${g}, ${b})`;

  document.getElementById("colorInfo").innerHTML = `
  <div class="colors">
    <p><span class="color-format">HEX</span>: ${hex}<span class="colorBox" style="background-color: ${hex};"></span></p> 
    <p><span class="color-format">RGB</span>: (${r}, ${g}, ${b})<span class="colorBox" style="background-color: rgb(${r}, ${g}, ${b});"></span></p>
    <p><span class="color-format">HSL</span>: (${h}, ${s}%, ${l}%)<span class="colorBox" style="background-color: hsl(${h}, ${s}%, ${l}%);"></span></p>
  </div>`;
});

// SLIDING MENU **********************************
// Add a click event listener to the toggle button
document.getElementById("menuToggle").addEventListener("click", function () {
  // Get the sliding menu and the toggle icon
  const menu = document.getElementById("slidingMenu");
  const toggleIcon = this;

  // Toggle the 'active' class on the menu
  menu.classList.toggle("active");

  // Check if the menu is currently active
  const isActive = menu.classList.contains("active");

  // Define styles based on the active state of the menu
  const iconStyles = {
    icon: isActive ? "&#10006;" : "&#9776;", // Change icon based on state
    color: isActive ? "#eeeeee" : "#111111", // Change text color
    backgroundColor: isActive ? "#333333" : "#8ebea3", // Change background color
    position: isActive ? "fixed" : "absolute", // Change position
    defaultColor: isActive ? "#333333" : "#8ebea3", // Default background color
    hoverColor: isActive ? "#444444" : "#60976b ", // Change hover background color
  };

  // Apply the defined styles to the toggle icon
  toggleIcon.innerHTML = iconStyles.icon; // Update icon
  toggleIcon.style.color = iconStyles.color; // Update text color
  toggleIcon.style.backgroundColor = iconStyles.backgroundColor; // Update background color
  toggleIcon.style.position = iconStyles.position; // Update position
  toggleIcon.style.transition = "background-color 0.3s"; // Smooth transition

  // Add event listener for mouseover to change background color
  toggleIcon.addEventListener("mouseover", function () {
    this.style.backgroundColor = iconStyles.hoverColor; // Change to hover background color
  });

  // Add event listener for mouseout to revert background color
  toggleIcon.addEventListener("mouseout", function () {
    this.style.backgroundColor = iconStyles.defaultColor; // Revert to default background color
  });
});

// Select all accordion buttons
const acc = document.querySelectorAll(".accordion");

acc.forEach((button) => {
  button.addEventListener("click", function () {
    this.classList.toggle("accordionActive"); // Toggle active class
    const panel = this.nextElementSibling; // Get the associated panel
    // Toggle the max height of the panel for expansion/collapse
    panel.style.maxHeight = panel.style.maxHeight
      ? null
      : `${panel.scrollHeight}px`;
  });
});

// COPYRIGHT NOTICE
// Dynamically generate copyright information
const copyright = document.getElementById("copy");
copyright.innerHTML =
  "Copyright &copy; " + // Start of the copyright string
  new Date().getFullYear() + // Get the current year
  ` <a href="https://www.gaz41.com">gaz41.com</a>. <span class="copy2">All Rights Reserved</span>`;
