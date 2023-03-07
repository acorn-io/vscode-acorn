const vscode = require('vscode');
const apps = require('../acorn/apps');
const util = require('util');

//const chan = vscode.window.createOutputChannel("Acorn AppData");

async function activate(context) {
    const view = drawAppView();
    context.subscriptions.push(view);
}

async function drawAppView() {
    const appList = await apps.getAppList();

    let appData = new AppData(appList);
    const view = vscode.window.createTreeView('acornApps', {
        treeDataProvider: appData,
        showCollapseAll: true
    });
    return view;
}
class AppData {
    constructor(appList) {
        this.appData = Array.from(appList);
        this.appTreeItems = this.convertAppsToTreeItems();
    }

    getChildren(element) {
        if (!element) {
            return this.appTreeItems;
        }

        return element.getChildren();
    }

    getTreeItem(element) {
        return element;
    }

    convertAppsToTreeItems() {
        let array = [];
        this.appData.forEach((element) => {
            let appChildren = [];
            appChildren.push(new AppTreeItem("Endpoints", appEndpointTreeItems(element), vscode.TreeItemCollapsibleState.Collapsed));
            appChildren.push(new AppTreeItem("Containers", appContainerTreeItems(element), vscode.TreeItemCollapsibleState.Collapsed));
            appChildren.push(new AppTreeItem("Volumes", appVolumeTreeItems(element), vscode.TreeItemCollapsibleState.Collapsed));
            appChildren.push(new AppTreeItem("Secrets", appSecretTreeItems(element), vscode.TreeItemCollapsibleState.Collapsed));
            array.push(
                new AppTreeItem(element.metadata.name, appChildren, vscode.TreeItemCollapsibleState.Collapsed)
            );
        });

        //chan.appendLine(util.inspect(array, { depth: null }));
        return array;
    }

};

class AppTreeItem {
    constructor(name, children, collapsibleState) {
        this.label = name;
        this.collapsibleState = collapsibleState;
        this.children = children;
    }

    getChildren() {
        return this.children;
    }

    setCommand(commandId, args) {
        this.command = {
            command: commandId,
            arguments: args
        };
    }
}

function appEndpointTreeItems(app) {
    let e = app.status.endpoints;

    let endpoints = [];
    if (e !== undefined) {
        e.forEach(endpoint => {
            if (endpoint.address !== undefined) {
                const addr = new AppTreeItem(endpoint.address, null, vscode.TreeItemCollapsibleState.None);
                addr.setCommand("acornView.openEndpointUrl", [endpoint.publishProtocol + "://" + endpoint.address]);
                endpoints.push(new AppTreeItem(`${endpoint.target}:${endpoint.targetPort}`, [addr], vscode.TreeItemCollapsibleState.Collapsed));
            } else {
                endpoints.push(new AppTreeItem(`${endpoint.target}:${endpoint.targetPort}`, null, vscode.TreeItemCollapsibleState.None));
            }
        });
    }

    return endpoints;
}

function appContainerTreeItems(app) {
    let c = app.status.appSpec.containers;

    let containers = [];
    if (c !== undefined) {
        Object.keys(c).forEach(container => {
            containers.push(new AppTreeItem(container, null, vscode.TreeItemCollapsibleState.None));
        });
    }

    return containers;
}

function appVolumeTreeItems(app) {
    let v = app.status.appSpec.volumes;

    let volumes = [];
    if (v !== undefined) {
        Object.keys(v).forEach(volume => {
            volumes.push(new AppTreeItem(volume, null, vscode.TreeItemCollapsibleState.None));
        })
    }

    return volumes;
}

function appSecretTreeItems(app) {
    let s = app.status.appSpec.secrets;

    let secrets = [];
    if (s !== undefined) {
        Object.keys(s).forEach(secret => {
            secrets.push(new AppTreeItem(secret, null, vscode.TreeItemCollapsibleState.None));
        })
    }

    return secrets;
}

module.exports = {
    activate,
    drawAppView,
}