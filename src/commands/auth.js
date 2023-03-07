const vscode = require("vscode");
const acornAuth = require("../acorn/login");
const acornRefresh = require("../views/refresh");

function activate(context) {
    const acornLoginCmdID = "acorn.commands.login";
    let loginCMD = vscode.commands.registerCommand(
        acornLoginCmdID,
        async function () {
            const loginDomain = await vscode.window.showInputBox({
                prompt: "Domain?",
            });

            const acornDomains = new Set(["acorn.io", "acornlabs.com"]);
            const isAcornDomain = Array.from(acornDomains).some((str) => {
                return loginDomain.includes(str);
            });

            if (!isAcornDomain) {
                const username = await vscode.window.showInputBox({
                    prompt: 'Username',
                });

                await vscode.window.showInputBox({
                    prompt: 'Password?',
                    password: true,
                }).then((password) => {
                    acornAuth.loginRegistry(loginDomain, username, password);
                });
                return;
            }

            await acornAuth.login(loginDomain);
            acornRefresh.refreshAllPanes();

        }
    );
    context.subscriptions.push(loginCMD);

    const acornLogoutCmdID = "acorn.commands.logout";
    let logoutCMD = vscode.commands.registerCommand(
        acornLogoutCmdID,
        async function () {
            const logoutDomain = await vscode.window.showInputBox({
                prompt: "Domain?",
            });

            await acornAuth.logout(logoutDomain);
            acornRefresh.refreshAllPanes();
        }
    );
    context.subscriptions.push(logoutCMD);
}

function deactivate() { }

module.exports = {
    activate,
    deactivate,
}