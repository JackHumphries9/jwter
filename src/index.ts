import chalk from "chalk";
import { Command } from "commander";
import { error } from "./utils";

const program = new Command();



program
	.version("1.0.0")
	.description("A CLI for decoding, verifying and signing JWTs!");

program
	.command("decode")
	.description("Decode a JWT")
	.argument("<token>")
	.action(async (token, options) => {
        try {
            if (!token) {
                error("No token provided!");
            }
    
            jwtDecode(token);

        }
	});

program.parse(process.argv);
