const vscode = require("vscode")
const util = require('util')

function activate(context) {
    // This must match the command field in the package.json
    const commandID = "acorn.commands.runInteractive";
    const AcornInteractiveTerminalName = "Acorn interactive run";

    let disposable = vscode.commands.registerCommand(
        commandID,
        function () {
            let terminals = vscode.window.terminals

            let term = terminals.find(t => t.name === AcornInteractiveTerminalName);
            if (typeof term !== "undefined") {
                term.show();
                return;
            }

            term = vscode.window.createTerminal(AcornInteractiveTerminalName);
            let binary = vscode.workspace.getConfiguration('acorn').get('acornPath');

            let command = binary + " run -i ."

            term.show();
            term.sendText(command);
        });

    context.subscriptions.push(disposable);

}

exports.activate = activate

function deactivate() { }

module.exports = {
    activate,
    deactivate,
}