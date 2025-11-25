const express = require('express');
const path = require('path');
const fs = require('fs');


const readFileNames = require('./utils/fileNames');
const AppError = require('./utils/AppError');

let filesToShow = readFileNames();
const loadFolder = path.join(__dirname, "fileToSend");

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.render('home', { files: filesToShow });
})

app.get('/download/:name', (req, res, next) => {
    const file = path.join(loadFolder, req.params.name);
    if (fs.existsSync(file)) {
        res.download(file);
    } else next(new AppError("File not found", 500));
})

app.post('/', (req, res) => {
    if (req.query.refreshFiles === 'true') filesToShow = readFileNames();
    res.redirect('/');
})

app.all('*', (req, res, next) => {
    next(new AppError("Page not found", 404));
})

app.use((err, req, res, next) => {
    const { message = "Some problem appeared", statusCode = 500 } = err;
    res.status(statusCode).render('err', {message});
})


app.listen(8080, () => {
    console.log("Listening on port 8080");
})