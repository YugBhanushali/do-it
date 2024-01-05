#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import { simpleGit } from "simple-git";
import inquirer from "inquirer";

program.version("1.1.0").description("Command line interface for Do-It");

program
  .command("greet <name>")
  .description("Write a greeting to the console")
  .action((name) => {
    console.log(chalk.green.bold(`Hello ${name}`));
  });

program
  .command("acp <files...>")
  .description("Used to do git add files and commit and push")
  .action(async (files) => {
    try {
      const git = simpleGit();

      // Get the current branch
      const currentBranch = await git.branch();
      console.log(chalk.blue(`Current branch: ${currentBranch.current}`));

      for (const file of files) {
        await git.add(file);
      }

      const commitPrompt = await inquirer.prompt([
        {
          type: "input",
          name: "message",
          message: "Enter commit message: ",
        },
      ]);

      const message = commitPrompt.message;
      const commitResult = await git.commit(message);

      console.log(chalk.green.bold("Commit Summary:"));
      // Extract and format commit summary information

      if (commitResult) {
        const { changes, insertions, deletions } = commitResult.summary;
        console.log(
          `${changes} files changed, ${insertions} insertions(+), ${deletions} deletions(-)`
        );
      } else {
        console.log(
          chalk.yellow("Unable to extract commit summary information.")
        );
      }

      // Confirm whether to push to the current branch
      const pushConfirmation = await inquirer.prompt([
        {
          type: "confirm",
          name: "push",
          message: `Are you sure you want to push changes to branch:(${currentBranch.current})?`,
          default: true,
        },
      ]);

      if (pushConfirmation.push) {
        const pushResult = await git.push("origin", currentBranch.current);

        if (pushResult.pushed.length === 0) {
          console.log(
            chalk.greenBright.bold(
              `Congratulations Files added, committed, and pushed to ${currentBranch.current} successfully 🎉 🎉 🎉.`
            )
          );
        } else {
          console.log(chalk.green("Files are already up to date"));
        }
      } else {
        console.log(
          chalk.yellow(
            'Changes are not pushed. Use "git push" later to push the changes.'
          )
        );
      }
    } catch (err) {
      console.log(chalk.red.bold("Oops error occured\n"));
      console.log(chalk.red.bold(err));
      return;
    }
  });

program.parse(process.argv);
