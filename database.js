// rozwinąć 
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'haslo',
    database: 'nazwa_bazy_danych'
});

connection.connect((err) => {
    if (err) {
        console.error('Błąd połączenia z bazą danych:', err);
        return;
    }
    console.log('Połączenie z bazą danych MySQL zostało ustanowione.');
});

module.exports = connection;
