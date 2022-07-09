import { Box, Button, CircularProgress, Container, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import Posts from "../features/post/Posts";
import { usePosts } from "../store/usePosts";
import shallow from "zustand/shallow";

const Home = () => {
  const { posts,  getPosts, postsLoading, postsError } = usePosts(
    (state) => ({
      getPosts: state.getPosts,
      postsLoading:state.postsLoading,
      postsError: state.postsError,
      posts:state.posts
    }),
    shallow
  );
  useEffect(() => {
    if(posts.length) return
    getPosts();
  }, []);
  return (
    <>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography variant="h4">Posts</Typography>
        </Box>
        <Grid container spacing={2}>
          {
          postsLoading ? 
          postsError ?
          <div>
            <h1>Post error</h1>
            <Button onClick={getPosts}>Try Again</Button>
          </div>
          :
          <CircularProgress />
          :
          <Posts  />

        }
          <Grid item xs={8}></Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
