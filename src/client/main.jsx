import "./index.scss";

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useUser } from "./hooks/useUser";

import RequireAuth from './components/Auth/RequireAuth';
import PersistLogin from './components/Auth/PersistLogin';
import Root from "./routes/Root";
import ErrorPage from "./routes/ErrorPage";
import Home from "./routes/Home";
import Explore from "./routes/Explore";
import Auth from "./routes/Auth";
import Profile from "./routes/Profile";
import EditProfile from "./routes/EditProfile";
import Messages from "./routes/Messages";
import Missing from "./routes/Missing";
import Editor from "./routes/Editor";
import Admin from "./routes/Admin";

const ROLES = {
	'User': 2001,
	'Editor': 1984,
	'Admin': 5150
}

const queryClient = new QueryClient();

const router = createBrowserRouter([
	{
		path: "/", element: <Root />, errorElement: <Root><ErrorPage /></Root>,
		children: [
			// public routes
			{ path: "/", element: <Home /> },
			{ path: "/explore", element: <Explore /> },
			{ path: "/auth", element: <Auth /> },
			{ path: "/profile", element: <Profile /> },
			{ path: "/messages", element: <Messages /> },

			// protected routes
			{ 
				element: <PersistLogin />,
				children: [
					{ 
						element: <RequireAuth allowedRoles={[ROLES.User]} />, 
						children: [
							{ path: "/account/edit", element: <EditProfile /> }
						] 
					},
					{ 
						element: <RequireAuth allowedRoles={[ROLES.Editor]} />, 
						children: [
							{ path: "/editor", element: <Editor /> }
						] 
					},
					{ 
						element: <RequireAuth allowedRoles={[ROLES.Admin]} />, 
						children: [
							{ path: "/admin", element: <Admin /> }
						] 
					},
					
				]
			},
			
			// catch all
			{ path: "*", element: <Missing /> },
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	</React.StrictMode>
);
