import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import NewPostItem from './Pages/CreatePostPage';
import Header from './layout/Header';
import Home from './Pages/Home';
import PostDetailPage from './Pages/PostDetailPage';




function App() {
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  
  return (
    <>
<ThemeProvider theme={theme}>
    <CssBaseline />
    <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
    <Container>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/post" element={<NewPostItem  />} />
    <Route path="/posts/:id" element={<PostDetailPage />} />
    </Routes>
    </Container>
    </ThemeProvider>
    </>
  );
}

export default App;
