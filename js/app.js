'use strict';

// Element selectors
const name = document.getElementById("name");
const fieldSetOne = document.getElementsByTagName('fieldset')[0];
const userTitle = document.getElementById("title");
const color = document.getElementById("color");
const colors = color.getElementsByTagName("option");
const design = document.getElementById("design");
const activities = document.querySelector('.activities');
const payment = document.getElementById("payment");
const creditCard = document.getElementById("credit-card");
const payPal = creditCard.nextElementSibling;
const bitCoin = payPal.nextElementSibling;
const email = document.getElementById("mail");
const ccNum = document.getElementById("cc-num");
const zip = document.getElementById("zip");
const cvv = document.getElementById("cvv");
const form  = document.getElementsByTagName('form')[0];
const nameLabel = document.getElementsByTagName('label')[0];
const emailLabel = document.getElementsByTagName('label')[1];
const ccNumLabel = document.getElementsByTagName('label')[14];
const zipLabel = document.getElementsByTagName('label')[15];
const cvvLabel = document.getElementsByTagName('label')[16];
const tshirtHeader = document.getElementsByTagName('legend')[1];
const activityHeader = document.getElementsByTagName('legend')[2];
const paymentHeader = document.getElementsByTagName('legend')[3];
const colorOptions = document.getElementById("colors-js-puns");


// Set focus on the first text field
name.focus();


// ”Job Role” section of the form

// Create an input for Other Job Role
const otherTitle = document.createElement('input');
otherTitle.id = "other-title";
otherTitle.type = "text";
otherTitle.placeholder="Your Job Role";
otherTitle.style.display = "none";
fieldSetOne.appendChild(otherTitle);

// View otherTitle when Other is selected, otherwise hide it
userTitle.addEventListener("change", () => {
	if(userTitle.value === "other") {
		otherTitle.style.display = "block";
	} else {
		otherTitle.style.display = "none";
	}
});


// ”T-Shirt Info” section of the form

// Create a color header option and select it
const colorHeader = document.createElement("option");
colorHeader.textContent = "<-- Please select a T-shirt theme";
color.insertBefore(colorHeader, color.childNodes[0]);
color.selectedIndex = 0;

// Disable all colors
function disableColors() {
	for(let index = 0; index < color.length; index++) {
		colors[index].style.display = "none";
	}
}

// Select color options based on input value
function selectOptions() {
	if(design.value === "js puns") {
		color.selectedIndex = 1;
		colors[1].style.display = "block";
		colors[2].style.display = "block";
		colors[3].style.display = "block";
	} else if(design.value === "heart js") {
		color.selectedIndex = 4;
		colors[4].style.display = "block";
		colors[5].style.display = "block";
		colors[6].style.display = "block";
	} else {
		color.selectedIndex = 0;
	}
}

// Hide option colors if no design is selected
function showColorOptions() {
	colorOptions.style.display = design.value === "Select Theme" ? "none" : "block";
}

// Run these on page load
disableColors();
showColorOptions();

// Show color options based on which design is selected
design.addEventListener("change", () => {
	disableColors();  // Disable all colors
	selectOptions();  // Turn on any available colors
	showColorOptions();  // Hide color options if no design is selected
});


// ”Register for Activities” section of the form

// Create a totals element to track cost of activities
const totals = document.createElement("h3");
totals.textContent = "Total: ";
totals.style.display = "none";
activities.appendChild(totals);

