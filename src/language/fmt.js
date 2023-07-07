const vscode = require('vscode');
const format = require('../acorn/fmt');

function activate(context) {
    vscode.languages.registerDocumentFormattingEditProvider('acorn', {
        provideDocumentFormattingEdits(document) {
            return format.acornFormatFile(document);
        }
    });
}

module.exports = {
    activate,
}