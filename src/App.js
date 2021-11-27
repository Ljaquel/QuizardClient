import React from 'react';
import { Home, Login, Register, QuizBuilder, PageNotFound, Platform, Profile, QuizScreen, Settings, SearchScreen } from './pages/index';
import Navbar from './components/Navbar';
import { AuthRoute, NoAuthRoute } from './util/AuthRoute';
import { AuthProvider } from './context/auth';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="container-fluid p-0 d-flex flex-column h-100">
        <Navbar/>
        <Switch>
          <Route exact path='/' component={Home}/>
          <NoAuthRoute exact path='/login' component={Login}/>
          <NoAuthRoute exact path='/register' component={Register}/>
          <AuthRoute exact path='/platform/:_id' component={Platform}/>
          <AuthRoute exact path='/quizbuilder/:_id' component={QuizBuilder}/>
          <AuthRoute exact path='/profile/:_id' component={Profile}/> 
          <AuthRoute exact path='/quizscreen/:_id' component={QuizScreen}/>
          <AuthRoute exact path='/searchscreen' component={SearchScreen}/>
          <AuthRoute exact path='/settings' component={Settings}/>
          <Route component={PageNotFound}></Route>
        </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;