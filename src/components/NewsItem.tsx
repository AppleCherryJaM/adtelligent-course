import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
} from "@mui/material";

interface NewsItemProps {
	title: string;
	image: string;
	text: string;
	date: string;
	onClick: () => void;
}

function NewsItem({ title, image, text, date, onClick }: NewsItemProps) {
	return (
		<Card
			sx={{
				maxWidth: 345,
				borderRadius: 3,
				boxShadow: 3,
				height: "100%",
				display: "flex",
				flexDirection: "column",
				transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
				"&:hover": {
					transform: "translateY(-4px)",
					boxShadow: 6,
				},
			}}
		>
			<CardActionArea
				onClick={onClick}
				sx={{
					flex: 1,
					display: "flex",
					flexDirection: "column",
					alignItems: "stretch",
				}}
			>
				<CardMedia
					component="img"
					height="140"
					image={image || "/default-news-image.jpg"}
					alt={title}
					sx={{
						height: 140,
						objectFit: "cover",
					}}
					onError={(e) => {
						e.currentTarget.src = "/default-news-image.jpg";
					}}
				/>
				<CardContent sx={{ flex: 1 }}>
					<Typography gutterBottom variant="h6" component="div" noWrap>
						{title}
					</Typography>
					<Typography
						variant="body2"
						color="text.secondary"
						sx={{
							display: "-webkit-box",
							WebkitLineClamp: 3,
							WebkitBoxOrient: "vertical",
							overflow: "hidden",
						}}
					>
						{text}
					</Typography>
					<Typography
						variant="caption"
						color="text.secondary"
						sx={{ mt: 1, display: "block" }}
					>
						{date}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}

export default NewsItem;
