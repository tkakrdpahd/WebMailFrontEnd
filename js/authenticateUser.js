const mysql = require('mysql');
const crypto = require('crypto');

const connection = mysql.createConnection({
    host: 'mysqldb.doorimoon.com',
    user: 'your_database_user',
    password: 'your_database_password',
    database: 'webserver_db'
});

function hashPassword(password) {
    return crypto
        .createHash('sha256')
        .update(password)
        .digest('hex');
}

function authenticateUser(email, password) {
    const hashedPassword = hashPassword(password);

    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT * FROM members WHERE email = ? AND password = ?',
            [email, hashedPassword],
            (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results.length > 0);
                }
            }
        );
    });
}

function createUser(email, name, password, title, bio, photo_url) {
    const hashedPassword = hashPassword(password);

    return new Promise((resolve, reject) => {
        connection.query(
            'INSERT INTO members (email, name, password, title, bio, photo_url) VALUES (?, ?, ?, ?, ?, ?)',
            [email, name, hashedPassword, title, bio, photo_url],
            (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results.insertId);
                }
            }
        );
    });
}

module.exports = {
    authenticateUser,
    createUser
};
