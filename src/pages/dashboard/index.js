import { useCallback, useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetState } from "../../store/tableFilterSlice";
import { useQuery } from "@apollo/client";
import { GET_SCHEDULES } from "../../graphql/schemas/schedules";

import HeaderTable from "../../components/Dashboard/Table/Header";
import Table from "../../components/Dashboard/Table/Table";
import NoItems from "../../components/Dashboard/Table//NoItems";
import ThreeDotsLoading from "../../components/ThreeDotsLoading";

const TablePage = () => {
  const dispatch = useDispatch();
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
    return () => {
      dispatch(resetState());
    };
  }, [dispatch]);

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

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default TablePage;
