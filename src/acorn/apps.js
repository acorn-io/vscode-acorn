const vscode = require('vscode');
const exec = require("@actions/exec");

async function getAppList() {
    const acornCMD = vscode.workspace.getConfiguration('acorn').get('acornPath');
    const apps = await exec.getExecOutput(acornCMD, [
        "apps",
        "-o",
        "json"
    ]);

    if (apps.exitCode !== 0) {
        vscode.window.showErrorMessage("could not get apps");
        return [];
    }
    const appNames = apps.stdout.trim();

    let returnApps = [];
    if (appNames.length != 0) {
        for (const app of appNames.split("\n\n")) {
            returnApps.push(JSON.parse(app));
        }
    }

    return returnApps;
}

module.exports = {
    getAppList,
}