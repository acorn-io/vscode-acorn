const vscode = require("vscode");
const { viewAppLogs } = require("../commands/logs");
const acornProject = require("../acorn/projects");
const refresh = require('../views/refresh')

const openEndpointURL = "acornView.openEndpointUrl";
const setDefaultProject = "acornView.setDefaultProject";
const viewAppLogsView = "acornView.viewAppLogs";

function activate(context) {
    let openURLCMD = vscode.commands.registerCommand(
        openEndpointURL,
        function (url) {
            vscode.env.openExternal(url);
        }
    );
    context.subscriptions.push(openURLCMD);

    let setDefaultProjectCMD = vscode.commands.registerCommand(
        setDefaultProject,
        function (selection) {
            acornProject.useProject(selection.label);
            let timeout = 1000;
            setTimeout(() => {
                refresh.refreshAllPanes();
            }, timeout);
        }
    );
    context.subscriptions.push(setDefaultProjectCMD);

    let viewAppLogsViewCMD = vscode.commands.registerCommand(
        viewAppLogsView,
        function (selection) {
            viewAppLogs(selection.label);
        }
    );
    context.subscriptions.push(viewAppLogsViewCMD);
}

module.exports = {
    activate,
}