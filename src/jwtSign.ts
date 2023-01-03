import chalk from "chalk";
import jsonwebtoken from "jsonwebtoken";
import { error } from "./utils.js";

export interface SignOptions {
	//property: string[]
	data?: any;
	sub?: string;
	exp?: string;
	iss?: string;
	aud?: string;
}

const mappedOptions: { [key: string]: string } = {
	sub: "subject",
	exp: "expiresIn",
	iss: "issuer",
	aud: "audience",
	algorithm: "algorithm",
};

const defaultOptions: SignOptions = {};

export const jwtSign = (
	secret: string,
	data: any | undefined,
	options: SignOptions
) => {
	let d = data || options.data || {};

	try {
		d = JSON.parse(d);
	} catch (e) {
		error("Unable to parse JSON data!");
	}

	let op: jsonwebtoken.SignOptions = {};

	if (options) {
		Object.keys(options).forEach((k: string) => {
			if (mappedOptions[k]) {
				// @ts-ignore
				op = { ...op, [mappedOptions[k]]: options[k] };
			}
		});
	}

	const token = jsonwebtoken.sign(d, secret, op);

	if (!token) {
		throw new Error("Unable to generate token!");
	}

	console.log(chalk.yellow("* Token:"));
	console.log(token);

	process.exit(0);
};
