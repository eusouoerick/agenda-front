import { useMemo } from "react";
import { useQuery } from "@apollo/client/react/hooks";
import { GET_USER } from "../../../graphql/schemas/users";
import classnames from "classnames";
import { format } from "date-fns";

import ThreeDotsLoading from "../../ThreeDotsLoading";
import WindowBlur from "../../windowBlur";

const UserModal = ({ setModal, userId }) => {
  const SHEMA = useMemo(
    () =>
      GET_USER("name", "email", "phone", {
        name: "schedules",
        items: ["_id", "date", "status", { name: "service", items: ["name"] }],
      }),
    []
  );
  const { data, loading } = useQuery(SHEMA, {
    variables: { id: userId },
    nextFetchPolicy: "network-only",
  });

  return (
    <>
      <WindowBlur setChildrenState={setModal}>
        <div className='user-modal'>
          {loading ? (
            <div className='loading'>
              <ThreeDotsLoading />
            </div>
          ) : (
            <>
              <button className='close' onClick={setModal}>
                <span className='material-icons'>close</span>
              </button>
              <div className='modal-user-info'>
                <div className='contact'>
                  <span className='name'>{data.getUser?.name}</span>
                  <div className='blur'>
                    {data.getUser?.email && <span>email: {data.getUser.email}</span>}
                    {data.getUser?.phone && <span>phone: {data.getUser.phone}</span>}
                    <span>
                      #id: <span className='id'>{userId}</span>
                    </span>
                  </div>
                </div>
                <div className='actions'>
                  {/* <button className='btn block'>Bloquear</button> */}
                </div>
              </div>
              <div className='modal-user-history'>
                {data.getUser?.schedules.length === 0 ? (
                  <div className='align'>
                    <span>Nenhum agendamento</span>
                  </div>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <th>Serviço</th>
                        <th>Data</th>
                        <th className='none'>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.getUser?.schedules.map((schedule) => (
                        <tr key={schedule._id}>
                          <td className='service'>{schedule.service.name}</td>
                          <td className='blur align-itens'>
                            <span>
                              {format(new Date(schedule.date), "H") +
                                "h" +
                                (+format(new Date(schedule.date), "mm") || "")}
                            </span>
                            <span className=''>
                              {format(new Date(schedule.date), "dd/MM/yyyy")}
                            </span>
                          </td>
                          <td className='none'>
                            <span
                              className={classnames("status", {
                                completed: schedule.status === "completed",
                                cancelled: schedule.status === "cancelled",
                              })}
                            >
                              {schedule.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          )}
        </div>
      </WindowBlur>

      <style jsx>{`
        .loading {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
        }
        .align {
          margin-top: 20px;
          display: flex;
          justify-content: center;
          font-size: 18px;
        }
        .user-modal {
          position: relative;
          width: 550px;
          height: 500px;
          background-color: #fff;
          border: var(--gray-border);
          border-radius: 5px;
          overflow: hidden;
        }
        button.close {
          position: absolute;
          top: 10px;
          right: 10px;
        }
        .modal-user-info {
          height: 128px;
          padding: 10px 20px;
          display: flex;
          justify-content: space-between;
          border-bottom: var(--gray-border);
        }
        .contact {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .contact .name {
          text-transform: capitalize;
          font-size: 22px;
          font-weight: bold;
        }
        .contact .blur {
          display: flex;
          flex-direction: column;
          color: #666;
          gap: 4px;
        }
        .contact .blur .id {
          font-size: 14px;
        }
        .actions {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .actions button {
          padding: 10px;
          border-radius: 5px;
          border: var(--gray-border);
        }
        .actions button.block:hover {
          background-color: var(--color-primary);
          color: #fff;
          border-color: var(--color-primary);
        }

        .modal-user-history {
          height: calc(100% - 128px);
          padding: 0 5px;
          overflow-y: auto;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        table th {
          font-size: 14px;
          padding: 10px 0;
          color: #666;
        }
        table tbody {
          margin-top: 10px;
          border: var(--gray-border);
        }
        td {
          display: table-cell;
          text-align: center;
          padding: 15px 0;
          border-bottom: var(--gray-border);
        }
        td.service {
          width: 200px;
          max-width: 200px;
        }
        td.align-itens {
          color: hsla(337, 7%, 36%, 1);
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0;
        }
        .status {
          text-transform: capitalize;
          min-width: 100px;
          font-size: 13px;
          font-weight: 600;
          border-radius: 9999px;
          padding: 6px 15px;
          background-color: var(--pending-background);
          border: 1px solid var(--pending-border);
          color: var(--color-pending);
        }
        .status.completed {
          background-color: var(--completed-background);
          border-color: var(--completed-border);
          color: var(--color-completed);
        }
        .status.cancelled {
          background-color: var(--cancelled-background);
          border-color: var(--cancelled-border);
          color: var(--color-cancelled);
        }

        @media (max-width: 768px) {
          .status {
            padding: 5px 10px;
            min-width: 20px;
            font-size: 11px;
          }
        }

        @media (max-width: 550px) {
          .user-modal {
            width: 100vw;
            border-radius: 0;
          }
          table tbody {
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          td.service {
            width: 140px;
          }
        }

        @media (max-width: 375px) {
          td.service {
            width: 120px;
            max-width: 140px;
          }
          .none {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default UserModal;
