const swiper = new Swiper('.slider-wrapper', {
    loop: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
window.onload = function() {
    window.scrollTo(0, 0); // Scrolls to top on page load
};