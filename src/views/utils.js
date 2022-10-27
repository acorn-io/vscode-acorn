const vscode = require("vscode");

const openEndpointURL = "acornView.openEndpointUrl";

function activate(context) {
    let openURLCMD = vscode.commands.registerCommand(
        openEndpointURL,
        function (url) {
            vscode.env.openExternal(url);
        }
    );
    context.subscriptions.push(openURLCMD);
}

module.exports = {
    activate,
}