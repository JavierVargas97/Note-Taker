const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Path to the database
const dbPath = './db/db.json';

// port call
const app = express()
const port = process.env.PORT || 3001;

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//notes returns
app.get('/notes', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public', 'notes.html'));
})

app.get('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync(dbPath, 'utf8'))
    res.status(200).json(notes);
})

app.post('/api/notes', (req, res) => {
    const note = req.body;
    note.id = uuidv4();
    const notes = JSON.parse(fs.readFileSync(dbPath, 'utf8'))
    notes.push(note);
    fs.writeFileSync(dbPath, JSON.stringify(notes));
    console.log(`${JSON.stringify(note)} has been sucessfully added to JSON file`);
    res.status(200).json(notes);
});

app.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    const notes = JSON.parse(fs.readFileSync(dbPath, 'utf8'))
    const newNotes = notes.filter(notes => notes.id !== id);
    fs.writeFileSync(dbPath, JSON.stringify(newNotes));
    console.log(`Note ${id} has been sucessfully deleted from JSON file`);
    res.status(200).json(newNotes);
});
app.get('*', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public', 'index.html'));
})
app.listen(port, () => {
    console.log(`Server listening on ${port}`);
})