const vscode = require('vscode');

function getTerminalByName(name) {
    let terminals = vscode.window.terminals;

    let term = terminals.find(t => t.name === name);
    if (typeof term !== "undefined") {
        return term;
    }
    return undefined;
}

module.exports = {
    getTerminalByName,
}