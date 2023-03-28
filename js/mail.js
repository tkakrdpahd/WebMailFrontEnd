// mail.js

document.addEventListener('DOMContentLoaded', function () {
    setupNavigation();
    fetchEmails();
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

function fetchEmails() {
    const apiUrl = 'https://mail.doorimoon.com/api/emails'; // Replace with your API endpoint
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch emails from mail.doorimoon.com');
            }
            return response.json();
        })
        .then(data => populateEmailTable(data))
        .catch(error => {
            console.error('Error fetching emails:', error);
            console.log('Trying to fetch emails from fallback domain: mail.doorimoon.kr');
            fetchEmailsFallback();
        });
}

function fetchEmailsFallback() {
    const fallbackApiUrl = 'https://mail.doorimoon.kr/api/emails'; // Replace with your fallback API endpoint
    fetch(fallbackApiUrl)
        .then(response => response.json())
        .then(data => populateEmailTable(data))
        .catch(error => console.error('Error fetching emails from fallback domain:', error));
}

function populateEmailTable(emails) {
    const tableBody = document.querySelector('.mail-list table tbody');
    tableBody.innerHTML = '';

    emails.slice(0, 10).forEach((email, index) => {
        const row = document.createElement('tr');

        const noCell = document.createElement('td');
        noCell.textContent = index + 1;

        const senderCell = document.createElement('td');
        senderCell.textContent = email.sender;

        const receivedDateCell = document.createElement('td');
        receivedDateCell.textContent = email.received_date;

        const titleCell = document.createElement('td');
        titleCell.textContent = email.title;

        row.appendChild(noCell);
        row.appendChild(senderCell);
        row.appendChild(receivedDateCell);
        row.appendChild(titleCell);

        tableBody.appendChild(row);
    });
}
