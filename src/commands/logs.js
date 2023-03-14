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
            viewAppLogs(app);
        }
    );
    context.subscriptions.push(viewAppLogsCMD);
}

module.exports = {
    activate,
    viewAppLogs,
}

function viewAppLogs(app) {
    let binary = vscode.workspace.getConfiguration('acorn').get('acornPath');
    let term = getTerminalByName(app + "-logs");
    if (typeof term !== "undefined") {
        term.show();
        return;
    }

    term = vscode.window.createTerminal(app + "-logs");
    let command = binary + " " + "logs -f " + app;
    startStreamLogs(term, command);
}

function startStreamLogs(term, command) {
    term.show();
    term.sendText(command);
}