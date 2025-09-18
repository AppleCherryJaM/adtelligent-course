import { Container, Typography } from "@mui/material";
import NewsList from "../../components/NewsList";
import data from "../../mockData/mockData";

const MainPage = () => {
	const news = data.news;
	return (
		<Container sx={{ py: 4 }}>
			<Typography variant="h4" mb={4}>
				News feed
			</Typography>
			<NewsList newsList={news} />
		</Container>
	);
};

export default MainPage;
