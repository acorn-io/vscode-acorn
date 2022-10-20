const commands = require("./commands/runInteractive");
const vscode = require("vscode");

module.exports = {
    activate,
    deactivate,
}

function activate(context) {
    commands.activate(context);
}

function deactivate() {
    commands.deactivate()
}

