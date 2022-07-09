import axios, { AxiosResponse } from "axios";
import { PostItem } from "../models/post";

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/';

const responseBody =<T> (response: AxiosResponse<T>) => response.data;

const requests ={
  get:<T> (url: string) => axios.get<T>(url).then(responseBody),
  post: <T> (url: string, body:{}) => axios.post<T>(url, body).then(responseBody),
  put:  <T> (url: string, body:{}) => axios.put<T>(url, body).then(responseBody),
  delete:  <T> (url: string) => axios.delete<T>(url).then(responseBody)
}

const Post = {
  list:  () => requests.get<PostItem[]>('posts'),
  details:(id:number) => requests.get<PostItem>(`posts/${id}`),
  create: (post: PostItem) => requests.post<void>('posts', post),
  update: (post: PostItem)=> requests.put<void>(`posts/${post.id}`, post),
  delete: (id: number) => requests.delete(`posts/${id}`),


}

const endpoints = {
  Post
}

export default endpoints;