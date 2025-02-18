const express = require("express");
const path = require("path");
const port = 3000;
const sqlite3 = require('sqlite3').verbose();


const app = express();


let db = new sqlite3.Database('userdata.db', (err) => {    
  if (err) {
      return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});



app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    const query = 'SELECT * FROM users ';
    db.all(query, (err, rows) => {
      if (err) {
        console.log(err.message);
      }
      console.log(rows);
      res.render('showdata', { data : rows });
    });
  });

  app.get('/show/:id', (req, res) => {
    const userId = req.params.id;
    db.get('SELECT * FROM users WHERE id = ?', [userId], (err, row) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.render('datashow', { data : row });
        }
    });
});

app.listen(port, () => {
   console.log("Server started.");
 });