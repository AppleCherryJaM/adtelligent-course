import { Card, CardContent, CardMedia, Typography, CardActionArea } from "@mui/material";
interface NewsItemProps {
	title: string,
	image: string,
	text: string,
	onClick: () => void
}

function NewsItem({title, image, text, onClick} : NewsItemProps) {
	return (
	<Card sx={{ maxWidth: 345, borderRadius: 3, boxShadow: 3 }}>
      <CardActionArea onClick={onClick}>
        <CardMedia component="img" height="160" image={image} alt={title} />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {text}
          </Typography>
          {/* <Typography variant="caption" color="text.secondary">
            {date}
          </Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>
	)
}

export default NewsItem