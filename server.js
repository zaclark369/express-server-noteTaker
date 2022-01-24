const fs = require("fs");
const path = require("path");
const express = require("express");

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('/api/notes', (req, res) => {
  const database = JSON.parse(fs.readFileSync(__dirname + '/db/db.json', 'utf8', err => {throw new Error(err);}));
  res.json(database);
});

app.post('/api/notes', (req, res) => {

})

app.delete('/api/notes', (req, res) => {
  
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });
  