import chalk from 'chalk';
import { commander } from '..';
import fs from 'node:fs/promises';
import { formatBytes, formatBytesToBytes } from 'bytes-transform';

export const all = () => {
    commander
        .command('all')
        .description('show all entries in current directory')
        .action(async () => {
            const entries = await fs.readdir(process.cwd());

            let result = ``;
            for (let entry of entries) {
                const stat = await fs.lstat(entry);

                if (stat.isDirectory()) {
                    result += chalk.grey(`Folder: ${entry} `);
                }

                if (stat.isFile()) {
                    result += chalk.grey(`File: ${entry} | `);

                    const sizeInKB = formatBytes(stat.size, { from: 'B', to: 'KB', fixTo: 2 }).amount;

                    if (stat.size <= formatBytesToBytes(10, 'KB')) {
                        result += chalk.green(`${sizeInKB} KB`);
                    } else {
                        result += chalk.red(`${sizeInKB} KB`);
                    }
                }

                result += '\n';
            }

            console.log(chalk.cyan(`All entries: \n\n${result}`));
        });
};
