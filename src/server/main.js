import { connectDB } from "./db/connection.js"
import createApp from "./app.js"
import ViteExpress from "vite-express";

try {
	const app = createApp();

	// Connect to the database
	const isConnected = await connectDB();

	if (!isConnected) {
		throw new Error("Database connection failed.")
	}

	ViteExpress.listen(app, 3000, () =>
		console.log("Server is listening on port 3000..."),
	);
} catch (error) {
    console.error('Error starting server:', error);
    process.exit(1); // Exit the process if unable to start the server
  }
