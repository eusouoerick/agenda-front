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

export const GET_USER = (...args) => {
  const fields = getFields(args);
  return gql`
    query GetUser {
      getUser {
       ${fields}
      }
    }
  `;
};
