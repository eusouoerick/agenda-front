import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetState } from "../../../../../store/tableFilterSlice";
import client from "../../../../../graphql/ApolloConfig";
import classnames from "classnames";

import WindowBlur from "../../../../windowBlur";
import CreateSchedule from "../../../../CreateSchedule";
import FilterModal from "./FilterModal";

const HeaderTable = ({ handlePage, refetchQuerie, setPage }) => {
  const dispatch = useDispatch();
  const { service, status, date } = useSelector((state) => state.tableFilter);
  const [loading, setLoading] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const toggleFilterVisibility = useCallback(() => {
    setCreateOpen((state) => !state);
  }, []);

  const resetFilter = useCallback(() => {
    dispatch(resetState());
    setPage(1);
  }, [dispatch, setPage]);

  return (
    <>
      {createOpen && (
        <WindowBlur setChildrenState={toggleFilterVisibility}>
          <CreateSchedule closeCreator={toggleFilterVisibility} />
        </WindowBlur>
      )}
      <div className='table-header'>
        <div className='btns-left'>
          <button onClick={toggleFilterVisibility}>
            Agendar dia
            <span className='material-icons' style={{ marginLeft: 3 }}>
              add
            </span>
          </button>
          <button
            onClick={async () => {
              setLoading(() => true);
              await client.refetchQueries({
                include: [refetchQuerie],
              });
              handlePage(1); // reset page
              setLoading(() => false);
            }}
          >
            <span className={classnames("material-icons", { loading })}>refresh</span>
          </button>
        </div>
        <div className='btns-right'>
          {filterOpen ? (
            <FilterModal closeModal={setFilterOpen} setPage={setPage} />
          ) : (
            <>
              {date || service !== "all" || status.length !== 3 ? (
                <button onClick={resetFilter}>Remover filtros</button>
              ) : null}
              <button onClick={() => setFilterOpen(() => true)}>
                <span className='material-icons'>sort</span>
              </button>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .table-header {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 5px;
        }
        .btns-left,
        .btns-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .table-header button {
          heigh: 36px;
          min-height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
          padding: 5px 7px;
          border: var(--gray-border);
          border-radius: 5px;
          font-weight: bold;
          letter-spacing: 0.02rem;
          /* color: #6c6c6c; */
          color: #585858;
        }
        .table-header button:hover {
          border-color: var(--color-primary);
          color: var(--color-primary);
        }
        .loading {
          color: var(--color-primary);
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

export default HeaderTable;
