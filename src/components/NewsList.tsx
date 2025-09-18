import Box from "@mui/material/Box";

import type { NewsType } from "../types";
import { useNavigate } from "react-router-dom";
import NewsItem from "./NewsItem";

interface NewsListProps {
	newsList: NewsType[];
}

const NewsList = ({ newsList }: NewsListProps) => {
  const navigate = useNavigate()
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
			{newsList.map((news) => (
				<Box key={news.id}>
					<NewsItem
						title={news.title}
						text={news.mainText}
						image={news.image}
						date={news.date}
						onClick={() => navigate(`/news/${news.id}`)}
					/>
				</Box>
			))}
		</Box>
	);
};

export default NewsList;
