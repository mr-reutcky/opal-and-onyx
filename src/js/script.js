'use strict';

function select(selector, scope = document) {
  return scope.querySelector(selector);
}

function listen(event, selector, callback) {
  return selector.addEventListener(event, callback);
}

const signIn = select('.sign-in-modal');
const userIcon = select('.user');


const contactForm = select(".contact-form"); 
listen("submit", contactForm, (e) => {
  e.preventDefault(); // In order to adjust for dynamic changes in the 
	// input from the user, the fields selectors are within the listen function

  const userName = select(".name").value.trim();
  const email = select(".contact-email").value.trim();
  const message = select(".message").value.trim();
  const errorElement = select(".error"); // Use id selector for error

  errorElement.textContent = "";

  if (userName === "" || email === "" || message === "") {
    errorElement.textContent = "All fields are required.";
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errorElement.textContent = "Please enter a valid email address.";
  } else {
    select(".name").value = "";
    select(".email").value = "";
    select(".message").value = "";
    errorElement.textContent = "Email successfully sent";
		setTimeout(() => {
			errorElement.textContent = "";
		}, 3000);
  } 
});


listen('click', userIcon, () => {
  if (signIn.classList.contains('hidden')){
    signIn.classList.remove('hidden');
    signIn.classList.add('visible');
  } else {
    signIn.classList.remove('visible');
    signIn.classList.add('hidden');
  }
});