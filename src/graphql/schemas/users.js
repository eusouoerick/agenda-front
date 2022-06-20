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

export function GET_USER() {
  const fields = getFields(arguments);
  return gql`
    query GetUser {
      getUser {
       ${fields}
      }
    }
  `;
}
