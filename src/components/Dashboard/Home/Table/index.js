import { useCallback, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { GET_SCHEDULES } from "../../../../graphql/schemas/schedules";

import HeaderTable from "./Header";
import TableItem from "./TableItem";
import NoItems from "../NoItems";
import ThreeDotsLoading from "./ThreeDotsLoading";

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
  const [cachedPage, setCachedPage] = useState(false); // impede que ocorra uma busca repetida na pagina
  const { data, error, fetchMore, networkStatus } = useQuery(SCHEMA, {
    variables: { page: 1, service, date },
    notifyOnNetworkStatusChange: true,
  });

  const handlePage = useCallback((page) => {
    setCachedPage(() => false);
    setPage((state) => page || state + 1);
  }, []);

  useEffect(() => {
    // Deixa paginação sincronizada com o cache do Apollo
    if (page <= 1) {
      const limit = 5; // quantidade de registros por página - valor do backend
      if (data?.schedules.length) {
        const currentPage = Math.ceil(data?.schedules.length / limit);
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
      {networkStatus === 1 ? (
        <ThreeDotsLoading />
      ) : (
        <>
          <HeaderTable
            handlePage={handlePage}
            refetchQuerie={SCHEMA}
            setPage={setPage}
          />
          
          {!data?.schedules.length && networkStatus !== 2 ? (
            <NoItems />
          ) : (
            <table style={{ borderBottom: data?.schedules.length ? "none" : null }}>
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
                {data?.schedules?.map((item, index) => {
                  if (status.includes(item.status))
                    return (
                      <TableItem
                        item={item}
                        key={item._id}
                        req={index + 1 === data.schedules.length}
                        handlePage={handlePage}
                      />
                    );
                })}
              </tbody>
            </table>
          )}
          {(networkStatus === 3 || networkStatus === 2) && <ThreeDotsLoading />}
        </>
      )}

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
        th {
          display: table-cell;
          text-align: center;
          padding: 15px 10px;
        }
      `}</style>
    </div>
  );
};

export default Table;
