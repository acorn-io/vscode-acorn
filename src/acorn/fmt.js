const vscode = require('vscode');
const exec = require("@actions/exec");
const tmpdir = require("os");
const { randomBytes } = require('crypto');
const { writeFileSync, readFileSync, unlinkSync } = require('fs');

async function acornFormatFile(file) {
    // get just the filename
    const fileName = file.fileName.split("/").pop();

    const acornCMD = vscode.workspace.getConfiguration('acorn').get('acornPath');
    const range = file.validateRange(new vscode.Range(0, 0, Infinity, Infinity));

    const dir = tmpdir.tmpdir();
    const random = randomBytes(8).toString('hex');
    const tmpFile = dir + "/" + fileName + "-" + random;

    writeFileSync(tmpFile, file.getText());

    // run acorn fmt on the tempfile
    const fmt = await exec.getExecOutput(acornCMD, [
        "fmt",
        tmpFile,
    ]);

    if (fmt.exitCode !== 0) {
        vscode.window.showErrorMessage("Could not format file: " + file);
        return;
    }

    const fmtContent = readFileSync(tmpFile).toString();
    unlinkSync(tmpFile);

    return [new vscode.TextEdit(range, fmtContent)];
}

module.exports = {
    acornFormatFile,
}