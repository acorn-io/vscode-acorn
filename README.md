# Acorn Visual Studio Code extension

## Features

This extension is for developers authoring or working with Acorn applications.

Features include:

- Syntax highlighting for Acornfiles
- Formatting for Acornfiles
- Browse Acorn applications running in the cluster
- Connect to published endpoints
- Run Acorn build command
- Run/Start an acorn app with Acorn run (interactive)
- View app and container logs

## Dependencies

- [Acorn CLI](https://docs.acorn.io/installation/installing#acorn-cli) installed and running against a cluster

## Format on Save

To enable format on save, add the following to your settings.json file:

```json
[acorn]: {
    "editor.formatOnSave": true
}
```

## Commands for running Acorn apps

- `Acorn Run: Interactive` - Run the Acorn app from Acornfile in interactive mode.
- `Acorn Run: Image` - Run provided Acorn image.

## Commands for building Acorn images

- `Acorn Build: Image` - Build an Acorn image from the Acornfile in the root of the workspace.

## License

Copyright (c) 2022 [Acorn Labs, Inc.](http://acorn.io)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
