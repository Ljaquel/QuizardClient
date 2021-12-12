import { gql } from "@apollo/client";

const PLATFORM_ATTRIBUTES = gql`
  fragment platformAttributes on Platform {
    _id
    name
    description
    creator {
      _id
      name
      username
    }
    rating
    ratingCount
    image {
      publicId
      url
    }
    banner {
      publicId
      url
    }
    bannerColor
    following
    followers
    createdAt
  }
`;

const QUIZ_ATTRIBUTES = gql`
  fragment quizAttributes on Quiz {
    _id
    name
    description
    publishedDate
    published
    creator {
      _id
      name
      username
    }
    platform {
      _id
      name
    }
    timesPlayed
    usersThatPlayed
    time
    rating
    ratingCount
    difficulty
    comments {
      _id
      body
      user {
        _id
        name
        username
      }
      createdAt
    }
    style {
      color
      questionColor
      backgroundColor
      choiceColor
    }
    tags
    category
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
    thumbnail {
      publicId
      url
    }
    backgroundImage {
      publicId
      url
    }
    createdAt
  }
`;

const USER_ATTRIBUTES = gql`
  fragment userAttributes on User {
    _id
    email
    username
    name
    level
    points
    color
    avatar {
      publicId
      url
    }
    createdAt
    following
    followers
  }
`;

const RESULT_ATTRIBUTES = gql`
  fragment resultAttributes on Result {
    _id
    userId
    quizId
    score
    time
    timesTaken
    badges
    record
    last
    lastTime
    lastRecord
    rating
    bestAttemptAt
    modifiedAt
    createdAt
  }
`;

export const FETCH_SEARCH_RESULTS_QUERY = gql`
  query getSearchResultsQuery($query: String!, $searchFilter: String) {
    getSearchResults(query: $query, searchFilter: $searchFilter) {
      ... on User {
        ...userAttributes
      }
      ... on Quiz {
        ...quizAttributes
      }
      ... on Platform {
        ...platformAttributes
      }
    }
  }
  ${USER_ATTRIBUTES}
  ${QUIZ_ATTRIBUTES}
  ${PLATFORM_ATTRIBUTES}
`;

export const FETCH_USER_QUERY = gql`
  query fetchUserQuery($userId: ID!) {
    getUser(userId: $userId) {
      ...userAttributes
    }
  }
  ${USER_ATTRIBUTES}
`;

export const FETCH_QUIZZES_QUERY = gql`
  query fetchQuizzesQuery($filters: QuizInput) {
    getQuizzes(filters: $filters) {
      ...quizAttributes
    }
  }
  ${QUIZ_ATTRIBUTES}
`;

export const FETCH_QUIZ_QUERY = gql`
  query fetchQuizQuery($quizId: ID!) {
    getQuiz(quizId: $quizId) {
      ...quizAttributes
    }
  }
  ${QUIZ_ATTRIBUTES}
`;

export const FETCH_PLATFORMS = gql`
  query fetchPlatforms($filters: PlatformInput) {
    getPlatforms(filters: $filters) {
      ...platformAttributes
    }
  }
  ${PLATFORM_ATTRIBUTES}
`;

export const FETCH_PLATFORM = gql`
  query fetchPlatform($platformId: ID!) {
    getPlatform(platformId: $platformId) {
      ...platformAttributes
    }
  }
  ${PLATFORM_ATTRIBUTES}
`;

export const FETCH_RESULTS_QUERY = gql`
  query fetchResultsQuery($filters: ResultInput) {
    getResults(filters: $filters) {
      ...resultAttributes
    }
  }
  ${RESULT_ATTRIBUTES}
`;

export const CREATE_COMMENT = gql`
  mutation createComment($quizId: ID!, $user: ID!, $body: String!) {
    createComment(quizId: $quizId, user: $user, body: $body)
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($quizId: ID!, $commentId: ID!) {
    deleteComment(quizId: $quizId, commentId: $commentId)
  }
`;

export const CREATE_RESULT = gql`
  mutation createResult($input: ResultInput) {
    createResult(input: $input) {
      ...resultAttributes
    }
  }
  ${RESULT_ATTRIBUTES}
`;

export const DELETE_RESULT = gql`
  mutation deleteResult($resultId: ID!) {
    deleteResult(resultId: $resultId) {
      ...resultAttributes
    }
  }
  ${RESULT_ATTRIBUTES}
`;

export const UPDATE_RESULT = gql`
  mutation updateResult($resultId: ID!, $update: ResultInput) {
    updateResult(resultId: $resultId, update: $update) {
      ...resultAttributes
    }
  }
  ${RESULT_ATTRIBUTES}
`;

export const DELETE_RESULTS = gql`
  mutation deleteResults($filter: ResultInput) {
    deleteResults(filter: $filter)
  }
`;

export const CREATE_QUIZ = gql`
  mutation createQuizMutation(
    $name: String!
    $creatorId: String!
    $platformId: String!
  ) {
    createQuiz(name: $name, creatorId: $creatorId, platformId: $platformId)
  }
`;

export const DELETE_QUIZ_MUTATION = gql`
  mutation deleteQuizMutation($quizId: ID!) {
    deleteQuiz(quizId: $quizId)
  }
`;

export const UPDATE_QUIZ_MUTATION = gql`
  mutation updateQuizMutation($quizId: ID!, $update: QuizInput) {
    updateQuiz(quizId: $quizId, update: $update)
  }
`;

export const CREATE_PLATFORM = gql`
  mutation createPlatform($name: String!, $creatorId: String!) {
    createPlatform(name: $name, creatorId: $creatorId)
  }
`;

export const DELETE_PLATFORM = gql`
  mutation deletePlatform($platformId: ID!) {
    deletePlatform(platformId: $platformId)
  }
`;

export const UPDATE_PLATFORM = gql`
  mutation updatePlatform($platformId: ID!, $update: PlatformInput) {
    updatePlatform(platformId: $platformId, update: $update)
  }
`;

export const UPDATE_IMAGE = gql`
  mutation updateImage(
    $type: String!
    $_id: ID!
    $field: String!
    $publicId: String!
    $url: String!
  ) {
    updateImage(
      type: $type
      _id: $_id
      field: $field
      publicId: $publicId
      url: $url
    )
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($userId: ID!, $update: UserInput) {
    updateUser(userId: $userId, update: $update)
  }
`;

export const LOGIN_USER = gql`
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
      avatar {
        publicId
        url
      }
      createdAt
    }
  }
`;

export const REGISTER_USER = gql`
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
      avatar {
        publicId
        url
      }
      createdAt
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation changePassword($newPassword: String!, $confirmPassword: String!) {
    changePassword(newPassword: $newPassword, confirmPassword: $confirmPassword)
  }
`;

export const FETCH_FEATURED_QUIZZES = gql`
  query fetchFeaturedQuizzesQuery($filters: QuizInput) {
    getQuizzes(filters: $filters) {
      ...quizAttributes
    }
  }
  ${QUIZ_ATTRIBUTES}
`;

export const FETCH_TRENDING_QUIZZES = gql`
  query fetchTrendingQuizzesQuery($filters: QuizInput) {
    getQuizzes(filters: $filters) {
      ...quizAttributes
    }
  }
  ${QUIZ_ATTRIBUTES}
`;
