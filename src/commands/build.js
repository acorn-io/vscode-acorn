const vscode = require("vscode");
const { getTerminalByName } = require("./utils");

function activate(context) {
    const buildCommandID = "acorn.commands.build";
    const AcornBuildTerminalName = "Acorn build";
    let binary = vscode.workspace.getConfiguration('acorn').get('acornPath');

    let buildCMD = vscode.commands.registerCommand(
        buildCommandID,
        async function () {
            let term = getTerminalByName(AcornBuildTerminalName);
            if (typeof term === "undefined") {
                term = vscode.window.createTerminal(AcornBuildTerminalName);
            }

            let elements = [binary, "build"]
            const buildContext = await vscode.window.showInputBox({
                prompt: "Build context?",
                value: ".",
                placeHolder: ".",
            });

            const tag = await vscode.window.showInputBox({
                prompt: "Tag for build. (not required)",
            })

            if (tag !== "") {
                elements.push("-t"); elements.push(tag);
                const push = await vscode.window.showInputBox({
                    prompt: "Push to registry?",
                    valueSelection: ['no', 'yes'],
                    placeHolder: 'no',
                });
                if (push === 'yes') {
                    elements.push("--push");
                }
            }
            elements.push(buildContext);

            let command = elements.join(" ");

            term.show();
            term.sendText(command);
        }
    );
    context.subscriptions.push(buildCMD);
}

function deactivate() { }

module.exports = {
    activate,
    deactivate,
}
