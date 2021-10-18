import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';
import { AuthProvider } from './context/auth';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar/>
        <Route exact path='/' component={Home}/>
        <AuthRoute exact path='/login' component={Login}/>
        <AuthRoute exact path='/register' component={Register}/>
      </Router>
    </AuthProvider>
  );
}

export default App;
