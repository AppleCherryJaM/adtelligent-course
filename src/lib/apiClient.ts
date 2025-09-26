// lib/apiClient.ts
import { useAuthStore } from "../store/authStore";

class ApiClient {
	private async request(
		input: RequestInfo | URL,
		init?: RequestInit,
	): Promise<Response> {
		const token = useAuthStore.getState().token;

		const headers = new Headers(init?.headers);

		if (token) {
			headers.set("Authorization", `Bearer ${token}`);
		}

		if (init?.body && !headers.has("Content-Type")) {
			headers.set("Content-Type", "application/json");
		}

		const response = await fetch(input, {
			...init,
			headers,
		});

		if (response.status === 401) {
			useAuthStore.getState().logout();
			window.location.href = "/auth";
			throw new Error("Authentication required");
		}

		return response;
	}

	async get(url: string): Promise<Response> {
		return this.request(url, { method: "GET" });
	}

	async post(url: string, data?: unknown): Promise<Response> {
		return this.request(url, {
			method: "POST",
			body: data ? JSON.stringify(data) : undefined,
		});
	}
}

export const apiClient = new ApiClient();
