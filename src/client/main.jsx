import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

import Root from "./routes/root";
import ErrorPage from "./error-page";
import Home from "./routes/home";
import Explore from "./routes/explore";
import Profile from "./routes/Profile";
import EditProfile from "./routes/EditProfile";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <Root><ErrorPage /></Root>,
		children: [
			{ path: "/", element: <Home /> },
			{ path: "/explore", element: <Explore /> },
			{ path: "/profile", element: <Profile /> },
			{ path: "/account/edit", element: <EditProfile /> },
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
