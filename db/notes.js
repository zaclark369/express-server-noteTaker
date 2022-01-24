const fs = require('fs');
const util = require('util');
var uniqid = require('uniqid')


const readFileASync = util.promisify(fs.readFile);
const writeFileASync = util.promisify(fs.writeFile);

class Notes {
    read() {
        return readFileASync("db/db.json", "utf8");
    }
    write(note) {
        return writeFileASync("db/db.json", JSON.stringify(note));
    }
    getNotes() {
        return this.read().then((notes) => {
            let parsedNotes;
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            }
            catch (err) {
                parsedNotes = [];
            }
            return parsedNotes;
        })
    }
    addNote(note) {
        const {title, text} = note;
        
        const newNote = {title, text, id:uniqid()};
        
        return this.getNotes().then((notes) => [...notes, newNote])
        .then((updateNotes) => this.write(updateNotes))
        .then(() => newNote);
    }
    removeNotes(id) {
        return this.getNotes().then((notes) => notes.filter((note) => note.id !== id))
        .then((notes) => this.write(notes));
    }
}

module.exports = new Notes();