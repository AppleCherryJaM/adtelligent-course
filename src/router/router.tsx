import { Navigate, createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import { AuthPage, MainPage, NewsPage } from "../pages";
import { PublicRoute } from "./PublicRoute";

export const router = createBrowserRouter([
	{
		path: "/",
		element: (
			// <ProtectedRoute>
			<Layout />
			// {/* </ProtectedRoute> */}
		),
		children: [
			{
				path: "news",
				element: <MainPage />,
			},
			{
				path: "/news/:id",
				element: <NewsPage />,
			},
		],
	},

	{
		path: "/auth",
		element: (
			<PublicRoute>
				<AuthPage />
			</PublicRoute>
		),
	},
	{
		path: "*",
		element: <Navigate to="/news" />,
	},
]);
