import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import data from "../../mockData/mockData";

const NewsPage = () => {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();

	const news = data.news.find((n) => String(n.id) === id);

	if (!news) {
		return (
			<Box sx={{ p: 4 }}>
				<Typography variant="h6" color="error">
					Not found
				</Typography>
				<Button
					variant="outlined"
					startIcon={<ArrowBackIcon />}
					sx={{ mt: 2 }}
					onClick={() => navigate("/news")}
				>
					Back to feed
				</Button>
			</Box>
		);
	}

	return (
		<Box sx={{ maxWidth: 800, mx: "auto", p: 4 }}>
			<Button
				variant="text"
				startIcon={<ArrowBackIcon />}
				sx={{ mb: 2 }}
				onClick={() => navigate("/news")}
			>
				Back
			</Button>

			<Card sx={{ borderRadius: 3 }}>
				<CardMedia
					component="img"
					height="300"
					image={news.image}
					alt={news.title}
				/>
				<CardContent>
					<Typography variant="h4" gutterBottom>
						{news.title}
					</Typography>

					<Typography variant="body2" color="text.secondary" gutterBottom>
						{news.date}
					</Typography>

					<Typography variant="body1" sx={{ mt: 2 }}>
						{news.mainText}
					</Typography>
				</CardContent>
			</Card>
		</Box>
	);
};

export default NewsPage;
