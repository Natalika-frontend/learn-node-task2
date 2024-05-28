const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json');

async function addNote(title) {
    const notes = await getNotes();

    const note = {
        title,
        id: Date.now().toString()
    }

    notes.push(note);

    await fs.writeFile(notesPath, JSON.stringify(notes, null, 2));

    console.log(chalk.bgGreen('Note was added'));
}

async function getNotes() {
    const notes = await fs.readFile(notesPath, {encoding: 'utf-8'});
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
    const notes = await getNotes();

    console.log(chalk.bgGray('Here is the list of notes: '));
    notes.forEach((note) => {
        console.log(chalk.cyan(note.id), chalk.magenta(note.title));
    });
};

async function removeNote(id) {
    const notes = await getNotes();
    const updatedNotes = notes.filter((note) => (id.toString() !== note.id));

    await fs.writeFile(notesPath, JSON.stringify(updatedNotes, null, 2));

    console.log(chalk.bgMagenta('The note was successfully deleted'));
};

async function changeTitle(id, newTitle) {
    const notes = await getNotes();
    const note = notes.find(note => note.id === id);

    if (note) {
        note.title = newTitle;
        await fs.writeFile(notesPath, JSON.stringify(notes, null, 2));

        console.log(chalk.bgBlue('The note title was successfully changed'));
    }
};

module.exports = {addNote, getNotes, removeNote, changeTitle};
