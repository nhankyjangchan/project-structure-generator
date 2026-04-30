#!/usr/bin/env node

import { createInterface } from 'node:readline/promises';
import { mkdir, copyFile, constants as c } from 'node:fs/promises';
import { CLI } from './cli.js';
import type { Interface } from 'node:readline/promises';
import type { Preset } from './cli.js';

async function main(): Promise<void> {
    const cli: CLI = new CLI();

    if (cli.hasFlag('--h'))
        cli.showFormat();

    const cliInterface: Interface = createInterface({
        input: process.stdin,
        output: process.stdout
    });

    try {
        main: if (cli.hasFlag('--config')) {
            if (cli.hasFlag('--modify-dirlist')) {
                const dataIndex: number = cli.nextArgv('--modify-dirlist');
                await cli.modifyCustomDirlist(cli.rawFlags[dataIndex]);
            }

            if (cli.hasFlag('--clear-dirlist')) {
                await cli.clearCustomDirlist();
            }

            if (cli.hasFlag('--append-template')) {
                const pathIndex: number = cli.nextArgv('--append-template');
                await cli.appendCustomTemplate(cli.rawFlags[pathIndex]);
            }

            if (cli.hasFlag('--delete-template')) {
                const nameIndex: number = cli.nextArgv('--delete-template');
                await cli.deleteCustomTemplate(cli.rawFlags[nameIndex]);
            }
        } else {
            await cli.isCurrentDirEmpty();

            const answer: string = await cliInterface.question(
                `Project will be generate in [${cli.currentDir}]. Next? [y/n]`
            );
            if (answer.toLowerCase() !== 'y')
                return console.log('[n] Cancel operation.\n');

            const preset: Preset = await cli.generatePreset();

            if (cli.hasFlag('--use-custom'))
                if (cli.hasFlag('--template')) {
                    const nameIndex: number = cli.nextArgv('--template');
                    await cli.loadCustomTemplate(cli.rawFlags[nameIndex]);
                    break main;
                }

            for (const file of preset.templates) {
                if (cli.hasFlag('--ts') && cli.identifyFileType(file.src, 'jsconfig'))
                    continue;
                if (!cli.hasFlag('--ts') && cli.identifyFileType(file.src, 'tsconfig'))
                    continue;
                if (!cli.hasFlag('--prettier') && cli.identifyFileType(file.src, 'prettier'))
                    continue;
                await copyFile(file.src, file.dest, cli.isForce() ? 0 : c.COPYFILE_EXCL);
            }

            for (const dir of preset.dirs)
                await mkdir(dir, { recursive: true });
        }

        console.log('Done!\n');
    } catch (error: unknown) {
        console.error(`ERROR: ${(error as Error)?.message};\n`);
        process.exit(1);
    } finally {
        cliInterface.close();
    }
}

main();
