import create from "zustand";
import endpoints from "../api/endpoints";
import { PostItem } from "../models/post";

interface IUsePosts {
  postsLoading:boolean;
  setPostLoading:(value:boolean) => void
  posts: PostItem[];
  postDetail : PostItem | null;
  setPostDetail: (post:PostItem) => void
  setPosts: (posts: PostItem[]) => void;
  getPosts: () => void;
  createPost: (post: PostItem , callback: Function) => void;
  editPost: (post: PostItem, callback: Function) => void;
  deletePost: (postId: number) => void
  getPostDetail : (postId: number) => void
  postsError: string | null;
  setPostsError:(value: string | null) => void;
}

export const usePosts = create<IUsePosts>((set, get) => ({
  postsLoading:false,
  postsError:null,
  posts: [],
  postDetail:null,
  setPosts: (posts: PostItem[]) => {
    set((state) => ({
      ...state,
      posts: posts,
    }));
  },
  setPostsError: (value: string | null) => {
    set((state) => ({
      ...state,
      postsError: value,
    }));
  },
  setPostLoading: (value:boolean) => {
    set((state) => ({
      ...state,
      postsLoading: value,
    }));
  },
  getPosts: () => {
    //api call
    get().setPostsError(null);
    get().setPostLoading(true);
    endpoints.Post.list().then((postList) => get().setPosts(postList))
    .catch(error => get().setPostsError(error))
    .finally(()=>  get().setPostLoading(false));
  },
  createPost: (postItem: PostItem, callback: Function) => {
    endpoints.Post.create(postItem).then(() =>{
      get().setPosts([...get().posts, postItem])
      callback()
    }
    );
  },
  editPost: (postItem: PostItem, callback: Function) => {
    endpoints.Post.update(postItem).then(() => {
      const newPosts = get().posts.map((post) => {
        if (post.id === postItem.id) return postItem;
        return post;
      });
      get().setPosts(newPosts)
      callback();
    });
  },
  deletePost: (postId: number) => {
    endpoints.Post.delete(postId).then(() =>
      get().setPosts(get().posts.filter((post) => post.id !== postId))
    );

  },
  getDetail: (postId: number) => {
    endpoints.Post.details(postId).then(() =>
      get().setPosts(get().posts.filter((post) => post.id !== postId))
    );
  },
  setPostDetail: (post:PostItem)=> {
    set((state) => ({
      ...state,
      postDetail: post,
    }));
  },
  getPostDetail: (postId:number) => {
    const postDetail = get().posts.filter(post=> post.id == postId)
    if(postDetail?.length) get().setPostDetail(postDetail[0])
    
  }
}));
