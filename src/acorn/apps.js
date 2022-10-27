const vscode = require('vscode');
const exec = require("@actions/exec");
const setting = require('./settings');

const chan = vscode.window.createOutputChannel("acorn app");


async function getAppList() {
    const acornCMD = vscode.workspace.getConfiguration('acorn').get('acornPath');
    const ns = setting.getNamespace();
    const apps = await exec.getExecOutput(acornCMD, [
        "--namespace",
        ns,
        "apps",
        "-q"
    ]);

    if (apps.exitCode !== 0) {
        vscode.window.showErrorMessage("could not get apps");
        return [];
    }
    const appNames = apps.stdout.trim();

    let returnApps = [];
    for (const app of appNames.split("\n")) {
        var appDetails = await exec.getExecOutput(acornCMD, [
            "--namespace",
            ns,
            "apps",
            "-o",
            "json",
            app
        ]);
        if (appDetails.exitCode === 0) {
            returnApps.push(JSON.parse(appDetails.stdout.trim()));
        } else {
            vscode.window.showErrorMessage("Error parsing app: " + app + "got: ", appDetails.stderr);
        }
    }

    return returnApps;
}

function getOptions(args) {
    const ns = setting.getNamespace();
    parsedArgs = [];
    if (ns != "acorn") {
        parsedArgs.push("--namespace", ns);
    }
    parsedArgs.push(args);
    chan.appendLine("Args: " + parsedArgs);
    return parsedArgs;
}

module.exports = {
    getAppList,
}