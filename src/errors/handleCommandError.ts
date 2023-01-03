import chalk from "chalk";
import { error } from "../utils.js";

export const handleCommandError = (e: any, debug?: false) => {
	if (e instanceof Error && e.message) {
		if (debug) console.error(e);
		error(e.message);
	}

	error(
		"An error occurred, please check your command arguments or type `" +
			chalk.italic("jwter -h") +
			"` for help."
	);
};
