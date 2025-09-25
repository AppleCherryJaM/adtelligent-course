import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import type { FeedItem } from "../services/api";
import NewsItem from "./NewsItem";

interface NewsListProps {
	newsList: FeedItem[];
}

const NewsList = ({ newsList }: NewsListProps) => {
	const navigate = useNavigate();

	const getImageFromContent = (content: string): string => {
		const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
		return imgMatch ? imgMatch[1] : "/default-news-image.jpg";
	};

	const getExcerpt = (text: string, maxLength = 100): string => {
		const cleanText = text.replace(/<[^>]*>/g, "");
		return cleanText.length > maxLength
			? `${cleanText.substring(0, maxLength)}...`
			: cleanText;
	};

	const formatDate = (dateString: string): string => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};

	return (
		<Box
			component="div"
			sx={{
				display: "grid",
				gap: 3,
				gridTemplateColumns: {
					xs: "repeat(1, 1fr)",
					sm: "repeat(2, 1fr)",
					md: "repeat(3, 1fr)",
				},
			}}
		>
			{newsList.map((news, index) => (
				<Box key={news.guid || index}>
					<NewsItem
						title={news.title}
						image={getImageFromContent(news.content)}
						text={getExcerpt(news.contentSnippet || news.content)}
						date={formatDate(news.isoDate || news.pubDate)}
						onClick={() => navigate(`/news/${encodeURIComponent(news.link)}`)}
					/>
				</Box>
			))}
		</Box>
	);
};

export default NewsList;
