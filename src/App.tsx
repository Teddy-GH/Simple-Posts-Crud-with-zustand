import { Container, CssBaseline } from '@mui/material';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import endpoints from './api/endpoints';
import NewPostItem from './Pages/CreatePostPage';
import PostItemDetail from './features/post/ViewPost';
import Header from './layout/Header';
import { PostItem } from './models/post';
import Home from './Pages/Home';
import PostDetailPage from './Pages/PostDetailPage';




function App() {
  const[posts, setPosts] = useState<PostItem[]>([]);

  
  
  // <Home posts={posts} />
  
  return (
    <>
    <CssBaseline />
    <Header />
    <Container>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/post" element={<NewPostItem  />} />
    <Route path="/posts/:id" element={<PostDetailPage />} />
  </Routes>

    </Container>
    </>
  );
}

export default App;
