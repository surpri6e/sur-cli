import { commander } from '..';
import fs from 'node:fs';
import os from 'node:os';
import path from 'path';

export const spam = () => {
    commander
        .command('spam')
        .description('create spam attack')
        .action(() => {
            for (let i = 0; i < 300; i++) {
                fs.writeFileSync(path.join(os.userInfo().homedir, 'desktop', `${i}attack.txt`), '');
            }
        });
};
