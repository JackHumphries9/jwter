import chalk from "chalk";
import jsonwebtoken from "jsonwebtoken";

export interface DecodeOptions {
	pretty: boolean;
}

const defaultOptions: DecodeOptions = {
	pretty: true,
};

export const jwtDecode = (token: string, options?: DecodeOptions) => {
	const decoded = jsonwebtoken.decode(token);
	if (!decoded) {
		throw new Error("Invalid token provided!");
	}

	let jwt = decoded as jsonwebtoken.JwtPayload;

	if (typeof decoded === "string") {
		jwt = JSON.parse(decoded);
	}

	console.log(chalk.green("Your Decoded JWT:") + "\n");

	const header = JSON.parse(
		Buffer.from(token.split(".")[0] + "==", "base64url").toString()
	);

	console.log(chalk.blue("* Header:"));
	console.log(JSON.stringify(header, null, 2));
	console.log(chalk.magenta("* Payload:"));
	console.log(JSON.stringify(jwt, null, 4));
};
