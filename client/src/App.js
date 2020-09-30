import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import Test from './components/Test';
import Maps from './components/Maps'
import SidePanel from './components/SidePanel'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

function App() {

  return (
    <div>
      <Maps/>
      <SidePanel/>
      {/* <div className="container">
        <h2>MERN-Stack Test App</h2>
      </div>
      <Route path='/' exact component={Test} /> */}
      {/* <Route path='/test/edit:id' exact component={Test} /> */}
    </div>
  );
}

export default App;
