import chalk from 'chalk';
import { commander } from '..';
import os from 'node:os';

export const system = () => {
    commander
        .command('system')
        .description('show a lot of information about your computer')
        .action(() => {
            console.log(chalk.cyan('Computer information: \n'));

            let prettyCounter = 1;

            console.log(`${prettyCounter++})`, chalk.grey('Operating system CPU architecture:'), chalk.green(os.arch()));
            console.log(`${prettyCounter++})`, chalk.grey('CPU model:'), chalk.green(os.cpus()[0].model));
            console.log(`${prettyCounter++})`, chalk.grey('CPU amount:'), chalk.green(os.cpus().length));
            console.log(`${prettyCounter++})`, chalk.grey('Name of computer:'), chalk.green(os.hostname));
            console.log(`${prettyCounter++})`, chalk.grey('Type of operating system:'), chalk.green(os.type));
        });
};
