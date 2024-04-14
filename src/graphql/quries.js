import { gql } from "@apollo/client";

// Get users
export const GET_USERS = gql`
  query GetUsers($page: Int, $perPage: Int, $sort: SortInput) {
    getUsers(pagination: { page: $page, limit: $perPage }, sort: $sort) {
      status
      success
      data {
        _id
        username
        email
        address
      }
      pageInfo {
        totalUsers
        totalPages
        currentPage
      }
    }
  }
`;
// Get single users
export const GET_SINGLE_USER = gql`
  query GetUser($userID: ID!) {
    getUser(ID: $userID) {
      status
      success
      user {
        _id
        username
        email
        address
      }
    }
  }
`;
// Create user
export const CREATE_USER = gql`
  mutation CreateUser($userInput: UserInput!) {
    createUser(userInput: $userInput) {
      status
      success
      message
      data {
        _id
        username
        email
        address
      }
    }
  }
`;
// Update user
export const UPDATE_USER = gql`
  mutation UpdateUser($userID: ID!, $userInput: UpdateUserInput!) {
    updateUser(ID: $userID, userInput: $userInput) {
      status
      success
      message
      user {
        _id
        username
        email
        address
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($userID: ID!) {
    deleteUser(ID: $userID) {
      status
      success
      message
      user {
        _id
        username
        email
        address
      }
    }
  }
`;
// Login users
export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      status
      success
      user {
        _id
        username
        email
        address
        role
      }
      token
      message
    }
  }
`;
