import { gql } from '@apollo/client';

const QUIZ_ATTRIBUTES = gql`
  fragment quizAttributes on Quiz {
    _id
    name
    description
    publishedDate
    published
    creator
    timesPlayed
    time
    rating
    difficulty
    comments {
      comment
      name
      createdAt
    }
    style {
      color
      questionColor
      backgroundColor
      choiceColor
    }
    tags
    stats {
      averageScore
      lowestScore
      highestScore
      averageTime
    }
    content {
      question
      answer
      choices
    }
    createdAt
  }
`

const USER_ATTRIBUTES = gql`
  fragment userAttributes on User {
    _id
    email
    username
    name
    level
    points
    color
    createdAt
  }
`

const RESULT_ATTRIBUTES = gql`
  fragment resultAttributes on Result {
    _id
    userId
    quizId
    score
    time
    badges
    record
    createdAt
  }
`

const FETCH_SEARCH_RESULTS_QUERY = gql`
  query getSearchResultsQuery($query: String!, $searchFilter: String) {
    getSearchResults(query: $query, searchFilter: $searchFilter) {
      ... on User {
        ...userAttributes
      }
      ... on Quiz {
        ...quizAttributes
      }
    }
  }
  ${USER_ATTRIBUTES}
  ${QUIZ_ATTRIBUTES}
`;

const FETCH_USER_QUERY = gql`
  query fetchUserQuery($userId: ID!){
    getUser(userId: $userId) {
      ...quizAttributes
    }
  }
  ${USER_ATTRIBUTES}
`;

const FETCH_QUIZZES_QUERY = gql`
  query fetchQuizzesQuery($filters: QuizInput){
    getQuizzes(filters: $filters) {
      ...quizAttributes
    }
  }
  ${QUIZ_ATTRIBUTES}
`

const FETCH_QUIZ_QUERY = gql`
  query fetchQuizQuery($quizId: ID!) {
    getQuiz(quizId: $quizId) {
      ...quizAttributes
    }
  }
  ${QUIZ_ATTRIBUTES}
`

const FETCH_RESULTS_QUERY = gql`
  query fetchResultsQuery($filters: ResultInput) {
    getResults(filters: $filters) {
      ...resultAttributes
    }
  }
  ${RESULT_ATTRIBUTES}
`

const CREATE_RESULT = gql`
  mutation createResult($input: ResultInput){
    createResult(input: $input) {
      ...resultAttributes
    }
  }
  ${RESULT_ATTRIBUTES}
`

const DELETE_RESULT = gql`
  mutation deleteResult($resultId: ID!) {
    deleteResult(resultId: $resultId) {
      ...resultAttributes
    }
  }
  ${RESULT_ATTRIBUTES}
`

const UPDATE_RESULT = gql`
  mutation updateResult($resultId: ID!, $update: ResultInput) {
    updateResult(resultId: $resultId, update: $update) {
      ...resultAttributes
    }
  }
  ${RESULT_ATTRIBUTES}
`

const DELETE_RESULTS = gql`
  mutation deleteResults($filter: ResultInput) {
    deleteResults(filter: $filter)
  }
`

const CREATE_QUIZ = gql`
  mutation createQuizMutation($name: String!, $creator: String!){
    createQuiz(name: $name, creator: $creator) {
      ...quizAttributes
    }
  }
  ${QUIZ_ATTRIBUTES}
`

const DELETE_QUIZ_MUTATION = gql`
  mutation deleteQuizMutation($quizId: ID!) {
    deleteQuiz(quizId: $quizId) {
      ...quizAttributes
    }
  }
  ${QUIZ_ATTRIBUTES}
`

const UPDATE_QUIZ_MUTATION = gql`
  mutation updateQuizMutation($quizId: ID!, $update: QuizInput) {
    updateQuiz(quizId: $quizId, update: $update) {
      ...quizAttributes
    }
  }
  ${QUIZ_ATTRIBUTES}
`

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($fields: UserInput) {
    updateUser(fields: $fields) {
      ...userAttributes
    }
  }
  ${USER_ATTRIBUTES}
`
const LOGIN_USER = gql`
  mutation loginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      _id
      email
      username
      token
      name
      level
      points
      color
      createdAt
    }
  }
`;

const REGISTER_USER = gql`
  mutation registerUser(
    $name: String!
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        name: $name
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      _id
      email
      username
      token
      name
      level
      points
      color
      createdAt
    }
  }
`;

const CHANGE_PASSWORD = gql`
  mutation changePassword($newPassword: String!, $confirmPassword: String!) {
    changePassword(newPassword: $newPassword, confirmPassword: $confirmPassword)
}
`

export { 
  FETCH_SEARCH_RESULTS_QUERY,
  FETCH_USER_QUERY,
  FETCH_QUIZZES_QUERY,
  FETCH_QUIZ_QUERY,
  FETCH_RESULTS_QUERY,
  CREATE_QUIZ,
  CREATE_RESULT,
  DELETE_RESULT,
  DELETE_RESULTS,
  UPDATE_RESULT,
  DELETE_QUIZ_MUTATION,
  UPDATE_QUIZ_MUTATION,
  UPDATE_USER_MUTATION,
  LOGIN_USER,
  REGISTER_USER,
  CHANGE_PASSWORD
}