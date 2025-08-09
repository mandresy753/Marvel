const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let characters = JSON.parse(fs.readFileSync('characters.json', 'utf8')).characters;

const saveCharacters = () => {
  fs.writeFileSync('characters.json', JSON.stringify({ characters }, null, 2));
};

// GET /characters
app.get('/characters', (req, res) => {
  res.json(characters);
});

// GET /characters/:id
app.get('/characters/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const character = characters.find(char => char.id === id);
  if (!character) {
    return res.status(404).json({ error: 'Character not found' });
  }
  res.json(character);
});

// POST /characters
app.post('/characters', (req, res) => {
  const newCharacter = req.body;
  const maxId = characters.reduce((max, char) => Math.max(max, char.id), 0);
  newCharacter.id = maxId + 1;
  characters.push(newCharacter);
  saveCharacters();
  res.status(201).json(newCharacter);
});

// PUT /characters/:id
app.put('/characters/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = characters.findIndex(char => char.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Character not found' });
  }
  characters[index] = { ...characters[index], ...req.body };
  saveCharacters();
  res.json(characters[index]);
});

// DELETE /characters/:id
app.delete('/characters/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = characters.findIndex(char => char.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Character not found' });
  }
  characters.splice(index, 1);
  saveCharacters();
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});