const yargs = require('yargs');
const pkg = require('./package.json');
const {addNote, printNotes, removeNote} = require('./notes.controller');

yargs.version(pkg.version);

yargs.command({
    command: 'add',
    describe: 'Add a new note to list',
    builder: {
        title: {
            type: 'string',
            describe: 'Note title',
            demandOption: true
        },
    },
    handler({ title }) {
        addNote(title).catch(err => console.error(err));// добавила обработку ошибок
    },
});

yargs.command({
    command: 'list',
    describe: 'Print all notes',
    async handler() {
        printNotes().catch(err => console.error(err));// добавила обработку ошибок
    }
});

yargs.command({
    command: 'remove',
    describe: 'Remove note by id',
    async handler({ id }) {
        removeNote(id).catch(err => console.error(err));// добавила обработку ошибок
    }
});

yargs.parse();
