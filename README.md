# (PROTOTYPE) Basic Acornfile extension Visual Studio Code

**Warning** This is a prototype and not an official Acorn Labs project

## Installation

### Prerequisites

- [Acorn CLI](https://docs.acorn.io/installation/installing#acorn-cli) installed and running against a cluster
- Have Visual Studio Code CLI tools installed

### Install prototype extension

1. Download the latest extension [release](https://github.com/cloudnautique/vscode-aml/releases/latest).
1. Run

```shell
code --install-extension [PATH TO EXT]
```

## Features

This extension provides basic syntax highlighting and code snippets for:

- args
- containers
- jobs
- secrets
- volumes
- localData

Commands:

Acorn build
Acorn run (interactive)

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
