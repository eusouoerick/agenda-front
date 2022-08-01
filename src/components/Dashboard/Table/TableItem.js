import { memo, useCallback } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_SCHEDULE } from "../../../graphql/schemas/schedules";
import removeAllRefs from "../../../graphql/removeAllRefs";
import classnames from "classnames";
import { format } from "date-fns";

// componente de paginação
import { Waypoint } from "react-waypoint";

const TableItem = ({ item, req, handlePage }) => {
  const [deleteSchedule] = useMutation(DELETE_SCHEDULE);

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

  return (
    <>
      <tr>
        <td className='focus'>{item.createdBy.name.split(" ")[0]}</td>
        <td className='blur'>{item.createdBy.contact}</td>
        <td>{item.service.name}</td>
        <td style={{ padding: "10px 0" }}>
          <span
            style={{ textTransform: "capitalize" }}
            className={classnames("status", {
              completed: item.status === "completed",
              cancelled: item.status === "cancelled",
            })}
          >
            {item.status}
          </span>
        </td>
        <td className='blur align-itens'>
          <span>
            {format(new Date(item.date), "H") +
              "h" +
              (+format(new Date(item.date), "mm") || "")}
          </span>
          <span className=''>{format(new Date(item.date), "dd/MM/yyyy")}</span>
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
          min-width: 98px;
          font-size: 13px;
          font-weight: 600;
          border-radius: 9999px;
          padding: 6px 15px;
          background-color: var(--pending-background);
          color: var(--color-pending);
        }
        .status.completed {
          background-color: var(--completed-background);
          color: var(--color-completed);
        }
        .status.cancelled {
          background-color: var(--cancelled-background);
          color: var(--color-cancelled);
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
