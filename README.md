# Install Packages

To get the project up and running a simple installcommand will retrieve all of our packages needed.

    npm install

Before you can run the Books API, we also need to globally install `json-server`.

    npm install -g json-server

## Running the Json Server

 This will take the db.json file in our root directory and serve it as if it were a legit endpoint.

    npm run api

## Running Our Application

    npm start

## Run both together with one command

With that in mind, we can run both with one command using:

    npm run start:api
