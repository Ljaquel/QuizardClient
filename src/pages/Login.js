import React, { useContext, useState } from 'react'
import { useMutation } from '@apollo/client';

import { AuthContext } from '../context/auth';
import { LOGIN_USER } from '../Calls'

const Login = (props) => {
  const context = useContext(AuthContext);

  const [values, setValues] = useState({
    username:'',
    password:'',
    error: null,
  })

  const onChange = e => {
    if (values.error) {
      setValues({ ...values, [e.target.name]: e.target.value, error: null});
    }
    else {
      setValues({ ...values, [e.target.name]: e.target.value});
    }
  }

  const [loginUser] = useMutation(LOGIN_USER, {
    update( _, data) {
      context.login(data.data.login);
      props.history.push('/');
    },
    onError(err) {
      console.log(err)
      setValues({ ...values, error: err});
    },
    variables: values
  });

  const onSubmit = e => {
    e.preventDefault();
    loginUser();
  }
  
  return (
    <div className="container p-5">
      <div className="container-fluid bg-light p-5 mt-5" style={{maxWidth:"700px"}}>
        <div className="container mb-5"><h1>Login</h1></div>
        <div className="m-3 row justify-content-center">
          <label className="form-label col-4">Username</label>
          <input type="username" name="username" className="form-control col" id="usernameInput"
            value={values.username} onChange={onChange}/>
        </div>
        <div className="m-3 row justify-content-center">
          <label className="form-label col-4">Password</label>
          <input type="password" name="password" className="form-control col" id="passwordInput"
            value={values.password} onChange={onChange}/>
        </div>
        <div className="m-3 row justify-content-end">
          <button className="btn btn-primary col-2" type="submit" onClick={onSubmit}>Submit</button>
        </div>
        {values.error && <div className="container mb-5 red">{values.error.message + ". Please try Again!"}</div>}
      </div>
    </div>
  )
}

export default Login;