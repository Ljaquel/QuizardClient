import React, { useContext, useState } from 'react'
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';

const Register = (props) => {
  const context = useContext(AuthContext);

  const [values, setValues] = useState({
    username:'',
    password:'',
    email:'',
    confirmPassword:''
  })
  const onChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value});
  }

  const [addUser] = useMutation(REGISTER_USER, {
    update(_, data) {
      context.login(data.data.register);
      props.history.push('/');
    },
    onError(err) {
    },
    variables: values
  });

  const onSubmit = e => {
    e.preventDefault();
    addUser();
  }

  return (
    <div className="container p-5">
      <div className="container-fluid bg-light p-5 mt-5" style={{maxWidth:"700px"}}>
      <div className="container mb-5"><h1>Register</h1></div>
        <div className="m-3 row justify-content-center">
          <label className="form-label col-4">Username</label>
          <input type="username" name="username" className="form-control col" id="usernameInput"
            value={values.username} onChange={onChange}/>
        </div>
        <div className="m-3 row justify-content-center">
          <label className="form-label col-4">Email address</label>
          <input type="email" name="email" className="form-control col" id="emailInput"
            value={values.email} onChange={onChange}/>
        </div>
        <div className="m-3 row justify-content-center">
          <label className="form-label col-4">Password</label>
          <input type="password" name="password" className="form-control col" id="passwordInput"
            value={values.password} onChange={onChange}/>
        </div>
        <div className="m-3 row justify-content-center">
          <label className="form-label col-4">Confirm Password</label>
          <input type="password" name="confirmPassword" className="form-control col" id="passwordInput2"
            value={values.confirmPassword} onChange={onChange}/>
        </div>
        <div className="m-3 row justify-content-end">
          <button className="btn btn-primary col-2" name="submit" type="login" onClick={onSubmit}>Submit</button>
        </div>
      </div>
    </div>
  )
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;