// Create a checkboxes array, loop through all the elements, and copy over each checkbox
const checkboxes = [];
for(let index = 0; index < activities.children.length; index++) {
	let element = activities.children[index].childNodes[0]; // checkbox is element 0
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

// Calculate and display the total amount
function getTotalAmount() {
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
}

// Moniter all checkbox statuses whenever a change occurs in activities
activities.addEventListener("change", event => {
	// Check for and disable any activities that overlap
	disableCheckBox(1, 3);
	disableCheckBox(3, 1);
	disableCheckBox(2, 4);
	disableCheckBox(4, 2);

	// Get and show the total amount
	getTotalAmount();
});


// Payment Info section of the form

// Enable and disable payment sections
function showPaymentInfo(displayCreditCard, displayPayPal, displayBitCoin) {
	creditCard.style.display = displayCreditCard;
	payPal.style.display = displayPayPal;
	bitCoin.style.display = displayBitCoin;
}

// Turn on and off payments sections based on the selection
function setPaymentInfo() {
	if(payment.value === "credit card") {
		showPaymentInfo("block", "none", "none");
	} else if(payment.value === "paypal") {
		showPaymentInfo("none", "block", "none");
	} else if(payment.value === "bitcoin") {
		showPaymentInfo("none", "none", "block");
	} else {
		showPaymentInfo("none", "none", "none");
	}
}

// Default settings for credit card
payment.selectedIndex = 1;
showPaymentInfo("block", "none", "none");  

// Detect changes in the payment options
payment.addEventListener("change", () => {
	// Set payment section based on input value
	setPaymentInfo();
	
	// Disable credit card validation when credit card is not selected
	if(payment.value !== "credit card") {
		disableCreditCardValidation();
	} else {
		enableCreditCardValidation();
	}
});


// Form validation

// Form validation requirements
name.required = true;
email.required = true;
enableCreditCardValidation();

// Validation patterns
name.pattern = "[A-Za-z]+";
email.pattern = "[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*";
ccNum.pattern = "[0-9]{13,16}";
zip.pattern = "[0-9]{5}";
cvv.pattern = "[0-9]{3}";

// If payment type is a credit card, then these validators are required
function enableCreditCardValidation() {
	ccNum.required = true;
	zip.required = true;
	cvv.required = true;
}

// If payment type is not a credit card, then turn these validators off
function disableCreditCardValidation() {
	ccNum.required = false;
	zip.required = false;
	cvv.required = false;
}

// Returns true if any activity checkbox is checked
function activityChecked() {
	let checked = false;
	for(let index = 0; index < checkboxes.length; index++) {
		if(checkboxes[index].checked) {
			checked = true;
		}
	}
	return checked;
}

// Make sure everything is valid when submit button is pressed
form.addEventListener("submit", (event) => {
	// Test every field for correct validation
	if(!name.validity.valid || !email.validity.valid || !activityChecked() ||
	   design.value === "Select Theme" || payment.value === "select_method" ||
	   !ccNum.validity.valid || !zip.validity.valid || !cvv.validity.valid ) {
			// Show stopper if you get here, stop the form submission
			event.preventDefault();
		
			// Show all fields which have validation errors	
			nameValidation();
			emailValidation();
			tshirtValidation();
			activityValidation();
			paymentValidation();
			ccNumValidation();
			zipValidation();
			cvvValidation();
	}
}, false);


// Form validation messages

// Disable default form messages to use custom validation
form.noValidate = true;

// Colors for error messages
const noError = "#000";
const error = "#C21E1E";

// Validation error for name
function nameValidation() {
	if(name.validity.valid) {
	   nameLabel.textContent = "Name:";
	   nameLabel.style.color = noError;
	} else {
	   nameLabel.textContent = "Name: (Please provide your name)";
	   nameLabel.style.color = error;
	}
}

// Validation error for email
function emailValidation() {
	if(email.validity.valid) {
	   emailLabel.textContent = "Email:";
	   emailLabel.style.color = noError;
	} else {
	   emailLabel.textContent = "Email: (Please provide a valid email address)";
	   emailLabel.style.color = error;
	}
}

// Show validation error if credit card number is not valid
function ccNumValidation() {
	ccNumLabel.style.color = ccNum.validity.valid ? noError : error;
}

// Show validation error if zip code is not valid
function zipValidation() {
	zipLabel.style.color = zip.validity.valid ? noError : error;
}

// Show validation error if cvv is not valid
function cvvValidation() {
	cvvLabel.style.color = cvv.validity.valid ? noError : error;
}

// Create a T-shirt Validation Label
const tshirtLabel = document.createElement('label');
tshirtLabel.className = "validation-error";
tshirtLabel.textContent = "Don't forget to pick a T-shirt";
tshirtHeader.appendChild(tshirtLabel);

// Show validation error if a T-shirt is not selected
function tshirtValidation() {
	tshirtLabel.style.display = design.value !== "Select Theme" ? "none" : "block";
}

// Create an Activities Validation Label
const activityLabel = document.createElement('label');
activityLabel.className = "validation-error";
activityLabel.textContent = "Please select an activity";
activityHeader.appendChild(activityLabel);

// Show validation error if an activity is not selected
function activityValidation() {
	activityLabel.style.display = activityChecked() ? "none" : "block";
}

// Create a Payment Validation Label
const paymentLabel = document.createElement('label');
paymentLabel.className = "validation-error";
paymentLabel.textContent = "Please select a payment option";
paymentHeader.appendChild(paymentLabel);

// // Show validation error if a payment method is not selected
function paymentValidation() {
	paymentLabel.style.display = payment.value !== "select_method" ? "none" : "block";
}
