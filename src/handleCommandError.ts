import chalk from "chalk";
import { error } from "./utils";

export const handleCommandError = (e: any) => {
	if (e instanceof Error && e.message) {
		error(e.message);
	}

	error(
		"An error occurred, please check your command arguments or type `" +
			chalk.italic("jwter -h") +
			"` for help."
	);
};
