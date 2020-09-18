import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import Test from './components/Test';
import Maps from './components/Maps'
import SidePanel from './components/SidePanel'


function App() {

  return (
    <Router>
      <Maps/>
      <SidePanel/>
      <div className="container">
        <h2>MERN-Stack Test App</h2>
      </div>
      <Route path='/' exact component={Test} />
      {/* <Route path='/test/edit:id' exact component={Test} /> */}
    </Router>
  );
}

export default App;
