# Chat with DynamoDB

<!-- logo -->
<p align="center">
    <img
        alt="logo"
        src="./documents/resources/chat.svg"
        width="400"
    />
</p>

<!-- table of contents -->

-   [Description](#Description)
    -   [Built With](#Built-With)
-   [Installation](#Installation)
-   [Usage](#usage)
-   [Testing](#Testing)

## Description

This is a **chat** service that is building on socket.io. DynamoDb used to permanently store messages.

### Built With

| Part           |  Technology  |
| -------------- | :----------: |
| Server         |  ExpressJS   |
| JavaScript     |     ES6      |
| Authentication | JsonWebToken |
| Database       |   DynamoDB   |

## Installation

Clone the code from this repository.

```sh
$ git clone https://github.com/AnAsianGangster/chat.git
```

## Usage

Start the server in `development` environment

```sh
$ npm start:dev
```

Start the server in `production` environment

```sh
$ npm start:prod
```

## Testing

Run all tests

```sh
$ npm test:all
```
