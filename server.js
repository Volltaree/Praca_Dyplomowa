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


app.listen(port, () => {
  console.log(`Serwer uruchomiony na porcie ${port}`);
});
