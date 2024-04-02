import express from 'express';
import HttpError from "./http-error.js";
import usersRoutes from "./routes/users-routes.js";
import config from "./config.js";

export default function createApp() {
    const app = express();

	app.use(express.json());

	// Setting CORS Headers to every response of the server
	app.use((req, res, next) => {
		res.setHeader(
			"Access-Control-Allow-Origin","*"
		); // * => this is the domain
		res.setHeader(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept, Authorization"
		);
		res.setHeader(
			"Access-Control-Allow-Methods",
			"GET, POST, PATCH, DELETE, OPTIONS"
		);
		next();
	});

	app.use(`/api/${config.API_VERSION}/users`, usersRoutes);

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

  return app;
}