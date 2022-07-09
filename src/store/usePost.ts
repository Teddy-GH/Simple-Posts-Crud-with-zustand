import create from "zustand";
import endpoints from "../api/endpoints";
import { PostItem } from "../models/post";

interface IUsePost {
  postDetail: PostItem | null;
  setPostDetail:(post:PostItem) => void
  getPostDetail: (postId: number) => void;
}

export const usePost = create<IUsePost>((set, get) => ({
  postDetail: null,
  setPostDetail: (post: PostItem) => {
    set((state) => ({
      ...state,
      post: post,
    }));
  },
  getPostDetail: (postId:number) => {
    //api call
    endpoints.Post.details(postId).then((post) => get().setPostDetail(post));
  },
}));
