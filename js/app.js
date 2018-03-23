// Set focus on the first text field
document.getElementById("name").focus();

// ”Job Role” section of the form

// Create Other Job Role text input
let otherTitle = document.createElement('input');
otherTitle.id = "other-title";
otherTitle.type = "text";
otherTitle.placeholder="Your Job Role";
otherTitle.style.display = "none";

// Attach otherTitle input to the first fieldset
let fieldSetOne = document.getElementsByTagName('fieldset')[0];
fieldSetOne.appendChild(otherTitle);

// View otherTitle when Other is selected, otherwise hide it
let userTitle = document.getElementById("title");
userTitle.addEventListener("change", () => {
	if(userTitle.value.toLowerCase() == "other") {
		otherTitle.style.display = "block";
	} else {
		otherTitle.style.display = "none";
	}
});

// ”T-Shirt Info” section of the form

// Create color header option and select it
let colorHeader = document.createElement("option");
colorHeader.textContent = "<-- Please select a T-shirt theme";
let color = document.getElementById("color");
color.insertBefore(colorHeader, color.childNodes[0]);
color.selectedIndex = 0;

// Provide color options
let colors = color.getElementsByTagName("option");
let design = document.getElementById("design");
design.addEventListener("change", () => {
	// Disable all colors
	for(let index = 0; index < color.length; index++) {
		colors[index].style.display = "none";
	}
	if(design.value == "js puns") {
		colors[1].style.display = "block";
		colors[2].style.display = "block";
		colors[3].style.display = "block";
		color.selectedIndex = 1;
	} else if(design.value == "heart js") {
		colors[4].style.display = "block";
		colors[5].style.display = "block";
		colors[6].style.display = "block";
		color.selectedIndex = 4;
	} else {
		color.selectedIndex = 0;
		// Enable all colors
		for(let index = 0; index < color.length; index++) {
			colors[index].style.display = "block";
		}
	}
});
