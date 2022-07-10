import { Grid} from "@mui/material";
import { usePosts } from "../../store/usePosts";
import PostCard from "./PostCard";
import shallow from "zustand/shallow";



const Posts = () => {
  const { posts } = usePosts(
    (state) => ({
      posts: state.posts,
    }),
    shallow
  );
    return (
        <>
       
          {posts.map((postItem) => (
            <Grid item xs={4} key={postItem.id}>
             <PostCard 
              postItem={postItem}
             
              />
              
            </Grid>
          ))}
        </>
       
    );
}

export default Posts;