import { gql } from "@apollo/client";
import getFields from "get-fields";

export const GET_SCHEDULES = (...args) => {
  const fields = getFields(args);
  return gql`
    query GetSchedules($page: Int, $service: ID, $date: String, $status: [String!]) {
      schedules(page: $page, service: $service, date: $date, status: $status) {
        ${fields}
      }
    }
  `;
};

export const UPDATE_SCHEDULE = (...args) => {
  const fields = getFields(args);
  return gql`
    mutation updateSchedule($id: ID!, $data: String!) {
      updateStatusSchedule(id: $id, data: $data) {
        ${fields}
      }
    }
  `;
};

export const CREATE_SCHEDULE = (...args) => {
  const fields = getFields(args);
  return gql`
    mutation CreateSchedule($data: SchedulesInput!) {
      createSchedule(data: $data) {
        ${fields}
      }
    }
`;
};

export const DELETE_SCHEDULE = gql`
  mutation deleteSchedule($id: ID!) {
    deleteSchedule(id: $id)
  }
`;
