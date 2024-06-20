import chalk from 'chalk';
import { commander } from '..';
import fs from 'node:fs/promises';
import path from 'node:path';

export const create = () => {
    commander
        .command('create <type> <name>')
        .option('--extension <value>', 'file extension')
        .description('create new needed file')
        .action(async (type, name, cmd) => {
            let extensionIsExist = true;
            let isValidType = true;

            if (type !== 'class' && type !== 'function') {
                isValidType = false;
                console.log(chalk.red('Invalid type'));
            }

            if (!cmd.extension && !['js', 'ts'].includes(cmd.extension)) {
                extensionIsExist = false;
                console.log(chalk.red('Invalid extension'));
            }

            const nameWithExtension = extensionIsExist ? `${name}.${cmd.extension}` : `${name}.ts`;

            try {
                if (isValidType) {
                    fs.writeFile(path.join(process.cwd(), nameWithExtension), '')
                        .then(() => {
                            if (type === 'class') {
                                fs.appendFile(path.join(process.cwd(), nameWithExtension), `export default class ${name} {\n}`)
                                    .then(() => console.log(chalk.green('Successful')))
                                    .catch(() => {
                                        throw new Error('Can not write file | CLASS');
                                    });
                            }

                            if (type === 'function') {
                                fs.appendFile(path.join(process.cwd(), nameWithExtension), `export const ${name} = () => {\n}`)
                                    .then(() => console.log(chalk.green('Successful')))
                                    .catch(() => {
                                        throw new Error('Can not write file | FUNCTION');
                                    });
                            }
                        })
                        .catch(() => {
                            throw new Error('Can not create file');
                        });
                }
            } catch (error: unknown) {
                if (typeof error === 'string') {
                    console.log(chalk.red(error));
                }
            }
        });
};
