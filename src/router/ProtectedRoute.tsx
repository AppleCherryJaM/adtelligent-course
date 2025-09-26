// router/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

type ProtectedRouteProps = {
	children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const { isAuthenticated } = useAuthStore(); // Убираем проверку token для простоты

	return isAuthenticated ? <>{children}</> : <Navigate to="/auth" replace />;
};
