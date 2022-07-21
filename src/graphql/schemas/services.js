import { gql } from "@apollo/client";
import getFields from "get-fields";

export function GET_SERVICES() {
  const fields = getFields(arguments);
  return gql`
    query GetServices {
      services {
        ${fields}
      }
    }`;
}

export const CREATE_SERVICE = (...args) => {
  const fields = getFields(args);
  return gql`
    mutation CreateService($data: ServiceInput!) {
      createService(data: $data) {
        ${fields}
      }
    }
  `;
};

export const DELETE_SERVICE = () => {
  return gql`
    mutation DeleteService($id: ID!) {
      deleteService(id: $id)
    }
  `;
};
