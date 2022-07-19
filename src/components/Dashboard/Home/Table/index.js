import { useCallback, useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { GET_SCHEDULES } from "../../../../graphql/schemas/schedules";

import HeaderTable from "./Header";
import Table from "./Table";
import NoItems from "./NoItems";
import ThreeDotsLoading from "./ThreeDotsLoading";

const TableContainer = () => {
  const { service, date } = useSelector((state) => state.tableFilter);
  const [page, setPage] = useState(1);
  const [cachedPage, setCachedPage] = useState(false); // impede que ocorra uma busca repetida na pagina

  const SCHEMA = useMemo(
    // get-fields - https://github.com/eusouoerick/get-fields
    () =>
      GET_SCHEDULES(
        "_id",
        { name: "createdBy", items: ["_id", "name", "contact"] },
        { name: "service", items: ["_id", "name", "price", "duration"] },
        "date",
        "status"
      ),
    []
  );
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
          <HeaderTable handlePage={handlePage} refetchQuerie={SCHEMA} />

          {!data?.schedules.length && networkStatus !== 2 ? (
            <NoItems />
          ) : (
            <Table data={data} handlePage={handlePage} />
          )}
          
          {(networkStatus === 3 || networkStatus === 2) && <ThreeDotsLoading />}
        </>
      )}
    </div>
  );
};

export default TableContainer;
