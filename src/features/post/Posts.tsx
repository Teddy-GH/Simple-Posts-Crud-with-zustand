import { Grid} from "@mui/material";
import { useState } from "react";
import { PostItem } from "../../models/post";
import { usePosts } from "../../store/usePosts";
import PostCard from "./PostCard";
import ViewPost from "./ViewPost";
import PostItemDetail from "./ViewPost";
import shallow from "zustand/shallow";



const Posts = () => {
  const { posts } = usePosts(
    (state) => ({
      posts: state.posts,
    }),
    shallow
  );
// const {postList,deletePost  } = props;
// const [updatedList, setUpdatedList] = useState(postList);

// const handleDelete = (id: number) => {
//   setUpdatedList([...postList.filter(p => p.id !==id)]
//   )
// }
    return (
        <>
       
          {posts.map((postItem) => (
            <Grid item xs={4} key={postItem.id}>
             <PostCard 
              postItem={postItem}
             
              />
              
            </Grid>
          ))}
         {/* <ViewPost post={postList.filter((post:PostItem) => post)}  deletePost={handleDelete} /> */}
        </>
       
    );
}

export default Posts;