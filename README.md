# @nhankyjangchan/project-structure-generator

[![npm version](https://img.shields.io/npm/v/%40nhankyjangchan%2Fproject-structure-generator?style=for-the-badge&logo=npm&color=blue)](https://www.npmjs.com/package/@nhankyjangchan/project-structure-generator)
[![github repo](https://img.shields.io/badge/github-repo-blue?logo=github&style=for-the-badge)](https://github.com/nhankyjangchan/project-structure-generator)
[![node version](https://img.shields.io/badge/node.js-%3E%3Dv20-yellow?logo=nodedotjs&style=for-the-badge)](https://nodejs.org/en/download)
[![npm downloads](https://img.shields.io/npm/dw/%40nhankyjangchan%2Fproject-structure-generator?style=for-the-badge&color=lightgreen)](https://www.npmjs.com/package/@nhankyjangchan/project-structure-generator)
[![unpacked Size](https://img.shields.io/npm/unpacked-size/%40nhankyjangchan%2Fproject-structure-generator?style=for-the-badge&color=lightgreen)](https://www.npmjs.com/package/@nhankyjangchan/project-structure-generator)
[![last update](https://img.shields.io/npm/last-update/%40nhankyjangchan%2Fproject-structure-generator?style=for-the-badge&color=lightgreen)](https://www.npmjs.com/package/@nhankyjangchan/project-structure-generator)
[![license](https://img.shields.io/npm/l/%40nhankyjangchan%2Fproject-structure-generator?style=for-the-badge&color=orange)](https://github.com/nhankyjangchan/project-structure-generator/blob/main/LICENSE)

Minimal and flexible CLI tool to scaffold a standardized **Node.js** or **Bun** backend folder structure. It generates essential directories and copies configuration boilerplates so you can focus on writing code instead of setting up the skeleton.

## ✨ Features

- 🚀 **Zero Config by Default** – Run `psg` and you're ready to go.
- 📁 **Predefined Structure:** Automatically creates `src/` with subfolders like `config`, `controllers`, `models`, `middlewares`, etc.
- 📄 **Boilerplate Files:** Copies template files from the built-in library.
- 🔒 **Safety First** – Refuses to run in a non-empty directory unless `--force` is provided.
- 💬 **Interactive Confirmation** – Asks for explicit user consent before making any changes.

## 📦 Installation

```bash
$ npm i -g @nhankyjangchan/project-structure-generator
```

## 🛠️ Usage

Navigate to your project folder and run the command:

```bash
psg [flags]
```

The CLI will check if the directory is empty, display a confirmation prompt, and then generate the structure.

## ⚙️ Options

| Flag         | Description                                                                                               |
| :----------- | :-------------------------------------------------------------------------------------------------------- |
| `--ts`       | Copies `tsconfig.json` **instead of** `jsconfig.json` (mutually exclusive).                               |
| `--prettier` | Copies `.prettierignore` and `.prettierrc.json` configuration files.                                      |
| `--force`    | Ignores the "empty directory" check and forces the creation of folders/files (overwrites existing files). |
| `--h`        | Displays help format.                                                                                     |

## 📋 Examples

### Basic JavaScript Project (Default)

```bash
mkdir my-cool-api
cd my-cool-api
psg
```

**Result:** Creates `jsconfig.json` and all default directories.

### TypeScript Project with Prettier

```bash
mkdir my-ts-api
cd my-ts-api
psg --ts --prettier
```

**Result:** Creates `tsconfig.json` (skips `jsconfig.json`), adds Prettier configs, and creates the standard folder structure.

### Override Non-Empty Directory

```bash
psg --force
```

**Result:** Copies all applicable files and creates directories, potentially overwriting existing files with the same names.

## 📂 Generated Structure

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
