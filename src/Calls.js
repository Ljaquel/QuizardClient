import { gql } from '@apollo/client';

const FETCH_QUIZZES_QUERY = gql`
  query fetchQuizzesQuery($filters: QuizInput){
    getQuizzes(filters: $filters) {
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
  }
`;

const FETCH_QUIZ_QUERY = gql`
  query fetchQuizQuery($quizId: ID!) {
    getQuiz(quizId: $quizId) {
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
  }
`;

const CREATE_QUIZ = gql`
  mutation createQuizMutation($name: String!, $creator: String!){
    createQuiz(name: $name, creator: $creator) {
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
  }
`

const DELETE_QUIZ_MUTATION = gql`
  mutation deleteQuizMutation($quizId: ID!) {
    deleteQuiz(quizId: $quizId) {
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
  }
`;

const UPDATE_QUIZ_MUTATION = gql`
  mutation updateQuizMutation($quizId: ID!, $update: QuizInput) {
    updateQuiz(quizId: $quizId, update: $update) {
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
  }
`

const LOGIN_USER = gql`
  mutation loginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      _id
      email
      username
      createdAt
      token
    }
  }
`;

const REGISTER_USER = gql`
  mutation registerUser(
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
      _id
      email
      username
      createdAt
      token
    }
  }
`;

export { 
  FETCH_QUIZZES_QUERY,
  FETCH_QUIZ_QUERY,
  CREATE_QUIZ,
  DELETE_QUIZ_MUTATION,
  UPDATE_QUIZ_MUTATION,
  LOGIN_USER,
  REGISTER_USER
}