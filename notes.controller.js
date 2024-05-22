const fs = require('fs/promises');
const path = require('path');

const notesPath = path.join(__dirname, 'db.json');

async function addNote(title) {
    const notes = await getNotes();

    const note = {
        title,
        id: Date.now().toString()
    }

    notes.push(note);

    await fs.writeFile(notesPath, JSON.stringify(notes, null, 2));
    const chalk = await import('chalk'); // заменила на динамический импорт
    console.log(chalk.default.bgGreen('Note was added')); // добавила default
}

async function getNotes() {
    const notes = await fs.readFile(notesPath, {encoding: 'utf-8'});
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
    const notes = await getNotes();

    const chalk = await import('chalk');

    console.log(chalk.default.bgGray('Here is the list of notes: '));
    notes.forEach((note) => {
        console.log(chalk.default.cyan(note.id), chalk.default.magenta(note.title));
    });
};

async function removeNote(id) {
    const notes = await getNotes();
    const updatedNotes = notes.filter((note) => (id.toString() !== note.id));

    await fs.writeFile(notesPath, JSON.stringify(updatedNotes, null, 2));

    const chalk = await import('chalk');
    console.log(chalk.default.bgMagenta('The note was successfully deleted'));
};

module.exports = {addNote, printNotes, removeNote};
