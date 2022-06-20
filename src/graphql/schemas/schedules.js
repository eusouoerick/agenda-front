import { gql } from "@apollo/client";
import getFields from "get-fields";

export function GET_SCHEDULES() {
  const fields = getFields(arguments);
  return gql`
    query GetSchedules {
      schedules {
        ${fields}
      }
    }
  `;
}

export const DELETE_SCHEDULE = gql`
  mutation deleteSchedule($id: ID!) {
    deleteSchedule(id: $id)
  }
`;
