#!/usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';
import { simpleGit } from 'simple-git';
import inquirer from 'inquirer';

program
    .version('1.0.0')
    .description('Command line interface for Do-It');

program
    .command('greet <name>')
    .description('Write a greeting to the console')
    .action((name) => {
        //make colour of text green in console output
        console.log(chalk.green.bold(`Hello ${name}`));
    }
);

program
    .command('acp <files...>')
    .description('Used to do git add files and commit and push')
    .action(async(files) => {
        try{
            const git = simpleGit();

            for (const file of files) {
               const test = await git.add(file);
            }

            const commitPrompt = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'message',
                    message: 'Enter commit message: '
                }
            ]);

            const message = commitPrompt.message;
            const test3= await git.commit(message);
            console.log(test3.summary);

            const test2 = await git.push();

            if(test2.pushed.length === 0){
            console.log(chalk.greenBright.bold('Files added, commited and pushed'));
            }else{
                console.log(chalk.green('Files are already up to date'));
            }
        }
        catch(err){
            console.log(chalk.red.bold('Enter a valid file name'));
            return;
        }
    }
);

program.parse(process.argv);
