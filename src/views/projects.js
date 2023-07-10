const vscode = require('vscode');
const prjCommand = require('../acorn/projects');

async function activate(context) {
    const view = drawProjectView();
    context.subscriptions.push(view)
}

async function drawProjectView() {
    const projectList = await prjCommand.getProjectList();

    let projectData = new ProjectData(projectList);
    const view = vscode.window.createTreeView('acornProjects', {
        treeDataProvider: projectData,
        showCollapseAll: true
    });
    return view;
}

class ProjectData {
    constructor(projectList) {
        this.projectData = Array.from(projectList);
        this.projectTreeItems = this.convertProjectsToTreeItems();
    }

    getChildren(element) {
        if (!element) {
            return this.projectTreeItems;
        }

        return element.getChildren();
    }

    getTreeItem(element) {
        return element;
    }

    convertProjectsToTreeItems() {
        let array = [];
        this.projectData.forEach((element) => {
            let projectChildren = [];
            let name = element.metadata.annotations["project-name"];
            if (element.metadata.annotations["default-project"] === "true") {
                name = "* " + name
            }
            const item = new ProjectTreeItem(name, projectChildren, vscode.TreeItemCollapsibleState.None)
            array.push(item);
        })
        return array;
    }
};

class ProjectTreeItem {
    constructor(name, children, collapsibleState) {
        this.label = name;
        this.collapsibleState = collapsibleState;
        this.children = children;
    }

    getChildren() {
        return this.children;
    }
};

module.exports = {
    activate,
    drawProjectView,
}