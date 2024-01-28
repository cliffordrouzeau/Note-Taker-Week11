const router = require('express').Router();
const util = require('util');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);


router.get('/notes', (req, res) => {
    readFile('./db/db.json', 'utf8')
    .then((notes) => {return res.json(JSON.parse(notes))})
  });
  
  router.post('/notes', (req, res) => {
    const {title, text } = req.body

    if(req.body) {
      const nNote = {
        title,
        text,
        id: uuidv4()
      }

      readFile('./db/db.json', 'utf8')
      .then((notes) => {
        try {
          allNotes = [].concat(JSON.parse(notes));
        } catch (err) {
          allNotes = [];
        }
  
        return allNotes;
      }).then((aNotes) => [...aNotes, nNote])
      .then((uNotes) => writeFile('db/db.json', JSON.stringify(uNotes)))
      .then(() => nNote)
      .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err));

    }
  });

module.exports = router;