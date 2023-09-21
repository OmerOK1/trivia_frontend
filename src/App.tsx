import { Outlet, useNavigate } from 'react-router-dom';
import './App.css';
import Routing from './Components/Utils/Routing/Routing';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


function App() {
  const navigate = useNavigate();
  return (
    <div>
      <CssBaseline />
      <Container className='mui' id="mui-parent-div" disableGutters maxWidth={false} sx={{ bgcolor: '#cfe8fc', height: '100vh', textAlign: 'center' }}>
        <Box onClick={() => navigate("/")} bgcolor={'#424242'} color={'white'} sx={{ textAlign: 'center' }}>
          <Typography variant='h1' sx={{cursor: 'pointer'}} >OK-Trivia</Typography>
        </Box>
        <Routing />
        <Outlet />
        <footer>footer</footer>
      </Container>
    </div>
  );
}

export default App;
