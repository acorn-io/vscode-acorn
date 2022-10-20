const runCommands = require("./commands/runInteractive");
const buildCommands = require("./commands/build");

module.exports = {
    activate,
    deactivate,
}

function activate(context) {
    runCommands.activate(context);
    buildCommands.activate(context);
}

function deactivate() {
    runCommands.deactivate(context);
    buildCommands.deactivate(context);
}

