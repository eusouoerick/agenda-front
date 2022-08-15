import {  useCallback } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_SERVICE, GET_SERVICES } from "../../../../../graphql/schemas/services";

const useDropMenu = ({ id }) => {
  const [deleteService] = useMutation(DELETE_SERVICE());

  const handleDelete = useCallback(() => {
    deleteService({
      variables: { id },
      update: (cache) => {
        const { services } = cache.readQuery({ query: GET_SERVICES("_id") });
        cache.writeQuery({
          query: GET_SERVICES("_id"),
          data: { services: services.filter((service) => service._id !== id) },
        });
      },
    });
  }, [deleteService, id]);

  return { handleDelete };
};

export default useDropMenu;
