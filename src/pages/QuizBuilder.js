import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/auth';
import { gql, useQuery, useMutation } from '@apollo/client';

const QuizBuilder = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col">
            col
          </div>
          <div className="col-1">
            col
          </div>
        </div>
        <div className="row">
          2-col
        </div>
      </div>
    </div>
  )
}

export default QuizBuilder;