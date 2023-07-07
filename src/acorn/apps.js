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
        vscode.window.showErrorMessage("could not get acorns");
        return [];
    }

    if (apps.stdout.trim() === "") {
        return [];
    }

    let appNames = [];
    try {
        appNames = JSON.parse(apps.stdout.trim());
    } catch (e) {
        vscode.window.showErrorMessage("could not get acorns");
        return [];
    }

    return appNames.items;
}

module.exports = {
    getAppList,
}