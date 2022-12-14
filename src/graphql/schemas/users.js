import { gql } from "@apollo/client";
import getFields from "get-fields";

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

export const GET_ALL_USERS = (...args) => {
  const fields = getFields(args);
  return gql`
    query{
      users {
        ${fields}
      }
    }`;
};

export const GET_USER = (...args) => {
  const fields = getFields(args);
  return gql`
    query GetUser($id: ID) {
      getUser(id: $id) {
       ${fields}
      }
    }
  `;
};

export const UPDATE_USER = (...args) => {
  const fields = getFields(args);
  return gql`
    mutation UpdateUser($data: UserInput) {
      updateUser(data: $data) {
        ${fields}
      }
    }
  `;
};
