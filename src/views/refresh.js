const vscode = require('vscode');
const appView = require('./apps');
const prjView = require('./projects');

const refreshCommand = "acornView.refreshExplorer";

function activate(context) {
    vscode.commands.registerCommand(
        refreshCommand,
        function () {
            appView.drawAppView();
            prjView.drawProjectView();
        }
    );
    context.subscriptions.push(refreshCommand);
}

function refreshAllPanes() {
    prjView.drawProjectView();
    appView.drawAppView();
}

module.exports = {
    activate,
    refreshAllPanes,
}