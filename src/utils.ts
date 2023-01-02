import chalk from "chalk";

export const warn = (message: string) => {
	console.log(chalk.yellow("Warning: ") + message);
};

export const error = (message: string) => {
	console.log(chalk.red("Error: ") + message);
	process.exit(1);
};
