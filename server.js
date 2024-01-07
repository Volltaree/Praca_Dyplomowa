const express = require('express');
const mysql = require('mysql');
//const path = require('path');

const app = express();
const port = 3000;


app.use(express.static('C:/Users/kasia/Desktop/Strona Diety/STRONA_Internetowa/Praca_Dyplomowa'));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'diet'
});

connection.connect(error => {
  if (error) throw error;
  console.log('Pomyślnie połączono z bazą danych MySQL');
});


app.get('/pobierzWarzywa', (req, res) => {
  connection.query('SELECT * FROM Warzywa', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.get('/pobierzDiete', (req, res) => {
  const bmi = parseFloat(req.query.bmi);

  connection.query('SELECT nazwa, opis FROM Diety WHERE przedzial_od <= ? AND przedzial_do > ?', [bmi, bmi], (error, results) => {
      if (error) throw error;
      res.json(results);
  });
});
//////////////////////////////////////////////////////////

app.get('/pobierzPosilki', (req, res) => {
  connection.query('SELECT * FROM Posilki', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});


app.get('/losowePosilki', (req, res) => {
  const kalorie = parseFloat(req.query.kalorie);
  const weganska = req.query.weganska;

  connection.query('SELECT nazwa, typ, kalorie FROM Posilki WHERE kalorie <= ? AND weganska = ? ORDER BY RAND() LIMIT 3', [kalorie + 50, weganska], (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

///////////////////////


app.listen(port, () => {
  console.log(`Serwer uruchomiony na porcie ${port}`);
});
