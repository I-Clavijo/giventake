import "./index.scss";

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

import Root from "./routes/Root";
import ErrorPage from "./routes/ErrorPage";
import Home from "./routes/Home";
import Explore from "./routes/Explore";
import Auth, { action as authAction } from "./routes/Auth";
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
			{ path: "/auth", element: <Auth />, action: authAction },
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
