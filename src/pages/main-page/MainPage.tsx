import {
	Alert,
	Box,
	Chip,
	CircularProgress,
	Container,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import NewsList from "../../components/NewsList";
import { type FeedItem, getFeed } from "../../services/api";

const MainPage = () => {
	const [news, setNews] = useState<FeedItem[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [hasBackendError, setHasBackendError] = useState(false);

	useEffect(() => {
		const loadNews = async () => {
			try {
				const newsData = await getFeed();
				setNews(newsData);

				const isFallbackData = newsData.some(
					(item) =>
						item.title.includes("Backend Issue") ||
						item.guid.includes("fallback"),
				);
				setHasBackendError(isFallbackData);
			} catch {
				setNews([]);
				setHasBackendError(true);
			} finally {
				setIsLoading(false);
			}
		};

		loadNews();
	}, []);

	if (isLoading) {
		return (
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				minHeight="400px"
			>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<Container sx={{ py: 4 }}>
			<Box display="flex" alignItems="center" gap={2} mb={3}>
				<Typography variant="h4">News feed ({news.length} articles)</Typography>
				{hasBackendError && (
					<Chip
						label="Backend Offline"
						color="error"
						variant="outlined"
						size="small"
					/>
				)}
			</Box>

			{hasBackendError && (
				<Alert severity="warning" sx={{ mb: 2 }}>
					Unable to connect to backend server. Showing demonstration data.
				</Alert>
			)}

			<NewsList newsList={news} />
		</Container>
	);
};

export default MainPage;
