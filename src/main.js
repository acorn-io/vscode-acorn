const runCommands = require("./commands/runInteractive");
const buildCommands = require("./commands/build");
const authCommands = require("./commands/auth");
const logCommands = require("./commands/logs");
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
    authCommands.activate(context);
    logCommands.activate(context);
    view.activate(context);
    viewRefresh.activate(context);
    viewutils.activate(context);
    viewProjects.activate(context);
}

function deactivate() {
    runCommands.deactivate(context);
    buildCommands.deactivate(context);
    authCommands.deactivate(context);
}

