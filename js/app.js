// Set focus on the first text field
document.getElementById("name").focus();


// ”Job Role” section of the form

// Create Other Job Role text input
let otherTitle = document.createElement('input');
otherTitle.id = "other-title";
otherTitle.type = "text";
otherTitle.placeholder="Your Job Role";
otherTitle.style.display = "none";
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

// Create a checkboxes array, loop through all the elements, and copy over each checkbox
let nodes = activities.children;
let checkboxes = [];
for(let index = 0; index < nodes.length; index++) {
	let element = nodes[index].childNodes[0]; // checkbox is element 0
	if(element.type == "checkbox") {
		checkboxes.push(element);
	}
}

// If the first checkbox index is checked, then disable the second checkbox
function disableCheckBox(value1, value2) {
	if(checkboxes[value1].checked) {
		checkboxes[value2].disabled = true;
	} else {
		checkboxes[value2].disabled = false;
	}
}

// Whenever a change occurs in activities, then check all the checkbox statuses
activities.addEventListener("change", event => {

	// Check for and disable any activities that overlap
	disableCheckBox(1, 3);
	disableCheckBox(3, 1);
	disableCheckBox(2, 4);
	disableCheckBox(4, 2);

	// Loop through checkboxes array to calculate the total cost of activities
	let total = 0;  // Storage for total cost
	for(let index = 0; index < checkboxes.length; index++) {
		// For any checkbox that is checked, add to the total
		if(checkboxes[index].checked) {
			if(index == 0) {
				total += 200;  // First activity is $200
			} else {
				total += 100;  // All other activities are $100
			}
		}
	}
	
	// Show the total amount or hide the total if zero
	if(total > 0) {
		totals.textContent = "Total: $" + total;
		totals.style.display = "block";
	} else {
		totals.style.display = "none";
	}
});


// Payment Info section of the form

// Set default selectors
let payment = document.getElementById("payment");
let creditCard = document.getElementById("credit-card");
let payPal = creditCard.nextElementSibling;
let bitCoin = payPal.nextElementSibling;

// Enable and disable payment sections
function showPaymentInfo(displayCreditCard, displayPayPal, displayBitCoin) {
	creditCard.style.display = displayCreditCard;
	payPal.style.display = displayPayPal;
	bitCoin.style.display = displayBitCoin;
}

// Default settings for credit card
payment.selectedIndex = 1;
showPaymentInfo("block", "none", "none");  

// Turn on and off payments sections based on the selection
payment.addEventListener("change", () => {
	if(payment.value.toLowerCase() == "credit card") {
		showPaymentInfo("block", "none", "none");
	} else if(payment.value.toLowerCase() == "paypal") {
		showPaymentInfo("none", "block", "none");
	} else if(payment.value.toLowerCase() == "bitcoin") {
		showPaymentInfo("none", "none", "block");
	} else {
		showPaymentInfo("none", "none", "none");
	}
});


// Form validation
