import chalk from "chalk";
import { Command } from "commander";
import { handleCommandError } from "./errors/handleCommandError.js";
import { jwtDecode } from "./jwtDecode.js";
import { error } from "./utils.js";

const program = new Command();

program
	.version("1.0.0")
	.description("A CLI for decoding, verifying and signing JWTs!");

program
	.command("decode")
	.description("Decode a JWT")
	.argument("<token>")
	.option(
		"-p, --pretty",
		"Pretty print the decoded token (useful to disable if your piping to a file)",
		true
	)
	.action(async (token, options) => {
		try {
			if (!token) {
				error("No token provided!");
			}

			jwtDecode(token);
		} catch (e) {
			handleCommandError(e);
		}
	});

program.parse(process.argv);
