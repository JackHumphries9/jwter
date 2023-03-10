#! /usr/bin/env node

import { Command } from "commander";
import { handleCommandError } from "./errors/handleCommandError.js";
import { jwtDecode } from "./jwtDecode.js";
import { jwtSign } from "./jwtSign.js";
import { jwtVerify } from "./jwtVerify.js";
import { error, warn } from "./utils.js";
import { PKG_DESCRIPTION, PKG_VERSION } from "./version.js";

const program = new Command();

const JWT_ALGORITHMS = [
	"HS256",
	"HS384",
	"HS512",
	"RS256",
	"RS384",
	"RS512",
	"ES256",
	"ES384",
	"ES512",
	"PS256",
	"PS384",
	"PS512",
	"none",
];

program.version(PKG_VERSION).description(PKG_DESCRIPTION);

program
	.command("decode")
	.description("Decode a JWT")
	.argument("<token>", "The JWT to decode")
	// .option(
	// 	"-p, --pretty",
	// 	"Pretty print the decoded token (useful to disable if your piping to a file)",
	// 	true
	// )
	.action((token, options) => {
		try {
			if (!token) {
				error("No token provided!");
			}

			jwtDecode(token, options);
		} catch (e) {
			handleCommandError(e);
		}
	});

program
	.command("sign")
	.description("Create a JWT and sign it with a secret!")
	.argument("<secret>", "The secret to sign the data with")
	.argument("[data]", "The payload for the token")

	.option(
		"-d, --data <data>",
		"The data to add to the payload (must be as JSON)"
	)
	.option("-s, --sub <sub>", "The subject of the token")
	.option("-e, --exp <exp>", "The expiration of the token")
	.option("-i, --iss <iss>", "The issuer of the token")
	.option("-a, --aud <aud>", "The audience of the token")
	.option("-db, --debug", "Debug mode", false)
	.option(
		"-al, --algorithm <algorithm>",
		"The algorithm to use",
		JWT_ALGORITHMS[0]
	)
	.action((secret, data, options) => {
		try {
			// console.log("secret", secret);
			// console.log("data", data);
			// console.log("options", options);

			if (!secret) {
				error("No secret provided!");
			}

			if (
				options.algorithm &&
				!JWT_ALGORITHMS.includes(options.algorithm)
			) {
				error(
					`Invalid algorithm provided! Must be one of: ${JWT_ALGORITHMS.join(
						", "
					)}`
				);
			}

			if (options.algorithm === "none") {
				warn("We don't recommend using the 'none' algorithm!");
			}

			jwtSign(secret, data, options);
		} catch (e) {
			handleCommandError(e, options.debug);
		}
	});

program
	.command("verify")
	.description("Checks a JWT against a secret")
	.argument("<secret>", "The secret to sign the data with")
	.argument("<token>", "The payload for the token")

	.option("-d, --decode", "Decode the token as well", false)
	.option("-ie --ignore-exp", "Ignore the expiration of the token", false)
	.option("-s, --sub <sub>", "Check the subject of the token")
	.option("-i, --iss <iss>", "Check the issuer of the token")
	.option("-a, --aud <aud>", "Check the audience of the token")

	.action((secret, token, options) => {
		try {
			if (!secret) {
				error("No secret provided!");
			}
			if (!token) {
				error("No token provided!");
			}

			jwtVerify(secret, token, options);
		} catch (e) {
			handleCommandError(e, options.debug);
		}
	});

program.parse(process.argv);
