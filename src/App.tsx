import { Outlet } from 'react-router-dom';
import './App.css';
import Routing from './Components/Routing/Routing';

function App() {
  return (
    <div className="App">
      
      <Routing/>
      <Outlet/>
      <div className='footer'>footer</div>
    </div>
  );
}

export default App;
