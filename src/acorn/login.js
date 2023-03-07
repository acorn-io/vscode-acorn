const vscode = require('vscode');
const exec = require('@actions/exec');

async function login(domain) {
    const acornCMD = vscode.workspace.getConfiguration('acorn').get('acornPath');
    const login = await exec.getExecOutput(acornCMD, [
        "login",
        domain,
    ]);

    if (login.exitCode !== 0) {
        vscode.window.showErrorMessage("Could not login in to" + domain);
        return [];
    }

    return;
}

async function logout(domain) {
    const acornCMD = vscode.workspace.getConfiguration('acorn').get('acornPath');
    const logout = await exec.getExecOutput(acornCMD, [
        "logout",
        domain,
    ]);

    if (logout.exitCode !== 0) {
        vscode.window.showErrorMessage("Could not logout of " + domain);
        return [];
    }

    return;
}

async function loginRegistry(domain, username, password) {
    const acornCMD = vscode.workspace.getConfiguration('acorn').get('acornPath');
    const login = await exec.getExecOutput(acornCMD, [
        "login",
        "-u",
        username,
        "-p",
        password,
        domain,
    ]);

    if (login.exitCode !== 0) {
        vscode.window.showErrorMessage("Could not log into: " + domain + "as user: " + username);
        return [];
    }

    return;
}

module.exports = {
    login,
    logout,
    loginRegistry,
}