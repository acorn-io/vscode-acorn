const runCommands = require("./commands/runInteractive");
const buildCommands = require("./commands/build");
const viewRefresh = require("./views/refresh");
const view = require("./views/apps");
const viewutils = require("./views/utils");

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
}

function deactivate() {
    runCommands.deactivate(context);
    buildCommands.deactivate(context);
}

