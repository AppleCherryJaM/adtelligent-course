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
		const response = await fetch(apiUrl);

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
			content:
				"The backend server is not responding properly. Please check if it's running on port 3000.",
			contentSnippet: "Backend connectivity issue",
			guid: "fallback-1",
			isoDate: new Date().toISOString(),
		},
		{
			title: "How to fix:",
			link: "#",
			pubDate: new Date().toISOString(),
			content:
				"1. Ensure backend is running on port 3000\n2. Check browser console for CORS errors\n3. Verify proxy settings in package.json",
			contentSnippet: "Troubleshooting steps",
			guid: "fallback-2",
			isoDate: new Date().toISOString(),
		},
	];
}

export async function getArticleContent(
	articleUrl: string,
): Promise<ArticleContent> {
	const response = await fetch(`/api/article?url=${articleUrl}`);

	if (!response.ok) {
		throw new Error(`API error: ${response.status}`);
	}

	return await response.json();
}
