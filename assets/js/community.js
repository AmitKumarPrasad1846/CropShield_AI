// Header scroll effect
window.addEventListener('scroll', function () {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', function () {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
});
// Forum tab functionality
const forumTabs = document.querySelectorAll('.forum-tab');
forumTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        forumTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    });
});