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
			}}
		>
			<CardActionArea onClick={onClick}>
				<CardMedia
					component="img"
					height="100"
					image={image}
					alt={title}
					sx={{
						height: 200,
						objectFit: "cover",
					}}
				/>
				<CardContent>
					<Typography gutterBottom variant="h6" component="div">
						{title}
					</Typography>
					<Typography variant="body2" color="text.secondary" noWrap>
						{text}
					</Typography>
					<Typography variant="caption" color="text.secondary">
						{date}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}

export default NewsItem;
