# @nhankyjangchan/project-structure-generator

[![npm version](https://img.shields.io/npm/v/%40nhankyjangchan%2Fproject-structure-generator?style=for-the-badge&logo=npm&color=blue)](https://www.npmjs.com/package/@nhankyjangchan/project-structure-generator)
[![github repo](https://img.shields.io/badge/github-repo-blue?logo=github&style=for-the-badge)](https://github.com/nhankyjangchan/project-structure-generator)
[![node version](https://img.shields.io/badge/node.js-%3E%3Dv20-yellow?logo=nodedotjs&style=for-the-badge)](https://nodejs.org/en/download)
[![npm downloads](https://img.shields.io/npm/dw/%40nhankyjangchan%2Fproject-structure-generator?style=for-the-badge&color=lightgreen)](https://www.npmjs.com/package/@nhankyjangchan/project-structure-generator)
[![unpacked Size](https://img.shields.io/npm/unpacked-size/%40nhankyjangchan%2Fproject-structure-generator?style=for-the-badge&color=lightgreen)](https://www.npmjs.com/package/@nhankyjangchan/project-structure-generator)
[![last update](https://img.shields.io/npm/last-update/%40nhankyjangchan%2Fproject-structure-generator?style=for-the-badge&color=lightgreen)](https://www.npmjs.com/package/@nhankyjangchan/project-structure-generator)
[![license](https://img.shields.io/npm/l/%40nhankyjangchan%2Fproject-structure-generator?style=for-the-badge&color=orange)](https://github.com/nhankyjangchan/project-structure-generator/blob/main/LICENSE)

A simple and fast CLI tool to generate a predefined, opinionated folder structure for new JS or TS backend projects. It saves time by creating commonly used directories and copying essential configuration boilerplates in seconds.

**Features:**

- 🚀 **Zero Config:** Just run `psg` and answer `y`.
- 📁 **Predefined Structure:** Automatically creates `src/` with subfolders like `config`, `controllers`, `models`, `middlewares`, etc.
- 📄 **Boilerplate Files:** Copies template files for `.gitignore`, `.prettierrc.json` and other from built-in templates.
- 🔒 **Safety Check:** Prevents accidental overwriting by checking if the target directory is empty (can be bypassed with `--force`).
- 💬 **Interactive Confirmation:** Asks for permission before modifying the file system.

## Installation

```bash
$ npm i -g @nhankyjangchan/project-structure-generator
```

## Usage

Navigate to an **empty** folder (or use `--force`) and run:

```bash
$ psg
```

## Options

| Flag         | Alias | Description                                                                                               |
| :----------- | :---- | :-------------------------------------------------------------------------------------------------------- |
| `--ts`       | -     | Copies `tsconfig.json` template in addition to default JS files.                                          |
| `--prettier` | -     | Copies `prettier` configuration files.                                                                    |
| `--force`    | -     | Ignores the "empty directory" check and forces the creation of folders/files (overwrites existing files). |
| `--h`        | -     | Displays help format.                                                                                     |

### Examples

**1. Basic JavaScript Project**

```bash
mkdir my-new-api
cd my-new-api
psg
```

**2. TypeScript Project with Prettier**

```bash
mkdir my-ts-api
cd my-ts-api
psg --ts --prettier
```

**3. Force Generation in a Non-Empty Directory**

```bash
psg --force
```

## Generated Structure

After running the command, your project root will look like this:

```
.
├── .env.development    # Environment variables template
├── .gitignore          # Node.js specific ignore rules
├── .prettierignore     # Prettier ignore rules
├── .prettierrc.json    # Basic formatting config
├── jsconfig.json       # JavaScript configuration
├── package.json        # Package manifest
├── tsconfig.json       # TypeScript configuration
└── src/
    ├── config/
    ├── controllers/
    ├── handlers/
    ├── middlewares/
    ├── models/
    ├── plugins/
    ├── routing/
    └── utils/
```

## Releases

[CHANGELOG](./CHANGELOG.md)

## License

[MIT](./LICENSE)
