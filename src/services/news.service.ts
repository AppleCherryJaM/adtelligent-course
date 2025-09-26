// services/news.service.ts
import { apiClient } from "../lib/apiClient"; // Используем apiClient

export interface FeedItem {
	title: string;
	link: string;
	pubDate: string;
	content: string;
	contentSnippet: string;
	guid: string;
	isoDate: string;
}

export interface FeedResponse {
	res: FeedItem[];
	status: number;
}

export interface ArticleContent {
	title: string;
	content: string;
	excerpt: string;
	image?: string;
	publishedAt?: string;
	author?: string;
}

export async function getFeed(url?: string): Promise<FeedItem[]> {
	const feedUrl = url || "https://feeds.bbci.co.uk/news/rss.xml";
	const apiUrl = `/api/feed?url=${encodeURIComponent(feedUrl)}`;

	try {
		const response = await apiClient.get(apiUrl); // ← Используем apiClient вместо fetch

		if (!response.ok) {
			return getFallbackData("Backend error");
		}

		const data: FeedResponse = await response.json();
		return data.res || [];
	} catch {
		return getFallbackData("Connection failed");
	}
}

function getFallbackData(reason?: string): FeedItem[] {
	return [
		{
			title: reason ? `Backend Issue: ${reason}` : "Demo News",
			link: "#",
			pubDate: new Date().toISOString(),
			content: "Backend connectivity issue",
			contentSnippet: "Backend connectivity issue",
			guid: "fallback-1",
			isoDate: new Date().toISOString(),
		},
	];
}

export async function getArticleContent(
	articleUrl: string,
): Promise<ArticleContent> {
	const response = await apiClient.get(`/api/article?url=${articleUrl}`); // ← apiClient

	if (!response.ok) {
		throw new Error(`API error: ${response.status}`);
	}

	return await response.json();
}
