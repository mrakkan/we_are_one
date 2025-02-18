// index.js

const express = require('express');
const path = require('path');
// const cors = require('cors');
const app = express();
const port = 3000;

// เพิ่มใช้งานไฟล์
const conn = require('./dbconn.js');

// static resourse & template engine
// static resourse
app.use(express.static('public'));

// routing 
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "/public/song.html"));
});

// 
app.get('/api/datagetinfo', function (req, res) {
    let sql = `SELECT s.song_name, s.song_release_date, s.song_type, a.artist_name FROM songs s LEFT JOIN artists a ON s.artist = a.artist_id`;
    console.log(sql);
    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Success");

        // return { message: "result", status: "success" };
        res.json(result)
    });
    
})

app.listen(port, () => {
    console.log(`listening to port ${port}`);
}); 