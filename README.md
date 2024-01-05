# Do-It CLI

The Do-It CLI is a command line interface tool designed to simplify common GitHub workflows. With Do-It, you can streamline the process of adding, committing, and pushing changes to your GitHub repository. It provides an easy-to-use interface to perform these tasks in one go.

## Installation

To install the Do-It CLI, use npm:

```bash
npm install -g doo-it
```

## Usage

### ACP Command

The `acp` (Add, Commit, Push) command is a powerful tool for adding files, committing changes, and pushing them to your GitHub repository.

```bash
do-it acp <files...>
```

**Example:**

```bash
do-it acp file1.txt file2.js
```

This command performs the following steps:

1. Adds the specified files to the staging area.
2. Prompts for a commit message.
3. Commits the changes with the provided commit message.
4. Prompts for confirmation to push the changes to the current branch.

If confirmed, the changes are pushed to the origin repository.

Commit All Files
To commit all files, you can use . as a wildcard:

```bash
do-it acp .
```

This will add all files, prompt you for a commit message, and then commit and push the changes.


**Note:** If the push is rejected because the branch is not up to date, you will be informed that files are already up to date.

**Example Output:**

```bash
Current branch: main
Enter commit message: Updated files
Commit Summary:
3 files changed, 42 insertions(+), 8 deletions(-)

Are you sure you want to push changes to branch:(main)? (yes/no) [default=yes]:
```

## Contributing

If you'd like to contribute to the Do-It CLI, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m 'Add feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.