const runCommands = require("./commands/runInteractive");
const buildCommands = require("./commands/build");
const view = require("./views/apps");

module.exports = {
    activate,
    deactivate,
}

function activate(context) {
    runCommands.activate(context);
    buildCommands.activate(context);
    view.activate(context);
}

function deactivate() {
    runCommands.deactivate(context);
    buildCommands.deactivate(context);
}

