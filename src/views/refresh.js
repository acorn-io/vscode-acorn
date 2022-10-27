const vscode = require('vscode');
const view = require('./apps');

const refreshCommand = "acornView.refreshExplorer";

function activate(context) {
    vscode.commands.registerCommand(
        refreshCommand,
        function () {
            const w = view.drawAppView();
        }
    );
    context.subscriptions.push(refreshCommand);
}

module.exports = {
    activate,
}