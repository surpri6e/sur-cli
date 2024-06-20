#!/usr/bin/env node

import { Command } from 'commander';
import { all } from './commands/All';
import { create } from './commands/Create';
import { system } from './commands/System';
import { spam } from './commands/Spam';

export const commander = new Command();

commander.version('1.0.0').description('CLI for typescript node.js projects.');

all();
create();
system();
spam();

commander.parse(process.argv);
