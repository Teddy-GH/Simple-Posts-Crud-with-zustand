import { Button, Card, CardActions, CardContent, IconButton, Typography } from "@mui/material"
import { PostItem } from "../../models/post"

import EditIcon from '@mui/icons-material/Edit';
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import endpoints from "../../api/endpoints";
interface Props {
    postItem: PostItem,
    
}


const PostCard = ({postItem}:Props) => {
  
    return(
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
      <Typography gutterBottom variant="h5">
        {postItem?.id}
        </Typography>
        <Typography gutterBottom variant="h5">
        {postItem?.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {postItem?.body}
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to={`/posts/${postItem.id}`} size="small">Detail</Button>
       
      </CardActions>
    </Card>
    )
}

export default PostCard;