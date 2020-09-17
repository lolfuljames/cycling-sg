import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import Test from './components/Test';


function App() {

  return (
    <Router>
      <div className="container">
        <h2>MERN-Stack Test App</h2>
      </div>
      <Route path='/' exact component={Test} />
      {/* <Route path='/test/edit:id' exact component={Test} /> */}
    </Router>
  );
}

export default App;
