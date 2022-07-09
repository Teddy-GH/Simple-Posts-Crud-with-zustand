import { LoadingButton } from "@mui/lab";
import { Container, Paper, Box, Typography, Button, TextField, Grid, ButtonGroup, Card, CardActions, CardContent, IconButton } from "@mui/material";
import { useState, useEffect, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import shallow from "zustand/shallow";
import endpoints from "../../api/endpoints";
import { PostItem } from "../../models/post";
import { usePosts } from "../../store/usePosts";

const EditPost = () => {
const history = useNavigate();
const {id} = useParams<{id:any}>();
const [loading, setLoading] = useState(true);
const [post, setPost] = useState({
    id:0,
    title:'',
    body:'',
    userId:0,
});

useEffect(() =>{
    if(id) {
        endpoints.Post.details(parseInt(id))
        .then((response: any) => setPost(response))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    }
},[id, loading]);

const { register, handleSubmit, setError, formState: { isSubmitting, errors, isValid } } = useForm({
    mode: 'all'
});

const {editPost,deletePost } = usePosts(
    (state) => ({
      editPost: state.editPost,
      deletePost:state.deletePost,
    }),
    shallow
  );



const handleInputChange = (event: any) => {
    const {name, value} = event.target;
    setPost({ ...post, [name]:value })

}


const handleUpdatePost = (data:PostItem) => {
    editPost(data,() =>{
      toast('Updated successfully');
        history('/')
        
    })
}

  return(
    <Container component={Paper} maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
    <Box sx={{display: 'flex', justifyContent:'space-between', alignItems:'center', mb: 4}}>
       <Typography variant="h4">Edit Post</Typography>
     </Box>
   <Card sx={{mb:4}}>
        <CardContent>
        <TextField
                   margin="normal"
                   fullWidth
                   label="Title"
                   value={post.title}
                   name='title'
                   onChange={handleInputChange}
               />
               <TextField
                   margin="normal"
                   fullWidth
                   label="Description"
                   value={post.body}
                   name='body'
                   onChange={handleInputChange}

               />
               <TextField
                   margin="normal"
                   fullWidth
                   value={post.userId}
                   name='userId'
                   onChange={handleInputChange}   
               />
        </CardContent>
        <CardActions>
          <Button size="small"onClick={()=>handleUpdatePost(post)} >
            Edit
          </Button>
          <Button size="small" component={Link} to="/">
            Cancel
          </Button>
        </CardActions>
        </Card>

       </Container>
  )
}

export default EditPost;