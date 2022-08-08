import { memo, useState } from "react";
import { format } from "date-fns";
import classnames from "classnames";
import useHook from "./useHook";

// componente de paginação
import { Waypoint } from "react-waypoint";

const TableItem = ({ item, req, handlePage }) => {
  const [status, setStatus] = useState(item.status);
  const { handleUpdate, handleDelete, loading } = useHook({ item, status, setStatus });

  return (
    <>
      <tr>
        <td className='focus'>{item.createdBy.name.split(" ")[0]}</td>
        <td className='blur'>{item.createdBy.contact}</td>
        <td>{item.service.name}</td>
        <td style={{ padding: "10px 0" }}>
          <button
            style={{ textTransform: "capitalize" }}
            className={classnames("status", {
              completed: status === "completed",
              cancelled: status === "cancelled",
            })}
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? "Loading..." : status}
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
