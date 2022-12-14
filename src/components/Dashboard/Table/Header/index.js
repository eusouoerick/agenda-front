import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetState } from "../../../../store/tableFilterSlice";
import { setCreateScheduleOpen } from "../../../../store/dashboardSlice";
import client from "../../../../graphql/ApolloConfig";
import classnames from "classnames";

import CreateSchedule from "../../../CreateSchedule";
import FilterModal from "./FilterModal";

const HeaderTable = ({ handlePage, refetchQuerie }) => {
  const dispatch = useDispatch();
  const { service, status, date } = useSelector((state) => state.tableFilter);
  const { createScheduleOpen, noItems } = useSelector((state) => state.dashboard);
  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const toogleCreator = useCallback(() => {
    dispatch(setCreateScheduleOpen());
  }, [dispatch]);

  const resetFilter = useCallback(() => {
    dispatch(resetState());
    handlePage(1);
  }, [dispatch, handlePage]);

  return (
    <>
      {createScheduleOpen && <CreateSchedule closeCreator={toogleCreator} />}
      <div className='table-header'>
        <div className='btns-left'>
          <button onClick={toogleCreator}>
            Agendar dia
            <span className='material-icons' style={{ marginLeft: 3 }}>
              add
            </span>
          </button>
          <button
            onClick={async () => {
              setLoading(() => true);
              handlePage(2); // reset page
              await client.refetchQueries({
                include: [refetchQuerie],
              });
              setLoading(() => false);
            }}
          >
            <span className={classnames("material-icons", { loading })}>refresh</span>
          </button>
        </div>
        <div className='btns-right'>
          {filterOpen ? (
            <FilterModal closeModal={setFilterOpen} handlePage={handlePage} />
          ) : (
            <>
              {date || service !== "all" || status.length !== 3 ? (
                <>
                  <button className='none' onClick={resetFilter}>
                    Remover filtros
                  </button>
                  <button className='block' onClick={resetFilter}>
                    <span className='material-icons'>close</span>
                  </button>
                </>
              ) : null}
              {!noItems && (
                <button onClick={() => setFilterOpen(() => true)}>
                  <span className='material-icons'>sort</span>
                </button>
              )}
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
          height: 36px;
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
        .table-header button.block {
          display: none;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 380px) {
          .table-header {
            padding: 0 10px;
            width: 100vw;
          }
          .table-header button.none {
            display: none;
          }
          .table-header button.block {
            display: block;
          }
        }
      `}</style>
    </>
  );
};

export default HeaderTable;
