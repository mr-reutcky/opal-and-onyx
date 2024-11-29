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
})

listen('click', userIcon, () => {
  if (signIn.classList.contains('hidden')){
    signIn.classList.remove('hidden');
    signIn.classList.add('visible');
  } else {
    signIn.classList.remove('visible');
    signIn.classList.add('hidden');
  }
});