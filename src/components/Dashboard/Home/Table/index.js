import { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery, useMutation } from "@apollo/client";
import { GET_SCHEDULES, DELETE_SCHEDULE } from "../../../../graphql/schemas/schedules";
import { format } from "date-fns";
import classnames from "classnames";

import HeaderTable from "./Header";

// get-fields - https://github.com/eusouoerick/get-fields
const SCHEMA = GET_SCHEDULES(
  "_id",
  { name: "createdBy", items: ["_id", "name", "contact"] },
  { name: "service", items: ["_id", "name", "price", "duration"] },
  "date",
  "status"
);

const Table = () => {
  const { service, status, date } = useSelector((state) => state.tableFilter);
  const [page, setPage] = useState(1);
  const [cachedPage, setCachedPage] = useState(false); // impede que ocorra uma busca repetida na pagina atual
  const [deleteSchedule] = useMutation(DELETE_SCHEDULE);
  const { data, loading, error, fetchMore } = useQuery(SCHEMA, {
    variables: { page: 1, service, date },
  });

  const handlePage = useCallback((page) => {
    setCachedPage(() => false);
    setPage((state) => page || state + 1);
  }, []);

  const handleDelete = useCallback(
    async (id) => {
      await deleteSchedule({
        variables: { id },
        update(cache) {
          const { schedules } = cache.readQuery({ query: SCHEMA });
          cache.writeQuery({
            query: SCHEMA,
            data: {
              schedules: schedules.filter((schedule) => schedule._id !== id),
            },
          });
        },
      });
    },
    [deleteSchedule]
  );

  useEffect(() => {
    // Deixa paginação sincronizada com o cache do Apollo
    if (page <= 1) {
      const limit = 2; // quantidade de registros por página
      if (data?.schedules.length) {
        const currentPage = Math.ceil(data?.schedules.length / limit);
        console.log(currentPage);
        setPage(() => (currentPage === 0 ? 1 : currentPage));
        setCachedPage(() => true);
      }
    }
  }, [page, data]);

  useEffect(() => {
    if (page !== 1 && !cachedPage) {
      fetchMore({
        variables: {
          page,
          service,
          date,
        },
        updateQuery(prev, { fetchMoreResult }) {
          if (!fetchMoreResult) return prev;
          return {
            ...prev,
            schedules: [...prev.schedules, ...fetchMoreResult.schedules],
          };
        },
      });
    }
  }, [date, fetchMore, page, cachedPage, service]);

  if (error) return <p>Error : {error.message}</p>;
  return (
    <div>
      <HeaderTable handlePage={handlePage} refetchQuerie={SCHEMA} setPage={setPage} />
      <button onClick={() => handlePage()}>fetchMore</button>
      <table>
        <thead>
          <tr>
            <th>Author</th>
            <th>Contact</th>
            <th>Serviço</th>
            <th>Status</th>
            <th>Date</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.schedules?.map((item) => {
            if (status.includes(item.status)) {
              return (
                <tr key={item._id}>
                  <td className='focus'>{item.createdBy.name}</td>
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
                    <span className=''>
                      {format(new Date(item.date), "dd/MM/yyyy")}
                    </span>
                  </td>
                  <td>R$ {item.service.price.toString().replace(".", ",")}</td>
                  <td>
                    <button className='delete' onClick={() => handleDelete(item._id)}>
                      <span className='material-icons'>close</span>
                    </button>
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>

      <style jsx>{`
        table {
          width: 1e3px;
          max-width: 1e3px;
          background-color: #fff;
          border-collapse: collapse;
          border: var(--gray-border);
          border-radius: 5px;
        }
        thead {
          height: 50px;
        }
        th {
          color: hsl(337, 31%, 12%);
          font-size: 14px;
          font-weight: 400;
          line-height: 18px;
          letter-spacing: 0.02em;
        }
        th,
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
    </div>
  );
};

export default Table;
