"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const path = require("path");
const vscode_1 = require("vscode");
const node_1 = require("vscode-languageclient/node");
let client;
let channel;
async function activate(context) {
    channel = vscode_1.window.createOutputChannel('Aml');
    let binPath = vscode_1.workspace.getConfiguration('aml').get('languageServer.path');
    const isBinPathSpecified = (binPath !== undefined && binPath !== null && binPath !== '');
    if (!isBinPathSpecified) {
        channel.appendLine(`Not using custom binary path. Using default path`);
        binPath = path.join('aml-language-server');
    }
    channel.appendLine(`Binary is ${binPath}`);
    const executable = {
        command: binPath,
    };
    const serverOptions = {
        run: executable,
        debug: executable,
    };
    const clientOptions = {
        documentSelector: [{ scheme: 'file', language: 'aml' }],
    };
    client = new node_1.LanguageClient('amlLanguageServer', 'AML Language Server', serverOptions, clientOptions);
    channel.appendLine(`AML Language server will start: '${executable.command}'`);
    client.start();
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map