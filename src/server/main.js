import express from "express";
import dotenv from "dotenv";
import ViteExpress from "vite-express";

import HttpError from "./http-error.js";
import usersRoutes from "./routes/users-routes.js";
import { connectMongoDB } from "./db/connection.mjs"

const app = express();
dotenv.config();

app.use(express.json());

// Setting CORS Headers to every response of the server
app.use((req, res, next) => {
  // Security note: need to change before deployment the wildcard sign
	res.setHeader('Access-Control-Allow-Origin', '*'); // * => this is the domain
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
	next();
});
console.log("process.env.API_VERSION: ", process.env.API_VERSION)
app.use(`/api/${process.env.API_VERSION}/users`, usersRoutes);

//handle error
app.use((error, req, res, next) => {
	if (res.headerSent) {
		return next(error);
	}
	res.status(error.code || 500);
	res.json({ message: error.message || "An unknown error occured!" });
});

// default error if route not handled
app.use((error, req, res, next) => {
	throw new HttpError("Could not find this route.", 404);
});

// load mongodb and start server
if (connectMongoDB()) {
  ViteExpress.listen(app, 3000, () =>
    console.log("Server is listening on port 3000..."),
  );
} else {
  console.log("server is not running. Database not loaded.")
}

