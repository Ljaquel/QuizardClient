import React, { useContext, useState } from 'react'
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';

const Login = (props) => {
  const context = useContext(AuthContext);

  const [values, setValues] = useState({
    username:'',
    password:'',
  })

  const onChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value});
  }

  const [loginUser] = useMutation(LOGIN_USER, {
    update( _, data) {
      context.login(data.data.login);
      props.history.push('/');
    },
    onError(err) {
      console.log(err)
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
      </div>
    </div>
  )
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;