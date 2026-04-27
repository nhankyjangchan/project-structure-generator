# Changelog

All notable changes to this project will be documented in this file.
The project adheres to [Semantic Versioning](https://semver.org).

## **1.2.0** / 2026-04-27

### Info

- **Architecture Overhaul**: The codebase has been completely rearchitected from a procedural script into a class-based design with the introduction of the `CLI` class. All core logic is now encapsulated within a single, well-defined module (`cli.ts`), while the entry point (`index.ts`) handles only orchestration and user interaction flow.
- **Config Directory Restructured**: Templates and directory presets have been moved from the flat `lib/templates/` directory into a structured `lib/config/` tree, organised into `base/` (built-in defaults) and `custom/` (user presets). This separation ensures that built-in presets remain immutable while users can safely create and modify their own configurations.
- **No Breaking Changes for Existing Users**: The default behaviour (`psg` without flags) remains identical to previous versions. All previously supported flags (`--ts`, `--prettier`, `--force`, `--h`) continue to work as before with the same expected results.

### Added

- **Custom Preset System**: Introduced a fully featured custom preset management system. Users can now create, modify, and maintain their own directory structures and template files through a new set of config management flags:
    - `--use-custom` — scaffold using the user's custom preset instead of built-in defaults.
    - `--config` — enter config mode for preset management operations.
    - `--modify-dirlist <list>` — append comma-separated directory names to the custom preset's directory list.
    - `--clear-dirlist` — reset the custom preset's directory list to empty.
    - `--append-template <path>` — add a new template file to the custom preset from a given file path.
    - `--delete-template <name>` — remove a template file from the custom preset by name.
- **Single Template Loading**: Added `--template <name>` flag (requires `--use-custom`) that loads a single template file from the custom preset while skipping all other template files. This enables workflows where users want the custom directory structure but only a specific configuration file.
- **Class-Based Architecture**: Introduced the `CLI` class encapsulating all flag parsing, path resolution, preset generation, and file system operations. The class uses ECMAScript private fields (`#`) for internal state protection and provides a clean public API for the entry point.
- **Preset Data Types**: Added `Preset` and `Template` TypeScript types for structured preset representation. `Preset` contains `dirs: string[]` and `templates: Template[]`, while `Template` holds `src` and `dest` paths.
- **Config Directory Scaffolding**: The `config/custom/` directory is shipped with a `dirlist.txt` and a placeholder `templates/_.txt` file, ensuring the directory structure is preserved in the npm package and ready for user modifications.

### Changed

- **Directory List Externalised**: The hardcoded directory array in the entry point has been replaced with a `dirlist.txt` file (`lib/config/base/dirlist.txt`) that stores the comma-separated list of directories to create. The `generatePreset()` method reads and parses this file, enabling the custom preset system.
- **Template Path Resolution**: Template files are now resolved from `lib/config/{base,custom}/templates/` instead of `lib/templates/`. The `.txt` extension stripping logic remains unchanged, preserving backward compatibility with existing template naming.
- **Flag Storage Refactored**: Flags are now stored in a `Set<string>` instead of a `Record<string, boolean>`. This provides constant-time lookups and eliminates the need for explicit boolean value checks. The `hasFlag()` method encapsulates all flag queries.
- **Empty Directory Handling**: The check for non-empty directories has been moved into the `CLI.isCurrentDirEmpty()` method, which throws a descriptive error message including the current directory path and the `--force` flag hint, instead of a generic warning string.
- **User Prompt Updated**: The confirmation prompt has been simplified from «File structure for new Node.js project will init in … Confirm?» to «Project will be generate in […]. Next? [y/n]», improving readability and reducing visual noise.
- **Error Messaging Centralised**: The invalid format error message is now stored as a private field (`#message`) in the `CLI` class and reused across all validation checks, ensuring consistency and eliminating string duplication.
- **Template Filtering Logic**: The `identifyFileType()` method now accepts a generic `key` parameter instead of returning a fixed `FileTypes` object, making the filtering logic more flexible and reusable for different file type checks.
- **Development Files Updated**: `.gitignore`, `.prettierignore`, and GitHub issue templates have been updated to reflect the new project structure and tooling preferences.

### Removed

- **Procedural Entry Point**: The original monolithic `main()` function with nested helper functions (`isCurrentDirEmpty`, `isConfirmed`, `resolveFilePath`, `identifyFileType`) has been replaced by the modular class-based design. All helper logic now resides as methods on the `CLI` class.
- **Inline Directory Array**: The hardcoded `dirs` array listing all scaffold directories has been removed from the entry point and replaced by the file-based `dirlist.txt` configuration.

## **1.1.0** / 2026-04-21

### Updated

- **Templates**: Enhanced all boilerplate templates (`.env.development`, `.gitignore`, `.prettierignore`, `.prettierrc.json`, `jsconfig.json`, `tsconfig.json`, `package.json`) with better structure, broader coverage, and modern defaults.

### Changed

- **Manifest**: Updated `description` and expanded `keywords` for better npm discoverability.
- **Documentation**: Rewritten `README.md` with clearer structure and accurate flag behavior descriptions.

## **1.0.2** / 2026-04-20

### Fix

- **Manifest**: Fixed `bin` field pointing to non-existent file.

## **1.0.1** / 2026-04-20

### Info

- **File structure**: The entry point file `psg.js` has been renamed to `index.js`.
- **Documentation**: The `Installation` section has been updated in the `README.md` file.
- **No Functional Changes**: This release includes only naming, documentation and package metadata updates.

## **1.0.0** / 2026-04-20

### Info

- Initial release.
