import React, { useContext, useState } from 'react'
import Note from '../components/Note';
import { AuthContext } from '../context/auth';
import { gql, useQuery, useMutation } from '@apollo/client';

const Home = () => {
  const { user } = useContext(AuthContext);
  const [body, setBody] = useState("");
  
  const [addNote] = useMutation(CREATE_NOTE, {
    variables: { body },
    update(proxy, result){
      proxy.writeQuery({
        query: FETCH_NOTES_QUERY,
        data: {
          getNotes: [result.data.createNote, ...data.getNotes]
        }
      })
      setBody("");
    }
  });

  const { data } = useQuery(FETCH_NOTES_QUERY);
  if(!data) { return <div></div> }
  const { getNotes: notes } = data;

  const onAdd = () => {
    addNote();
  }

  const onChange = e => {
    setBody(e.target.value);
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <h1 className="mt-3 mb-4 col-3">Recent Notes</h1>
          <div className="col">
            {user &&
              <input type="body" name="body" className="form-control mt-4" id="bodyInput" value={body} onChange={onChange}/>
            }
          </div>
          <div className="col-1">
            {user &&
            <button type="button" className="btn btn-info btn-lg mt-3" onClick={onAdd}>
              Add
            </button>
            }
          </div>
        </div>
        <div className="row">
          {notes.map((note, index) => <Note key={index} note={note}/>)}
        </div>
      </div>
    </div>
  )
}

const FETCH_NOTES_QUERY = gql`
  {
    getNotes {
      id
      body
      username
      createdAt
    }
  }
`;

const CREATE_NOTE = gql`
  mutation createNote($body: String!){
    createNote(body: $body) {
      id
      body
      createdAt
      username
    }
  }
`
export default Home;