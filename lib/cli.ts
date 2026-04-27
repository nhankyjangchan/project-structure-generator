import { resolve, basename } from 'node:path';
import {
    readdir,
    readFile,
    writeFile,
    truncate,
    mkdir,
    copyFile,
    unlink,
    constants as c
} from 'node:fs/promises';

type Preset = { dirs: string[]; templates: Template[] };
type Template = { src: string; dest: string };

class CLI {
    readonly #currentDir: string = process.cwd();
    readonly #rawFlags: string[] = process.argv.slice(2);
    readonly #flags: Set<string> = new Set(this.rawFlags);
    readonly #configDir: string = resolve(import.meta.dirname, '..', 'lib', 'config');
    readonly #message: string = 'Invalid format. Run `psg --h`\n';

    readonly #presetDir: string;
    readonly #dirlistFile: string;
    readonly #templatesDir: string;

    public constructor() {
        const preset: boolean = this.hasFlag('--use-custom') || this.hasFlag('--config');
        this.#presetDir = resolve(this.#configDir, preset ? 'custom' : 'base');
        this.#dirlistFile = resolve(this.#presetDir, 'dirlist.txt');
        this.#templatesDir = resolve(this.#presetDir, 'templates');
    }

    public hasFlag(flag: string): boolean {
        return this.#flags.has(flag);
    }

    public get currentDir(): string {
        return this.#currentDir;
    }

    public get rawFlags(): string[] {
        return this.#rawFlags;
    }

    public async modifyCustomDirlist(listOfDirs?: string): Promise<void> {
        if (!listOfDirs)
            throw new Error(this.#message);
        await mkdir(this.#presetDir, { recursive: true });
        await writeFile(this.#dirlistFile, listOfDirs, { flag: 'a' });
    }

    public async clearCustomDirlist(): Promise<void> {
        await truncate(this.#dirlistFile);
    }

    public async appendCustomTemplate(templatePath?: string): Promise<void> {
        if (!templatePath)
            throw new Error(this.#message);
        const newTemplate: string = resolve(this.#templatesDir, basename(templatePath)) + '.txt';
        await mkdir(this.#templatesDir, { recursive: true });
        await copyFile(templatePath, newTemplate, this.isForce() ? 0 : c.COPYFILE_EXCL);
    }

    public isForce(): boolean {
        return this.hasFlag('--force');
    }

    public async loadCustomTemplate(templateName?: string): Promise<void> {
        if (!templateName)
            throw new Error(this.#message);
        const templatePath: string = resolve(this.#templatesDir, templateName) + '.txt';
        const customTemplate: string = resolve(this.#currentDir, basename(templateName));
        await copyFile(templatePath, customTemplate, this.isForce() ? 0 : c.COPYFILE_EXCL);
    }

    public async deleteCustomTemplate(templateName?: string): Promise<void> {
        if (!templateName)
            throw new Error(this.#message);
        const templatePath: string = resolve(this.#templatesDir, templateName) + '.txt';
        await unlink(templatePath);
    }

    public async generatePreset(): Promise<Preset> {
        const dirlist: string = await readFile(this.#dirlistFile, 'utf-8');
        const dirs: string[] = dirlist
            .trim()
            .split(',')
            .map((d: string): string => d.trim())
            .filter((d: string): boolean => d.length > 0);

        const rawTemplates: string[] = await readdir(this.#templatesDir);
        const templates: Template[] = rawTemplates.map((f: string): Template => {
            return {
                src: resolve(this.#templatesDir, f),
                dest: resolve(this.#currentDir, basename(f, '.txt'))
            };
        });

        return { dirs, templates };
    }

    public nextArgv(prevFlag: string): number {
        const idx: number = this.#rawFlags.indexOf(prevFlag);
        if (idx === -1 || idx === this.#rawFlags.length - 1)
            return this.#rawFlags.length + 1;
        return idx + 1;
    }

    public identifyFileType(file: string, key: string): boolean {
        return file.includes(key);
    }

    public async isCurrentDirEmpty(): Promise<void> {
        const files: string[] = await readdir(this.#currentDir);
        if (files.length !== 0 && !this.isForce())
            throw new Error(
                `Current dir: [${this.#currentDir}] is not empty! Use '--force' flag\n`
            );
    }

    public showFormat(): void {
        console.log(`
            Format:\n
            psg [--use-custom [--template <name>]] [--ts] [--prettier] [--force]\n
            psg --config [--modify-dirlist <listOfDirs>] [--clear-dirlist] [--append-template <path>] [--delete-template <name>] [--force]\n
            `);
        process.exit(0);
    }
}

export { type Preset, CLI };
