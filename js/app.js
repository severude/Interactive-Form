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

// Create a color header option and then select it
let colorHeader = document.createElement("option");
colorHeader.textContent = "<-- Please select a T-shirt theme";
let color = document.getElementById("color");
color.insertBefore(colorHeader, color.childNodes[0]);
color.selectedIndex = 0;

// Disable all colors
let colors = color.getElementsByTagName("option");
function disableColors() {
	for(let index = 0; index < color.length; index++) {
		colors[index].style.display = "none";
	}
}
disableColors();

// Show color options based on which design is selected
let design = document.getElementById("design");
design.addEventListener("change", () => {
	disableColors();
	if(design.value == "js puns") {
		color.selectedIndex = 1;
		colors[1].style.display = "block";
		colors[2].style.display = "block";
		colors[3].style.display = "block";
	} else if(design.value == "heart js") {
		color.selectedIndex = 4;
		colors[4].style.display = "block";
		colors[5].style.display = "block";
		colors[6].style.display = "block";
	} else {
		color.selectedIndex = 0;
	}
});

// ”Register for Activities” section of the form

// Create a totals element to track cost of activities
let totals = document.createElement("h3");
totals.textContent = "Total: ";
totals.style.display = "none";
let activities = document.querySelector('.activities');
activities.appendChild(totals);

// Create an checkboxes array, loop through all the elements, and copy over each checkbox
let nodes = activities.children;
let checkboxes = [];
for(let index = 0; index < nodes.length; index++) {
	let element = nodes[index].childNodes[0]; // checkbox is element 0
	if(element.type == "checkbox") {
		checkboxes.push(element);
	}
}

// Helper function to enable or disable checkboxes
// If the first checkbox index is checked, then disable the second checkbox
function disableCheckBox(value1, value2) {
	if(checkboxes[value1].checked) {
		checkboxes[value2].disabled = true;
	} else {
		checkboxes[value2].disabled = false;
	}
}

// Whenever a change occurs in activities, then check all the input statuses
activities.addEventListener("change", event => {

	// Check for and disable any activities that overlap
	disableCheckBox(1, 3);
	disableCheckBox(3, 1);
	disableCheckBox(2, 4);
	disableCheckBox(4, 2);

	// Loop through inputs array to calculate the total cost of activities
	let total = 0;  // Storage for total amount
	for(let index = 0; index < checkboxes.length; index++) {

		if(checkboxes[index].checked) {
			if(index == 0) {
				total += 200;  // First activity is 200
			} else {
				total += 100;  // Other activities are 100
			}
		}
	}
	
	// Show total amount if not zero, otherwise hide the total
	if(total > 0) {
		totals.textContent = "Total: $" + total;
		totals.style.display = "block";
	} else {
		totals.style.display = "none";
	}
});


// Payment Info section of the form
