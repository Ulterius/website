var mobileMenuToggle, mobileMenu;

/**
 * Mobile menu handling
 */
 mobileMenuToggle = $('.menu-toggle');
 mobileMenu = $('.mobile-nav');

 mobileMenuToggle.click(function (e) {
   // Add active class
   $(this).find('.hamburger').toggleClass('is-active');
   mobileMenu.toggleClass('mobile-nav--visible');
   $('body').toggleClass('menu-visible');

   e.preventDefault();
 })
