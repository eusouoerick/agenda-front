import { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetState } from "../store/tableFilterSlice";
import { useQuery } from "@apollo/client";
import { GET_SCHEDULES } from "../graphql/schemas/schedules";

// get-fields - https://github.com/eusouoerick/get-fields
const SCHEMA = GET_SCHEDULES(
  "_id",
  { name: "createdBy", items: ["_id", "name", "contact"] },
  { name: "service", items: ["_id", "name", "price", "duration"] },
  "date",
  "status"
);

const useTable = () => {
  const dispatch = useDispatch();
  const { service, date, status } = useSelector((state) => state.tableFilter);
  const [page, setPage] = useState(1);
  const [cachedPage, setCachedPage] = useState(false); // impede que ocorra uma busca repetida na pagina

  const { data, error, fetchMore, networkStatus } = useQuery(SCHEMA, {
    variables: { page: 1, service, date, status },
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  // função de paginação
  const handlePage = useCallback((pageValue) => {
    setCachedPage(() => false);
    setPage((prvPage) => +pageValue || prvPage + 1);
  }, []);

  useEffect(() => {
    // Deixa paginação sincronizada com o cache do Apollo
    if (page <= 1) {
      const limit = 10; // quantidade de registros por página - valor do backend
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
          status,
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

  return { data, error, networkStatus, handlePage, SCHEMA };
};

export default useTable;
