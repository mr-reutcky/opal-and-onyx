'use strict';

function select(selector, scope = document) {
  return scope.querySelector(selector);
}

function listen(event, selector, callback) {
  return selector.addEventListener(event, callback);
}

const signIn = select('.sign-in-modal');
const userIcon = select('.user');
const bgDarken = select('.out-of-focus');

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