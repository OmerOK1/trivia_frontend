import { Outlet } from 'react-router-dom';
import './App.css';
import Routing from './Components/Routing/Routing';
import { Container, CssBaseline } from '@mui/material';
import { CenterFocusStrongRounded } from '@mui/icons-material';

function App() {
  return (
    <div>
      <CssBaseline />
      <Container id="mui-parent-div" maxWidth={false} sx={{ bgcolor: '#cfe8fc', height: '100vh' , textAlign: 'center'}}>
        <Routing />
        <Outlet />
      </Container>
    </div>
  );
}

export default App;
