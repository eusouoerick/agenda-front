import { format } from "date-fns";
import { GET_SCHEDULES } from "./schemas/schedules";

// remove todas as referências de um objeto no ApolloCache
export default function removeAllRefs(cache, item) {
  sameService(cache, item);
  sameDate(cache, item);
  sameServiceDate(cache, item);
  removeAll(cache, item);
}

const SCHEMA = GET_SCHEDULES("_id");

const sameService = (cache, { _id: id, service: { _id: service } }) => {
  try {
    const { schedules } = cache.readQuery({
      query: SCHEMA,
      variables: { service, date: "" },
    });
    cache.writeQuery({
      query: SCHEMA,
      variables: { service, date: "" },
      data: {
        schedules: schedules.filter((schedule) => schedule._id !== id),
      },
    });
  } catch (error) {}
};

const sameDate = (cache, { _id: id, date }) => {
  try {
    const toDate = format(new Date(date), "yyyy-MM-dd");
    const { schedules } = cache.readQuery({
      query: SCHEMA,
      variables: { service: "all", date: toDate },
    });
    cache.writeQuery({
      query: SCHEMA,
      variables: { service: "all", date: toDate },
      data: {
        schedules: schedules.filter((schedule) => schedule._id !== id),
      },
    });
  } catch (error) {}
};

const sameServiceDate = (cache, { _id: id, service: { _id: service }, date }) => {
  try {
    const toDate = format(new Date(date), "yyyy-MM-dd");
    const { schedules } = cache.readQuery({
      query: SCHEMA,
      variables: { service, date: toDate },
    });
    cache.writeQuery({
      query: SCHEMA,
      variables: { service, date: toDate },
      data: {
        schedules: schedules.filter((schedule) => schedule._id !== id),
      },
    });
  } catch (error) {}
};

const removeAll = (cache, { _id: id }) => {
  try {
    const { schedules } = cache.readQuery({
      query: SCHEMA,
      variables: { service: "all", date: "" },
    });
    cache.writeQuery({
      query: SCHEMA,
      variables: { service: "all", date: "" },
      data: {
        schedules: schedules.filter((schedule) => schedule._id !== id),
      },
    });
  } catch (error) {}
};
