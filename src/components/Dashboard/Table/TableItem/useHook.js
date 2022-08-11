import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import removeAllRefs from "../../../../graphql/removeAllRefs";
import {
  DELETE_SCHEDULE,
  UPDATE_SCHEDULE,
} from "../../../../graphql/schemas/schedules";

// graphql
const UPDATE_SCHEMA = UPDATE_SCHEDULE("_id", "status");
const fetchPolicy = { fetchPolicy: "network-only" };

const useHook = ({ item, status, setStatus }) => {
  const { adm } = useSelector((state) => state.user);
  const [updateSchedule, { loading }] = useMutation(UPDATE_SCHEMA, fetchPolicy);
  const [deleteSchedule] = useMutation(DELETE_SCHEDULE, fetchPolicy);

  const handleDelete = useCallback(
    async (id) => {
      await deleteSchedule({
        variables: { id },
        update(cache) {
          cache.evict({ id: `Schedules:${id}` });
          removeAllRefs(cache, item);
        },
      });
    },
    [deleteSchedule, item]
  );

  // Atualiza o status do agendamento
  const handleUpdate = useCallback(() => {
    const nextStatus = {
      pending: "completed",
      completed: "cancelled",
      cancelled: "pending",
    };
    if (adm) {
      updateSchedule({
        variables: { id: item._id, data: nextStatus[status] },
      }).then(({ data: { updateStatusSchedule } }) => {
        setStatus(() => updateStatusSchedule.status);
      });
    }
  }, [status, updateSchedule, item, setStatus, adm]);

  return { handleUpdate, handleDelete, loading };
};

export default useHook;
