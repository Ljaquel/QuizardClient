import React from 'react';
import { Home, Login, Register, QuizBuilder, PageNotFound } from './pages/index';
import Navbar from './components/Navbar';
import { AuthRoute, NoAuthRoute } from './util/AuthRoute';
import { AuthProvider } from './context/auth';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar/>
        <Switch>
          <Route exact path='/' component={Home}/>
          <NoAuthRoute exact path='/login' component={Login}/>
          <NoAuthRoute exact path='/register' component={Register}/>
          <AuthRoute exact path='/quizbuilder/:id' component={QuizBuilder}/>
          <Route component={PageNotFound}></Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
