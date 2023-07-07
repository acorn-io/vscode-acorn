const vscode = require('vscode');
const exec = require("@actions/exec");
const acornCMD = vscode.workspace.getConfiguration('acorn').get('acornPath');

async function getProjectList() {
    const projects = await exec.getExecOutput(acornCMD, [
        "projects",
        "-o",
        "json"
    ]);

    if (projects.exitCode !== 0) {
        vscode.window.showErrorMessage()
        return [];
    }

    let projectNames = [];
    try {
        projectNames = JSON.parse(projects.stdout.trim());
    } catch (e) {
        vscode.window.showErrorMessage("could not get projects");
        return [];
    }

    return projectNames.items;
}

async function useProject(project) {
    const setPrj = await exec.getExecOutput(acornCMD, [
        "project",
        "use",
        project
    ]);

    if (setPrj.exitCode != 0) {
        vscode.window.showErrorMessage("Error setting project: " + project + "as default got error: ", setPrj.stderr);
    }
}

module.exports = {
    getProjectList,
    useProject,
}