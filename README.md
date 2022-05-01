# EZUP

This is a simple file sharing system. You can upload files and retreive a code. Then, anyone can use the code to download them again.

## How to run.

### Server

- open a terminal and cd into the project directory
- run `npm install` to install all the required dependencies.
- run npm run dev to start the server in development mode

### Client

- open a terminal and cd into the project directory
- run `npm install --prefix client` to install dependencies.
- run `npm start --prefix client`

You can build the production ready JS bundle using `npm run heroku-postbuild`

## Documentation

The Backend is a Node.js Express REST API. The application's entry point is `src/app.ts`. It is connecting to a remote MongoDB cloud instance to store user credentials and the filenames of their uploads.

In `config.ts`, I load different environment variables and export them, so they can be easily referenced in the code.

`upload.ts` is the route where files can get uploaded (using express-fileupload plugin). A zip file is created using the adm-zip package and a unique ID is assigned to it. Then, it is stored in the server's uploads folder.

`download.ts` is a route where a user can specify the id of a file they want to download and the corresponding file gets sent to them.

The users route contains multiple "subroutes":

The createUser endpoint retreives new user credentials. It encrypts the password and generates a JWT token from the data using `generateToken.ts`. Then, the user data is stored on the MongoDB database.

In the login endpoint, the user can send their username and password. I am using the bcrypt library to hash the password and check if it matches the hash stored in the db. Then, I generate a JWT that the user can use for authentication and send it back.

The authenticateToken function is a middleware that checks if the token in the Authorization header is valid. If not, it sends a 403 (Forbidden) HTTP response code.

This functionality is used in `myUploads.ts`. There are two endpoints. If you send a GET request, you get a list of the filenames of all your uploads from the database.

If you send a DELETE request containing a filename, it will look in the DB if the file is uploaded by the user and delete it from the server if true.

We are using the mongoose model in `User.ts` to query the database. It provides a good developer experience because it is designed in an object-oriented way.
