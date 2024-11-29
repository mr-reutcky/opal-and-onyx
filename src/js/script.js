'use strict';
/*-------------------------------*/
/*-----  Utility Functions   -----*/
/*-------------------------------*/
function select(selector, scope = document) {
  return scope.querySelector(selector);
}
function selectAll(selector, scope = document) {
  return scope.querySelectorAll(selector);
}
function listen(event, selector, callback) {
  return selector.addEventListener(event, callback);
}
const signIn = select('.sign-in-modal');
const userIcon = select('.user');
const favouriteIcon = selectAll('.fa-heart');
const bgDarken = select('.out-of-focus');


/*-------------------------------*/
/*---  Product - Hearts --*/
/*-------------------------------*/

favouriteIcon.forEach(icon => {
  listen('click', icon, () => {
    if (icon.classList.contains('liked')) {
      icon.classList.remove('liked');
      icon.classList.remove('fa-solid');
      icon.classList.add('fa-regular');
    } else {
      icon.classList.add('liked');
      icon.classList.remove('fa-regular');
      icon.classList.add('fa-solid');
    }   
  });
});

favouriteIcon.forEach(icon => {
  listen('click', icon, (event) => {
    event.stopPropagation();
    event.preventDefault()
  });
});

/*-------------------------------*/
/*--------  Contact Form  -------*/
/*-------------------------------*/

const contactForm = select(".contact-form"); 
listen("submit", contactForm, (e) => {
  e.preventDefault(); // In order to adjust for dynamic changes in the 
	// input from the user, the fields selectors are within the listen function

  const userName = select(".name").value.trim();
  const email = select(".contact-email").value.trim();
  const message = select(".message").value.trim();
  const errorElement = select(".error"); 

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

/*-------------------------------*/
/*----  Header - Visibility  ----*/
/*-------------------------------*/

function signInVisibility() {
  if (signIn.classList.contains('hidden')){
    signIn.classList.remove('hidden');
    signIn.classList.add('visible');
  } else {
    signIn.classList.remove('visible');
    signIn.classList.add('hidden');
  }
}

function signInAnimation() {
  if (signIn.classList.contains('slide-in')) {
    signIn.classList.remove('slide-in');
  } else {
    signIn.classList.add('slide-in');
  }
}

function backgroundBlur() {
  if (bgDarken.classList.contains('hidden')){
    bgDarken.classList.remove('hidden');
    bgDarken.classList.add('visible');
  } else {
    bgDarken.classList.remove('visible');
    bgDarken.classList.add('hidden');
  }
}

listen('click', userIcon, (event) => {
  signInVisibility();
  backgroundBlur();
  signInAnimation();
  event.stopPropagation();
});

listen('click', window, () => {
  if (signIn.classList.contains('visible')) { 
    signInVisibility(); 
    signInAnimation();
    backgroundBlur()
  }
})

listen('click', signIn, (event) => {
  event.stopPropagation();
})
