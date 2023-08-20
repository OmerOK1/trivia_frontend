//import React from 'react';
//import logo from './logo.svg';
import { Outlet } from 'react-router-dom';
import './App.css';
import Landing from './Components/LandingPage/Landing';
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
