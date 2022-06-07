import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($data: CreateUserInput) {
    createUser(data: $data)
  }
`;

export const LOGIN = gql`
  query Login($data: LoginInput) {
    login(data: $data)
  }
`;

export const GET_USER = gql`
  query GetUser {
    getUser {
      _id
      adm
      name
      contact
    }
  }
`;
