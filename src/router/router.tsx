import { createBrowserRouter } from "react-router-dom";
import { AuthPage, MainPage, NewsPage} from "../pages";
import { Navigate } from "react-router-dom";
import { PublicRoute } from "./PublicRoute";
import { ProtectedRoute } from "./ProtectedRoute"


export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <PublicRoute>
      <AuthPage />
      </PublicRoute>,
  },
{
    path: "/",
    element: <ProtectedRoute><MainPage /></ProtectedRoute>,
  },
{
    path: "/news",
    element: <ProtectedRoute><NewsPage /></ProtectedRoute>,
  },
  {
    path: "*", 
    element: <Navigate to="/" />
  },
]);