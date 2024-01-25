const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const uuidv1 = require('uuid/v1');


class Store {
    readNote() { return readFile('db/db.json', 'utf8'); }

    writeNote(note){ return writeFile('db/db.json', JSON.stringify(note)); }

    getNotes() {
        return this.readNote().then((notes) => {
          let pNotes;
    
          try {
            pNotes = [].concat(JSON.parse(notes));
          } catch (error) {
            pNotes = [];
          }
    
          return pNotes;
        });
      }
    
      addNote(note) {
    
        if (!note.title || !note.text) {
         console.log("title and text needed");
        }

        const title = note.title
        const text = note.text
    
        const nNote = { title, text, id: uuidv1() };
    
        return this.getNotes()
          .then((notes) => [...notes, nNote])
          .then((updated) => this.writeNote(updated))
          .then(() => nNote);
      }
    
      removeNote(id) {
        return this.getNotes()
          .then((notes) => notes.filter((note) => note.id !== id))
          .then((newNotes) => this.writeNote(newNotes));
      }
    }

module.exports = new Store();