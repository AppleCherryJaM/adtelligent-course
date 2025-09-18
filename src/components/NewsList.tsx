import {type NewsType} from '../types'
import Grid from "@mui/material/Grid";
import NewsItem from './NewsItem'

interface NewsListProps {
newsList: NewsType[]
}

const NewsList = ({newsList}: NewsListProps) => {
return (
    <Grid container spacing={3}>
      {newsList.map((news) => (
        <Grid item xs={12} sm={6} md={4} key={news.id}>
          <NewsItem
            title={news.title!}
            text={news.mainText!}
            image={news.image!}
            // date={news.date}
            onClick={() => console.log("Open full news:", news.id)}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default NewsList