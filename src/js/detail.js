'use strict';

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
/*---     Product - Hearts    ---*/
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
/*---     Sign-in Modal       ---*/
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

listen('keydown', document, function(event) {
  if (event.key === 'Escape' && signIn.classList.contains('visible')) {
    signInVisibility();
    backgroundBlur();
  }
})

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