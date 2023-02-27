const runCommands = require("./commands/runInteractive");
const buildCommands = require("./commands/build");
const view = require("./views/apps");
const viewutils = require("./views/utils");
const viewRefresh = require("./views/refresh");
const viewProjects = require("./views/projects");

module.exports = {
    activate,
    deactivate,
}

function activate(context) {
    runCommands.activate(context);
    buildCommands.activate(context);
    view.activate(context);
    viewRefresh.activate(context);
    viewutils.activate(context);
    viewProjects.activate(context);
}

function deactivate() {
    runCommands.deactivate(context);
    buildCommands.deactivate(context);
}

