const vscode = require("vscode");
const { viewLogs } = require("../commands/logs");
const acornProject = require("../acorn/projects");
const refresh = require('../views/refresh')

const openEndpointURL = "acornView.openEndpointUrl";
const setDefaultProject = "acornView.setDefaultProject";
const viewAppLogsView = "acornView.viewAppLogs";
const viewContainerLogsView = "acornView.viewContainerLogs";

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
            viewLogs(selection.label, "");
        }
    );
    context.subscriptions.push(viewAppLogsViewCMD);

    let viewContainerLogsViewCMD = vscode.commands.registerCommand(
        viewContainerLogsView,
        function (selection) {
            viewLogs(selection.appName, selection.label);
        }
    );
    context.subscriptions.push(viewContainerLogsViewCMD);
}

module.exports = {
    activate,
}