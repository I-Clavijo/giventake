import { connectDB } from "./utils/connection.js"
import createApp from "./app.js"
import ViteExpress from "vite-express";

try {
	const app = createApp();

	// Connect to the database
	const isConnected = await connectDB();
	if (!isConnected) throw new Error("Database connection failed.")

	const { PORT = 3000 } = process.env;
	ViteExpress.listen(app, PORT, () =>{
		if (process.env.NODE_ENV === 'development'){
			console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
		}
	  console.log("🫡 Server is listening...");
	});
} catch (error) {
    console.error('Error starting server:', error);
    process.exit(1); // Exit the process if unable to start the server
  }
