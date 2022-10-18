import * as path from 'path';
import { workspace, ExtensionContext, OutputChannel, window } from 'vscode';

import {
    Executable,
    LanguageClient,
    LanguageClientOptions,
    ServerOptions,
} from 'vscode-languageclient/node';

let client: LanguageClient;
let channel: OutputChannel;

export async function activate(context: ExtensionContext): Promise<void> {
    channel = window.createOutputChannel('Aml');

    let binPath: string = workspace.getConfiguration('aml').get('languageServer.path');
    const isBinPathSpecified = (binPath !== undefined && binPath !== null && binPath !== '');
    if (!isBinPathSpecified) {
        channel.appendLine(`Not using custom binary path. Using default path`);
        binPath = path.join('aml-language-server');
    }
    channel.appendLine(`Binary is ${binPath}`);

    const executable: Executable = {
        command: binPath,
    };

    const serverOptions: ServerOptions = {
        run: executable,
        debug: executable,
    };

    const clientOptions: LanguageClientOptions = {
        documentSelector: [{ scheme: 'file', language: 'aml' }],
    };

    client = new LanguageClient(
        'amlLanguageServer',
        'AML Language Server',
        serverOptions,
        clientOptions,
    );

    channel.appendLine(`AML Language server will start: '${executable.command}'`);

    client.start();
}

export function deactivate(): Thenable<void> | undefined {
    if (!client) {
        return undefined;
    }
    return client.stop();
}