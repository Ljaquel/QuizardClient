import React from 'react';
import { Home, Login, Register, QuizBuilder, PageNotFound, Profile, QuizScreen, Settings, SearchScreen, GuestProfile } from './pages/index';
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
          <AuthRoute exact path='/quizbuilder/:_id' component={QuizBuilder}/>
          <AuthRoute exact path='/profile' component={Profile}/>
          <AuthRoute exact path='/guestprofile/:_id' component={GuestProfile}/>
          <AuthRoute exact path='/quizscreen/:_id' component={QuizScreen}/>
          <AuthRoute exact path='/searchscreen' component={SearchScreen}/>
          <AuthRoute exact path='/settings' component={Settings}/>
          <Route component={PageNotFound}></Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
