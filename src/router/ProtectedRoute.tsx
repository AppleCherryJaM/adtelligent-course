import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

type ProtectedRouteProps = {
	children: ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

	if (!isAuthenticated) {
		return <Navigate to="/auth" replace />;
	}

	return <>{children}</>;
};
