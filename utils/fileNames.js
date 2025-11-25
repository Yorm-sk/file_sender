// Read names of zip and rar files in fileToSend folder
const fs = require('fs');
const path = require('path')

const directory = '../fileToSend'

function readFilesName(end = 'zip') {
    return fs.readdirSync(path.join(__dirname, directory)).filter(e => e.endsWith('.zip') || e.endsWith('.rar'));
}

module.exports = readFilesName;
