import { ArrowBack, OpenInNew } from "@mui/icons-material";
import {
	Alert,
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	Chip,
	CircularProgress,
	Divider,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	type ArticleContent,
	getArticleContent,
} from "../../services/news.service";

const NewsPage = () => {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();

	const [article, setArticle] = useState<ArticleContent | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadArticle = async () => {
			if (!id) {
				setError("Article ID is missing");
				setIsLoading(false);
				return;
			}

			try {
				setIsLoading(true);
				setError(null);

				const articleUrl = decodeURIComponent(id);
				const articleData = await getArticleContent(articleUrl);
				setArticle(articleData);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to load article");
			} finally {
				setIsLoading(false);
			}
		};

		loadArticle();
	}, [id]);

	if (!id) {
		return (
			<Box sx={{ p: 4 }}>
				<Alert severity="error">Article not specified</Alert>
				<Button
					onClick={() => navigate("/news")}
					sx={{ mt: 2 }}
					startIcon={<ArrowBack />}
				>
					Back to News
				</Button>
			</Box>
		);
	}

	if (isLoading) {
		return (
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				minHeight="400px"
			>
				<CircularProgress />
				<Typography sx={{ ml: 2 }}>Loading article...</Typography>
			</Box>
		);
	}

	if (error) {
		return (
			<Box sx={{ p: 4 }}>
				<Alert severity="error" sx={{ mb: 2 }}>
					{error}
				</Alert>
				<Button onClick={() => navigate("/news")} startIcon={<ArrowBack />}>
					Back to News
				</Button>
			</Box>
		);
	}

	if (!article) {
		return (
			<Box sx={{ p: 4 }}>
				<Alert severity="info">Article not found</Alert>
				<Button
					onClick={() => navigate("/news")}
					sx={{ mt: 2 }}
					startIcon={<ArrowBack />}
				>
					Back to News
				</Button>
			</Box>
		);
	}

	const articleUrl = decodeURIComponent(id);

	return (
		<Box sx={{ maxWidth: 800, mx: "auto", p: 4 }}>
			<Button
				onClick={() => navigate("/news")}
				startIcon={<ArrowBack />}
				sx={{ mb: 3 }}
			>
				Back to News
			</Button>

			<Card sx={{ borderRadius: 3, boxShadow: 3 }}>
				{article.image && (
					<CardMedia
						component="img"
						height="400"
						image={article.image}
						alt={article.title}
						sx={{ objectFit: "cover" }}
					/>
				)}

				<CardContent sx={{ p: 4 }}>
					<Typography
						variant="h3"
						component="h1"
						gutterBottom
						fontWeight="bold"
					>
						{article.title}
					</Typography>

					<Box
						sx={{
							display: "flex",
							gap: 2,
							flexWrap: "wrap",
							alignItems: "center",
							mb: 3,
						}}
					>
						{article.author && (
							<Chip label={`By ${article.author}`} variant="outlined" />
						)}
						{article.publishedAt && (
							<Chip
								label={new Date(article.publishedAt).toLocaleDateString()}
								variant="outlined"
							/>
						)}
					</Box>

					<Divider sx={{ my: 3 }} />

					{article.excerpt && (
						<>
							<Typography variant="h6" color="text.secondary" paragraph>
								{article.excerpt}
							</Typography>
							<Divider sx={{ my: 3 }} />
						</>
					)}

					<Typography
						variant="body1"
						sx={{
							lineHeight: 1.8,
							fontSize: "1.1rem",
							whiteSpace: "pre-line",
						}}
						paragraph
					>
						{article.content}
					</Typography>

					<Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
						<Button
							href={articleUrl}
							target="_blank"
							rel="noopener noreferrer"
							endIcon={<OpenInNew />}
							variant="outlined"
							size="large"
						>
							Read Original Article
						</Button>
					</Box>
				</CardContent>
			</Card>
		</Box>
	);
};

export default NewsPage;
