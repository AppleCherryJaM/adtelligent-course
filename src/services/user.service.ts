import { apiClient } from "../lib/apiClient"; // Импортируем apiClient
// services/user.service.ts
import type { User } from "../store/authStore";

export interface LoginData {
	email: string;
	password: string;
}

export interface RegisterData {
	email: string;
	password: string;
}

export interface AuthResponse {
	user: {
		id: string;
		email: string;
	};
	token: string;
	message?: string;
}

export interface ApiError {
	error: string;
	message: string;
}

class AuthService {
	private baseURL = "/api/user";

	async login(credentials: LoginData): Promise<AuthResponse> {
		const response = await apiClient.post(`${this.baseURL}/`, credentials);

		if (!response.ok) {
			const error: ApiError = await response.json();
			throw new Error(error.message || "Login failed");
		}

		return response.json();
	}

	async register(userData: RegisterData): Promise<AuthResponse> {
		const response = await apiClient.post(`${this.baseURL}/new`, userData);

		if (!response.ok) {
			const error: ApiError = await response.json();
			throw new Error(error.message || "Registration failed");
		}

		return response.json();
	}

	async getProfile(): Promise<{ user: User }> {
		const response = await apiClient.get(`${this.baseURL}/profile`);

		if (!response.ok) {
			throw new Error("Failed to fetch profile");
		}

		return response.json();
	}
}

export const authService = new AuthService();
