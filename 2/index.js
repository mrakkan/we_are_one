const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require("path");
const app = express();
const port = 3000;

const db = new sqlite3.Database('./questions.db');

app.set('view engine', 'ejs');
app.use(express.static('public'));


app.get('/', (req, res) => {
    db.all('SELECT * FROM questions', (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.render('quest', { questions: rows });
        }
    });
});

app.listen(port, () => {
    console.log(`เปิดดิ้ http://localhost:${port}`);
});