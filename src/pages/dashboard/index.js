import useTable from "../../hooks/useTable";

import HeaderTable from "../../components/Dashboard/Table/Header";
import Table from "../../components/Dashboard/Table/Table";
import NoItems from "../../components/Dashboard/Table//NoItems";
import ThreeDotsLoading from "../../components/ThreeDotsLoading";

const TablePage = () => {
  const { data, error, networkStatus, handlePage, SCHEMA } = useTable();

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

export default TablePage;
