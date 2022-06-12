import { gql } from "@apollo/client";

export const GET_SCHEDULES = gql`
  query GetSchedules {
    schedules {
      _id
      createdBy {
        _id
        name
        contact
      }
      service {
        _id
        name
        price
      }
      date
      status
    }
  }
`;

console.log(new Date().toString());
