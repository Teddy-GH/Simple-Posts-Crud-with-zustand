import { Alert, Button, Card, CardActions, CardContent, Container, Grid, IconButton, Snackbar, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom"
import endpoints from "../../api/endpoints";
import { PostItem } from "../../models/post";
import EditPost from "./EditPost";
import DeleteIcon from '@mui/icons-material/Delete';
import { usePost } from "../../store/usePost";
import shallow from "zustand/shallow";
import { usePosts } from "../../store/usePosts";
import { toast } from "react-toastify";

// interface Props {
//   post:PostItem | null,
//   deletePost: (id: number) => void

// }

const ViewPost = () =>{
const {id} = useParams<{id: any}>();
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

const [editMode, setEditMode] = useState(false);

const { postDetail,editPost,deletePost } = usePosts(
  (state) => ({
    postDetail: state.postDetail,
    editPost: state.editPost,
    deletePost:state.deletePost
  }),
  shallow
);

const history = useNavigate();
const { register, handleSubmit, setError, formState: { isSubmitting, errors, isValid } } = useForm({
    mode: 'all'
});



const handleEdit = () => {
    setEditMode(true);
}

const deleteHandler = ():void => {
  deletePost(+id);
  handleClick();
  history('/');        
}

    return (
   <Container >
    {!editMode &&
    <Card sx={{mb:4}}>
        <CardContent>
          <Typography variant="h5" component="div">
            {postDetail?.userId}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {postDetail?.title}
          </Typography>
          <Typography variant="body2">{postDetail?.body}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleEdit}>
            Edit
          </Button>
          <Button size="small" onClick={deleteHandler} >
           <DeleteIcon  />
         </Button>
          
        </CardActions>
        
      </Card>
    }
     { editMode &&
           <Grid item xs={6}>
          {editMode && <EditPost 
         />}
        </Grid>
     }

<Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        Post successfully deleted!
        </Alert>
      </Snackbar>;
   </Container>     
    
     
    );
     
}
 
export default ViewPost;