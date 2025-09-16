import { createBrowserRouter } from "react-router-dom";
import AuthPage from "./pages/auth-page/AuthPage";
import MainPage from "./pages/main-page/MainPage";
import NewsPage from "./pages/news-page/NewsPage";

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage />,
  },
{
    path: "/",
    element: <MainPage />,
  },
{
    path: "/news",
    element: <NewsPage />,
  },
  {
    path: "*", 
  },
]);