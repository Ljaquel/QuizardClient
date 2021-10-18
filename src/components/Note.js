import React, {useContext} from 'react';
import moment from 'moment';
import { gql, useMutation } from '@apollo/client';
import { AuthContext } from '../context/auth';

function Note({note: {id, body, username, createdAt}}) {
  const { user } = useContext(AuthContext);

  const [deleteNote] = useMutation(DELETE_NOTE, {
    update(proxy) {
      const data = proxy.readQuery({
        query: FETCH_NOTES_QUERY
      })
      proxy.writeQuery({
        query: FETCH_NOTES_QUERY,
        data: {
          getNotes: data.getNotes.filter((n) => n.id !== id)
        }
      })
    },
    onError(err) {
      console.log(err);
    },
    variables: {
      noteId: id
    }
  });

  return (
    <div className="card m-2 p-1" style={{width: "15rem"}}>
      <div className="card-body">
        <h6 className="card-subtitle text-muted">{username}</h6>
        <h6 className="col card-subtitle text-muted">{moment(createdAt).fromNow()}</h6>
        <p className="card-text mt-4">{body}</p>
        {user && user.username === username && <button className="btn btn-sm btn-danger" style={{float:"right"}} onClick={deleteNote}>X</button> }
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

const DELETE_NOTE = gql`
  mutation deleteNote($noteId: ID!){
    deleteNote(noteId: $noteId)
  }
`

export default Note;