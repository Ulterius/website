/**
 * Mobile menu handling
 */
var mobileMenuToggle = document.getElementById('menu-toggle');
var mobileMenu = document.getElementById('mobile-nav');
var hamburger = document.getElementById('hamburger');

mobileMenuToggle.onclick =  function (e) {
    hamburger.classList.toggle('is-active');
    mobileMenu.classList.toggle('mobile-nav--visible');
    document.body.classList.toggle('menu-visible');
    e.preventDefault();
};
