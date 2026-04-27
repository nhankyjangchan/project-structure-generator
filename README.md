# @nhankyjangchan/project-structure-generator

[![npm version](https://img.shields.io/npm/v/%40nhankyjangchan%2Fproject-structure-generator?style=for-the-badge&logo=npm&color=blue)](https://www.npmjs.com/package/@nhankyjangchan/project-structure-generator)
[![github repo](https://img.shields.io/badge/github-repo-blue?logo=github&style=for-the-badge)](https://github.com/nhankyjangchan/project-structure-generator)
[![node version](https://img.shields.io/badge/node.js-%3E%3Dv20-yellow?logo=nodedotjs&style=for-the-badge)](https://nodejs.org/en/download)
[![npm downloads](https://img.shields.io/npm/dm/%40nhankyjangchan%2Fproject-structure-generator?style=for-the-badge&color=lightgreen)](https://www.npmjs.com/package/@nhankyjangchan/project-structure-generator)
[![unpacked Size](https://img.shields.io/npm/unpacked-size/%40nhankyjangchan%2Fproject-structure-generator?style=for-the-badge&color=lightgreen)](https://www.npmjs.com/package/@nhankyjangchan/project-structure-generator)
[![last update](https://img.shields.io/npm/last-update/%40nhankyjangchan%2Fproject-structure-generator?style=for-the-badge&color=lightgreen)](https://www.npmjs.com/package/@nhankyjangchan/project-structure-generator)
[![license](https://img.shields.io/npm/l/%40nhankyjangchan%2Fproject-structure-generator?style=for-the-badge&color=orange)](https://github.com/nhankyjangchan/project-structure-generator/blob/main/LICENSE)

Minimal and flexible CLI tool to scaffold a standardized **Node.js** or **Bun** backend folder structure. It generates essential directories and copies configuration boilerplates so you can focus on writing code instead of setting up the skeleton.

## ✨ Features

- **Zero Config by Default** – Run `psg` and you're ready to go.
- **Predefined Structure** – Automatically creates `src/` with subfolders like `config`, `controllers`, `models`, `middlewares`, etc.
- **Boilerplate Files** – Copies template files from the built-in library.
- **Custom Presets** – Create and manage your own directory lists and templates.
- **Single Template Loading** – Pull individual templates from your custom preset on demand.
- **Safety First** – Refuses to run in a non-empty directory unless `--force` is provided.
- **Interactive Confirmation** – Asks for explicit user consent before making any changes.

## 📦 Installation

```bash
npm i -g @nhankyjangchan/project-structure-generator
```

## 🛠️ Usage

Navigate to your project folder and run the command:

```bash
psg [flags]
```

The CLI will check if the directory is empty, display a confirmation prompt, and then generate the structure.

## ⚙️ Options

### Scaffold Flags

| Flag           | Description                                                                                               |
| :------------- | :-------------------------------------------------------------------------------------------------------- |
| `--ts`         | Copies `tsconfig.json` **instead of** `jsconfig.json` (mutually exclusive).                               |
| `--prettier`   | Copies `.prettierignore` and `.prettierrc.json` configuration files.                                      |
| `--use-custom` | Uses your custom preset (directories + templates) instead of the default one.                             |
| `--template`   | Loads a single template file from the custom preset by name. Requires `--use-custom`.                     |
| `--force`      | Ignores the "empty directory" check and forces the creation of folders/files (overwrites existing files). |
| `--h`          | Displays help format.                                                                                     |

### Config Management Flags

| Flag                | Description                                                           |
| :------------------ | :-------------------------------------------------------------------- |
| `--config`          | Enters config mode for managing custom presets.                       |
| `--modify-dirlist`  | Appends comma-separated directory names to your custom `dirlist.txt`. |
| `--clear-dirlist`   | Clears all entries from your custom `dirlist.txt`.                    |
| `--append-template` | Adds a new template file to your custom preset from a given path.     |
| `--delete-template` | Removes a template file from your custom preset by name.              |

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

### Use Custom Preset

```bash
psg --use-custom
```

**Result:** Generates the project using your custom `dirlist.txt` and `templates/` instead of the built-in defaults.

### Load a Single Custom Template

```bash
psg --use-custom --template .env.production
```

**Result:** Creates the custom directory structure, copies only `.env.production.txt` (without `.txt` extension) from your custom templates, and skips all other template files.

### Manage Custom Preset

```bash
# Add directories to your custom preset
psg --config --modify-dirlist "src/routes,src/services,src/validators"

# Add a template file
psg --config --append-template /path/to/my-config.json

# Remove a template
psg --config --delete-template old-config.json

# Reset your dirlist
psg --config --clear-dirlist
```

## 📂 Generated Structure

After running the command, your project root will look like this:

```
.
├── .env.development    # Environment variables template
├── .gitignore          # Node.js specific ignore rules
├── .prettierignore     # Prettier ignore rules (with --prettier)
├── .prettierrc.json    # Basic formatting config (with --prettier)
├── jsconfig.json       # JavaScript configuration (default)
├── package.json        # Package manifest
├── tsconfig.json       # TypeScript configuration (with --ts)
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

## 📂 Custom Presets

Custom presets are stored alongside the package in the `config/custom/` directory:

```
config/
├── base/               # Built-in default preset (shipped with package)
│   ├── dirlist.txt
│   └── templates/
└── custom/             # Your personal preset (created on demand)
    ├── dirlist.txt
    └── templates/
```

- **`dirlist.txt`** — comma-separated list of directories to create (e.g. `src/routes,src/services`).
- **`templates/`** — any `.txt` files placed here will be copied to the project root with the `.txt` extension stripped (e.g. `Dockerfile.txt` → `Dockerfile`).

## Releases

[CHANGELOG](./CHANGELOG.md)

## License

[MIT](./LICENSE)
