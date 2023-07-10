const vscode = require("vscode");
const { getTerminalByName } = require("./utils");

function activate(context) {
    let viewAppLogsCMDID = "acorn.commands.viewAppLogs";

    let viewAppLogsCMD = vscode.commands.registerCommand(
        viewAppLogsCMDID,
        async function () {
            const app = await vscode.window.showInputBox({
                "prompt": "App Name",
            })
            viewLogs(app, "");
        }
    );
    context.subscriptions.push(viewAppLogsCMD);
}

module.exports = {
    activate,
    viewLogs,
}

function viewLogs(app, container) {
    let binary = vscode.workspace.getConfiguration('acorn').get('acornPath');

    let command = binary + " " + "logs " + app + " -f";
    let terminalName = app + "-logs";

    if (container !== "") {
        command += " -c " + container;
        terminalName = app + "-" + container + "-logs";
    }

    let term = getTerminalByName(terminalName);
    if (typeof term !== "undefined") {
        term.show();
        return;
    }

    term = vscode.window.createTerminal(terminalName);
    startStreamLogs(term, command);
}

function startStreamLogs(term, command) {
    term.show();
    term.sendText(command);
}