import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthPage, MainPage, NewsPage } from "../pages";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

export const router = createBrowserRouter([
	{
		path: "/auth",
		element: (
			<PublicRoute>
				<AuthPage />
			</PublicRoute>
		),
	},
	{
		path: "/",
		element: (
			// <ProtectedRoute>
			<MainPage />
			// </ProtectedRoute>
		),
	},
	{
		path: "/news",
		element: (
			<ProtectedRoute>
				<NewsPage />
			</ProtectedRoute>
		),
	},
	{
		path: "*",
		element: <Navigate to="/" />,
	},
]);
