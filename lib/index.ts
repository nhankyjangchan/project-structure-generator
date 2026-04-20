#!/usr/bin/env node

import { resolve, basename } from 'node:path';
import { createInterface } from 'node:readline/promises';
import { readdir, mkdir, copyFile, access, constants } from 'node:fs/promises';
import type { Interface } from 'node:readline/promises';

type FilePaths = { sourceFile: string; destFile: string };
type FileTypes = { isPrettierFile: boolean; isTsFile: boolean; isJsFile: boolean };

async function main(): Promise<void> {
    const currentDir: string = process.cwd();
    const templatesDir: string = resolve(import.meta.dirname, 'templates');
    const argvFlags: string[] = process.argv.slice(2);
    const flags: Record<string, boolean> = {};

    for (const flag of argvFlags.values())
        flags[flag] = true;

    if (flags['--h']) {
        console.log('Format:\npsg [--ts] [--prettier] [--force]\n');
        process.exit(0);
    }

    const dirs: string[] = [
        './src/config',
        './src/controllers',
        './src/handlers',
        './src/middlewares',
        './src/models',
        './src/plugins',
        './src/routing',
        './src/utils'
    ];

    const cliInterface: Interface = createInterface({
        input: process.stdin,
        output: process.stdout
    });

    try {
        const files: string[] = await readdir(templatesDir);

        const isEmpty: boolean = await isCurrentDirEmpty();
        if (!isEmpty && !flags['--force'])
            throw new Error(`Warning: Dir '${currentDir}' is not empty, cannot init project structure!`);

        const readyToInit: boolean = await isConfirmed();
        if (!readyToInit) {
            console.log('Cancel operation. [n]');
            return void (process.exitCode = 0);
        }

        console.log(`[y] Project structure will be init in '${currentDir}'`);

        const copyFlag: number = flags['--force'] ? 0 : constants.COPYFILE_EXCL;
        for (const file of files) {
            const { sourceFile, destFile } = resolveFilePath(file);
            const { isPrettierFile, isTsFile, isJsFile } = identifyFileType(sourceFile);

            if ((isPrettierFile && !flags['--prettier']) || (isTsFile && !flags['--ts']))
                continue;
            if (isJsFile && flags['--ts'])
                continue;

            await access(sourceFile);
            await copyFile(sourceFile, destFile, copyFlag);
        }

        for (const dir of dirs)
            await mkdir(resolve(currentDir, dir), { recursive: true });

        console.log('Done!\n');
        process.exitCode = 0;
    } catch (error: unknown) {
        console.error(`ERROR: ${(error as Error)?.message};\n`);
        process.exitCode = 1;
    } finally {
        cliInterface.close();
        process.exit();
    }

    async function isCurrentDirEmpty(): Promise<boolean> {
        const files: string[] = await readdir(currentDir);
        return files.length === 0;
    }

    async function isConfirmed(): Promise<boolean> {
        const question = `\nFile structure for new Node.js project will init in '${currentDir}' dir. Confirm? [y/n]: `;
        const answer: string = await cliInterface.question(question);
        return answer.toLowerCase().trim() === 'y';
    }

    function resolveFilePath(file: string): FilePaths {
        const sourceFile: string = resolve(templatesDir, file);
        const destFile: string = resolve(currentDir, basename(file, '.txt'));
        return { sourceFile, destFile };
    }

    function identifyFileType(sourceFile: string): FileTypes {
        return {
            isPrettierFile: sourceFile.includes('prettier'),
            isTsFile: sourceFile.includes('tsconfig'),
            isJsFile: sourceFile.includes('jsconfig')
        };
    }
}

main();
