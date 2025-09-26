// hooks/useAuth.ts
import { useState } from "react";
import {
	type LoginData,
	type RegisterData,
	authService,
} from "../services/user.service";
import { useAuthStore } from "../store/authStore";

export const useAuth = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { login, logout } = useAuthStore();

	const clearError = () => setError(null);

	const handleLogin = async (credentials: LoginData) => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await authService.login(credentials);
			login(response.user, response.token);
			return response;
		} catch (err) {
			const message = err instanceof Error ? err.message : "Login failed";
			setError(message);
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	const handleRegister = async (userData: RegisterData) => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await authService.register(userData);
			login(response.user, response.token);
			return response;
		} catch (err) {
			const message =
				err instanceof Error ? err.message : "Registration failed";
			setError(message);
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	const handleLogout = () => {
		logout();
	};

	return {
		isLoading,
		error,
		clearError,
		login: handleLogin,
		register: handleRegister,
		logout: handleLogout,
	};
};
