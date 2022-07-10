import {
  Alert,
  Box,
  Container,
  Grid,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { PostItem } from "../models/post";
import { usePosts } from "../store/usePosts";
import shallow from "zustand/shallow";
import { useState } from "react";

interface Props {
  selectedPost: PostItem;
  editMode?: boolean;
  handleSelectedPost: (id: number) => void;
}

const NewPostItem = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const { postDetail, editPost, deletePost, createPost } = usePosts(
    (state) => ({
      postDetail: state.postDetail,
      editPost: state.editPost,
      deletePost: state.deletePost,
      createPost: state.createPost,
    }),
    shallow
  );

  const onSubmit = (data: PostItem) => {
    createPost(data, () => {
      handleClick();
      
      history("/");
    });
  };

  const history = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors, isValid },
  } = useForm<PostItem>({
    mode: "all",
  });

  return (
    <Container
      component={Paper}
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4">New Post</Typography>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          fullWidth
          label="Title"
          autoFocus
          {...register("title", { required: "Title is required" })}
          error={!!errors.title?.message}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Description"
          error={!!errors.body}
        />
        <TextField
          margin="normal"
          fullWidth
          label="userId"
          {...register("userId", {
            required: "User Id is required",
          })}
          error={!!errors.userId?.message}
        />

        <LoadingButton
      onClick={handleClick}
          disabled={!isValid}
          loading={isSubmitting}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Save
        </LoadingButton>
        <Grid container>
          <Grid item>
            <Link to="/">{"Return to Home?"}</Link>
          </Grid>
        </Grid>
      </Box>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        Post  successfully created!
        </Alert>
      </Snackbar>;
    </Container>
  );
};

export default NewPostItem;
