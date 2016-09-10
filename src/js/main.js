var mobileMenuToggle, mobileMenu;

/**
 * Mobile menu handling
 */
mobileMenuToggle = document.getElementById('menu-toggle');
mobileMenu = document.getElementById('mobile-nav');

console.log(mobileMenu);
console.log(mobileMenuToggle);

mobileMenuToggle.onclick =  function (e) {
    document.getElementById('hamburger').classList.toggle('is-active');
    mobileMenu.classList.toggle('mobile-nav--visible');
    document.body.classList.toggle('menu-visible');
    e.preventDefault();
};
