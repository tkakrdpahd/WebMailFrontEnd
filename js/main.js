// mail.js

document.addEventListener('DOMContentLoaded', function () {
    setupNavigation();
});

function setupNavigation() {
    let navItems = document.querySelectorAll('nav ul li a');

    navItems.forEach(function (navItem) {
        navItem.addEventListener('click', function (event) {
            event.preventDefault();
            handleNavigationClick(this);
        });
    });
}

function handleNavigationClick(navItem) {
    let imageSrc = navItem.querySelector('img').getAttribute('src');
    let mailList = document.querySelector('.mail-list');

    if (imageSrc.includes('Received')) {
        mailList.style.display = 'block';
    } else {
        mailList.style.display = 'none';
    }
}
