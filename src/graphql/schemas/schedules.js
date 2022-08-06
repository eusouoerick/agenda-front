import { gql } from "@apollo/client";
import getFields from "get-fields";

export const GET_SCHEDULES = (...args) => {
  const fields = getFields(args);
  return gql`
    query GetSchedules($page: Int, $service: ID, $date: String) {
      schedules(page: $page, service: $service, date: $date) {
        ${fields}
      }
    }
  `;
};

export const GET_SCHEDULE_BY_ID = (...args) => {
  const fields = getFields(args);
  return gql`
    query GetScheduleById($id: ID!) {
      getSchedule(id: $id) {
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
