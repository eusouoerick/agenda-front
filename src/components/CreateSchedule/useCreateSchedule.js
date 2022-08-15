import { useCallback } from "react";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@apollo/client";
import { GET_SERVICES } from "../../graphql/schemas/services";
import { CREATE_SCHEDULE } from "../../graphql/schemas/schedules";

// get-fields - https://github.com/eusouoerick/get-fields
const SCHEMA = [
  "_id",
  { name: "createdBy", items: ["_id", "name", "contact"] },
  { name: "service", items: ["_id", "name", "price", "duration"] },
  "date",
  "status",
];
const useCreateSchedule = ({ closeCreator, inputs: { date, time, service } }) => {
  const { data, loading: servicesLoading } = useQuery(
    GET_SERVICES("_id", "name", "price")
  );
  const [createSchedule, { error: createError, loading: loadingCreator }] =
    useMutation(
      CREATE_SCHEDULE(...SCHEMA) // fields que vão ser retornados da consulta;
    );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      createSchedule({
        variables: {
          data: {
            service: service.current.value,
            date: new Date(`${date.current.value} ${time.current.value}`),
          },
        },
        // refetchQueries: [
        //   // {
        //   //   query: GET_SCHEDULES(...SCHEMA),
        //   //   variables: { service: "all", date: "" },
        //   // },
        // ],
        onCompleted: () => {
          closeCreator();
          toast("Agendamento criado com sucesso!", {
            type: "success",
            position: "top-right",
            autoClose: 2000,
            theme: "dark",
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        },
        onError: (error) => console.log(error.message),
      });
    },
    [createSchedule, service, date, time, closeCreator]
  );

  return { handleSubmit, data, servicesLoading, loadingCreator, createError };
};

export default useCreateSchedule;
