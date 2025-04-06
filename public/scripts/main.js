
const drop = document.querySelector('.drop');
const cart = document.querySelector(".cart__drop");


drop.addEventListener('click', ()=>{
  cart.classList.toggle("active");

});


const hamburger = document.querySelector('.hamburger');
// const navLink = document.querySelectorAll('.nav__link');
const navMenu = document.querySelector('.nav__menu');
const main = document.querySelector('.main');

hamburger.addEventListener('click', ()=>{
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
  main.classList.toggle('active');
})
