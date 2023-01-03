<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/JackHumphries9/jwter">
    <img src="./jwter_logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">jwter</h3>

  <p align="center">
    A command line tool to decode, sign and verify JWTs.
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

-   [About the Project](#about-the-project)
-   [Built With](#built-with)
-   [Getting Started](#getting-started)
-   [Usage](#usage)
-   [Releases](#releases)
-   [Roadmap](#roadmap)
-   [Contributing](#contributing)
-   [License](#license)
-   [Contact](#contact)

<!-- ABOUT THE PROJECT -->

## About The Project

![JWTLogo](https://jwt.io/img/badge-compatible.svg)

I created this tool to help me learn more about JWTs and to make it easier to decode, sign and verify JWTs. I also wanted to create a tool that I could use in my day to day work.

(Icon by [GOWI](https://www.flaticon.com/free-icons/utility))

### Built With

-   [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
-   [Commander.js](https://github.com/tj/commander.js)
-   [Chalk](https://github.com/chalk/chalk)
-   [Typescript](https://github.com/microsoft/TypeScript)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

Install the package globally with:

```sh
npm i -g jwter
```

Then run the command to generate a secret:

```sh
jwter sign top_secret '{"name": "Jack"}'
```

## Usage

There are many subcommands which can be used to decode, sign and verify JWTs.

### Decode

To decode a JWT, use the `decode` command:

```sh
jwter decode <token>
```

It will then output the decoded JWT in the following format:

```sh
* Header:
{
  "alg": "HS256",
  "typ": "JWT"
}
* Payload:
{
    "test": "test",
    "iat": 1672777260
}
```

### Sign

To sign a JWT, use the `sign` command:

```sh
jwter sign <secret> <data>
```

The secret should be a string and the data should be a JSON string.

There are many options that can be used with the `sign` command:

-   `-a` or `--algorithm` - The algorithm to use to sign the JWT. Defaults to `HS256`.
-   `-e` or `--expiresIn` - The time in seconds until the token expires.
-   `-s` or `--sub` - The subject of the token.
-   `-i` or `--iss` - The issuer of the token.
-   `-aud` or `--audience` - The audience of the token.

Each one will be added to the payload of the JWT.

### Verify

To verify a JWT, use the `verify` command:

```sh
jwter verify <secret> <token>
```

The secret should be a string and the data should be a JSON string.

There are many options that can be used with the `verify` command. These options will be used to verify the JWT:

-   `-d` or `--decode` - Decodes the JWT after verifying it.
-   `-ie` or `--ignore-exp` - Ignores the expiry of the JWT.
-   `-s` or `--sub` - The subject of the token.
-   `-i` or `--iss` - The issuer of the token.
-   `-a` or `--audience` - The audience of the token.

For more help type:

```sh
jwter --help
```

## Releases

See the [releases](https://github.com/JackHumphries9/jwter/releases/) page for all releases and to download the binaries.

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/JackHumphries9/jwter/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the GNU General Public License v3.0 License. See `LICENSE` for more information.

## Contact

Jack Humphries - me@jackhumphries.io

Project Link: [https://github.com/JackHumphries9/jwter](https://github.com/JackHumphries9/jwter)
