const vscode = require("vscode")

function activate(context) {
    const runCommandID = "acorn.commands.run";
    const interactiveRunCommandID = "acorn.commands.runInteractive";
    const AcornInteractiveRunTerminalName = "Acorn interactive run";
    const AcornRunTerminalName = "Acorn run";


    let binary = vscode.workspace.getConfiguration('acorn').get('acornPath');
    let stream = vscode.window.createOutputChannel('Acorn');

    let runInteractiveCMD = vscode.commands.registerCommand(
        interactiveRunCommandID,
        function () {
            let term = getTerminalByName(AcornInteractiveRunTerminalName);
            if (typeof term !== "undefined") {
                term.show();
                return;
            }

            term = vscode.window.createTerminal(AcornInteractiveRunTerminalName);

            let command = binary + " run -i ."
            runImage(term, command);
        }
    );
    context.subscriptions.push(runInteractiveCMD);

    let runCMD = vscode.commands.registerCommand(
        runCommandID,
        async function () {
            let term = getTerminalByName(AcornRunTerminalName);
            if (typeof term === "undefined") {
                term = vscode.window.createTerminal(AcornRunTerminalName);
            }

            const image = await vscode.window.showInputBox({
                prompt: "Acorn image to run?",
                value: ".",
                placeHolder: "."
            });

            const runArgs = await vscode.window.showInputBox({
                "prompt": "Args to pass to Acorn run",
            });

            const imageArgs = await vscode.window.showInputBox({
                "prompt": "Args to pass to Acorn image" + image,
            })

            let elements = [binary, "run", runArgs, image, imageArgs];
            let command = elements.join(" ");

            runImage(term, command);
        }
    );
    context.subscriptions.push(runCMD);
}

exports.activate = activate

function deactivate() { }

module.exports = {
    activate,
    deactivate,
    getTerminalByName,
}

function runImage(term, command) {
    term.show();
    term.sendText(command);
}

function getTerminalByName(name) {
    let terminals = vscode.window.terminals;

    let term = terminals.find(t => t.name === name);
    if (typeof term !== "undefined") {
        return term;
    }
    return undefined;
}