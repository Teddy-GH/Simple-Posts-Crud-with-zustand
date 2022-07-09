import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import endpoints from "../api/endpoints";
import ViewPost from "../features/post/ViewPost";
import shallow from "zustand/shallow";
import { usePosts } from "../store/usePosts";

const PostDetailPage = () => {
  const {id} = useParams<{id: any}>();
  const {  getPostDetail } = usePosts(
    (state) => ({
      getPostDetail: state.getPostDetail,
    }),
    shallow
  );


const history = useNavigate();
  useEffect(() => {
    getPostDetail(id)
}, [id])

const handleDelete =() => {
  
  endpoints.Post.delete(id).then(() =>
  history
  );
}
  return(
    <ViewPost />
  )

}

export default PostDetailPage;