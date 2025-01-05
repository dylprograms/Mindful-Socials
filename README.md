# Mindful-Socials


## Description

This project is a social network API designed for a social media startup. It uses a NoSQL database (MongoDB) to handle large amounts of unstructured data efficiently. The API is built with Node.js, Express, TypeScript, and Mongoose, providing routes for users, thoughts, reactions, and friend lists.

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Contribution](#contribution)
* [Tests](#tests)
* [License](#license)
* [Questions](#questions)

## Installation

[GitHub Repo](https://github.com/dylprograms/Mindful-Socials)

Ensure you have Node.js and npm installed on your system. Then, run the following command to install dependencies:

npm install


## Usage

To start the server and sync Mongoose models to the MongoDB database, run:


npm run start


### API Testing Instructions:
- Use Insomnia or Postman to test API routes.
- **GET Routes:** `/api/users`, `/api/thoughts` - Fetches all users and thoughts in formatted JSON.
- **POST, PUT, DELETE Routes:** Allows creating, updating, and deleting users and thoughts.
- **Reactions and Friend Management:**
  - POST and DELETE reactions to thoughts
  - Add and remove friends from a user's friend list

## Contribution

Contributions to improve usability and performance are welcome. Please submit a pull request with your suggestions.

## Tests

To test the API functionality, run the server and use Insomnia or Postman to make requests to the available routes.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Questions

If you have any questions or want to contribute, you can reach me at:
- GitHub: [dylyoungprograms](https://github.com/dylprograms/README-Creator)
- Email: dlyoungworking@gmail.com

