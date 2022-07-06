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
