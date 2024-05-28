// это серверный js

const express = require('express');
const path = require('path');
const {addNote, getNotes, removeNote, changeTitle} = require('./notes.controller');
const chalk = require("chalk");

const port = 3000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'pages');

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

app.get('/', async (req, res) => {
    res.render('index', {title: 'Express App', notes: await getNotes(), created: false});
});

app.post('/', async (req, res) => {
    await addNote(req.body.title);
    res.render('index', {title: 'Express App', notes: await getNotes(), created: true});
});

app.delete('/:id', async (req, res) => {
    await removeNote(req.params.id);
    res.render('index', {title: 'Express App', notes: await getNotes(), created: false});
});

app.put('/:id', async (req, res) => {
    const newTitle = req.body.title;

    await changeTitle(req.params.id, newTitle);
    res.json({success: true});
    res.render('index', {title: 'Express App', notes: await getNotes(), created: false});
});

app.listen(port, () => {
    console.log(chalk.yellowBright(`Server has been started on port ${port}...`))
});
