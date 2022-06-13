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

export const DELETE_SCHEDULE = gql`
  mutation deleteSchedule($id: ID!) {
    deleteSchedule(id: $id)
  }
`;
