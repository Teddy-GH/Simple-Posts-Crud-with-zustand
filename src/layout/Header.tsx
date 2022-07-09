import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Button, ListItem } from '@mui/material';

export default function ButtonAppBar() {
  const navStyles = {
    color:'inherit',
     typography:'h6',
      '&:hover':{
        color:'grey.500'
      },
      '&.active':{
        color:'text.secondary'
      }
  }
    
  return (
   
     <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar sx={{display: 'flex', justifyContent:'space-between', alignItems:'center'}}>
        <Box display='flex' alignItems='center'
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >  
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <ListItem sx={{navStyles}} component={Link} to='/'>Simple React Crud</ListItem>
          </Typography>
            </Box>
          <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/post"
            >
              Create Post
            </Button>
        </Toolbar>
      </AppBar>
  );
}
