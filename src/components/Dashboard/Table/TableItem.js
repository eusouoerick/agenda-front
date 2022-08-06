import { memo, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useMutation, useLazyQuery, gql } from "@apollo/client";
import classnames from "classnames";
import { format } from "date-fns";
import removeAllRefs from "../../../graphql/removeAllRefs";
import {
  DELETE_SCHEDULE,
  GET_SCHEDULE_BY_ID,
} from "../../../graphql/schemas/schedules";

// componente de paginação
import { Waypoint } from "react-waypoint";

// graphql schema
const GET_SCHEDULE_SCHEMA = GET_SCHEDULE_BY_ID("_id", "status");
const UPDATE_SCHEMA = gql`
  mutation updateSchedule($id: ID!, $data: String!) {
    updateStatusSchedule(id: $id, data: $data) # data = status
  }
`;
const fetchPolicy = {
  fetchPolicy: "network-only",
};

const TableItem = ({ item, req, handlePage }) => {
  const { adm } = useSelector((state) => state.user);
  const [status, setStatus] = useState(item.status);

  const [updateSchedule, { loading }] = useMutation(UPDATE_SCHEMA, fetchPolicy);
  const [deleteSchedule] = useMutation(DELETE_SCHEDULE, fetchPolicy);
  const [getSchedule, { loading: btnDisabled }] = useLazyQuery(
    GET_SCHEDULE_SCHEMA,
    fetchPolicy
  );

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

  // função para atualizar o status do agendamento
  const handleUpdate = useCallback(() => {
    const nextStatus = {
      pending: "completed",
      completed: "cancelled",
      cancelled: "pending",
    };
    if (adm) {
      updateSchedule({
        variables: { id: item._id, data: nextStatus[status] },
      }).then(({ data: updateStatusSchedule }) => {
        if (updateStatusSchedule) {
          // atuliaza o cache com o novo status
          getSchedule({
            variables: { id: item._id },
          }).then(({ data: { getSchedule } }) => {
            setStatus(() => getSchedule.status);
          });
        }
      });
    }
  }, [status, updateSchedule, item, setStatus, getSchedule, adm]);

  return (
    <>
      <tr>
        <td className='focus'>{item.createdBy.name.split(" ")[0]}</td>
        <td className='blur'>{item.createdBy.contact}</td>
        <td>{item.service.name}</td>
        <td style={{ padding: "10px 0" }}>
          <button
            style={{ textTransform: "capitalize", cursor: adm ? "pointer" : "auto" }}
            className={classnames("status", {
              completed: status === "completed",
              cancelled: status === "cancelled",
            })}
            onClick={handleUpdate}
            disabled={loading || btnDisabled}
          >
            {loading || btnDisabled ? "Loading..." : status}
          </button>
        </td>
        <td className='blur align-itens'>
          <span>
            {format(new Date(item.date), "H") +
              "h" +
              (+format(new Date(item.date), "mm") || "")}
          </span>
          <span>{format(new Date(item.date), "dd/MM/yyyy")}</span>
        </td>
        <td>R$ {item.service.price.toString().replace(".", ",")}</td>
        <td>
          <button className='delete' onClick={() => handleDelete(item._id)}>
            <span className='material-icons'>close</span>
          </button>
          {req && <Waypoint onEnter={() => handlePage()} />}
        </td>
      </tr>

      <style jsx>{`
        td {
          display: table-cell;
          text-align: center;
          padding: 15px 10px;
        }
        td {
          border-bottom: var(--gray-border);
        }
        .focus {
          font-weight: bold;
          text-transform: capitalize;
        }
        .blur {
          color: hsla(337, 7%, 36%, 1);
        }
        .status {
          min-width: 100px;
          font-size: 13px;
          font-weight: 600;
          border-radius: 9999px;
          padding: 6px 15px;
          background-color: var(--pending-background);
          color: var(--color-pending);
          border: 1px solid var(--pending-border);
          transition: background 0.3s;
          transition: color 0.3s;
          transition: background-color 0.3s;
        }
        .status.completed {
          background-color: var(--completed-background);
          color: var(--color-completed);
          border-color: var(--completed-border);
        }
        .status.cancelled {
          background-color: var(--cancelled-background);
          color: var(--color-cancelled);
          border-color: var(--cancelled-border);
        }
        .status:disabled {
          background-color: #ccc;
          color: #343434;
          border-color: #afafaf;
        }

        button.delete {
          padding: 0px;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: hsla(337, 7%, 36%, 1);
        }
        button.delete:hover {
          color: var(--color-cancelled);
        }
        td.align-itens {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </>
  );
};

export default memo(TableItem);
