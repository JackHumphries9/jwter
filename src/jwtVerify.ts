import chalk from "chalk";
import jsonwebtoken from "jsonwebtoken";
import { jwtDecode } from "./jwtDecode.js";
import { error } from "./utils.js";

export interface VerifyOptions {
	ignoreExp?: boolean;
	decode?: boolean;
	sub?: string;
	exp?: string;
	iss?: string;
	aud?: string;
}

const mappedOptions: { [key: string]: string } = {
	ignoreExp: "ignoreExpiration",
	sub: "subject",
	exp: "expiresIn",
	iss: "issuer",
	aud: "audience",
};

export const jwtVerify = (
	secret: string,
	token: string,
	options?: VerifyOptions
) => {
	try {
		let op: jsonwebtoken.VerifyOptions = {};

		if (options) {
			Object.keys(options).forEach((k: string) => {
				if (mappedOptions[k]) {
					// @ts-ignore
					op = { ...op, [mappedOptions[k]]: options[k] };
				}
			});
		}

		const verifiedToken = jsonwebtoken.verify(token, secret, op);

		if (verifiedToken) {
			console.log(chalk.green("Your token is valid!"));
			if (options?.ignoreExp) {
				console.log(
					chalk.yellow(
						"Tip: You are ignoring the expiration of the token."
					)
				);
			}

			if (options?.decode) {
				jwtDecode(token);
			}

			process.exit(0);
		} else {
			console.log(chalk.red("Your token is invalid!"));
			process.exit(1);
		}
	} catch (e) {
		if (e instanceof jsonwebtoken.JsonWebTokenError) {
			if (e.message === "invalid signature") {
				console.log(
					chalk.red("The secret provided doesn't match the token!")
				);
				process.exit(1);
			}
			if (e.message === "jwt expired") {
				console.log(chalk.red("The token provided has expired!"));
				console.log(
					chalk.yellow("Tip: Use --ignore-exp to ignore this error.")
				);
				process.exit(1);
			}

			if (e.message.includes("jwt audience invalid")) {
				console.log(
					chalk.red("The token provided has an invalid audience!")
				);
				process.exit(1);
			}

			if (e.message.includes("jwt subject invalid")) {
				console.log(
					chalk.red(`The token provided has an invalid subject!`)
				);
				process.exit(1);
			}

			if (e.message.includes("jwt issuer invalid")) {
				console.log(
					chalk.red("The token provided has an invalid issuer!")
				);
				process.exit(1);
			}

			if (e.message.includes("jwt malformed")) {
				console.log(chalk.red("The token provided is malformed!"));
				process.exit(1);
			}

			error(e.message);
		}
	}
};
