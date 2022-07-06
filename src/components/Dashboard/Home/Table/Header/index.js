import { useState, useCallback } from "react";
import client from "../../../../../graphql/ApolloConfig";
import classnames from "classnames";

import WindowBlur from "../../../../windowBlur";
import CreateSchedule from "../../../../CreateSchedule";
import FilterModal from "./FilterModal";

const HeaderTable = ({ handlePage, refetchQuerie }) => {
  const [loading, setLoading] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const handleCreateSchedule = useCallback(() => {
    setCreateOpen((state) => !state);
  }, []);

  return (
    <>
      {createOpen && (
        <WindowBlur setChildrenState={setCreateOpen}>
          <CreateSchedule closeCreator={handleCreateSchedule} />
        </WindowBlur>
      )}
      <div className='table-header'>
        <div className='btns-left'>
          <button onClick={handleCreateSchedule}>
            Agendar dia
            <span className='material-icons' style={{ marginLeft: 3 }}>
              add
            </span>
          </button>
          <button
            onClick={async () => {
              setLoading(() => true);
              handlePage(1); // reset page
              // tem 2 porque o primeiro deixa a última página
              // e o segundo arruma o refetch
              await client.refetchQueries({
                include: [refetchQuerie],
              });
              // await client.refetchQueries({
              //   include: [refetchQuerie],
              // });
              setLoading(() => false);
            }}
          >
            <span className={classnames("material-icons", { loading })}>refresh</span>
          </button>
        </div>
        <div className='btns-right'>
          {filterOpen ? (
            <FilterModal closeModal={setFilterOpen} />
          ) : (
            <button onClick={() => setFilterOpen(() => true)}>
              <span className='material-icons'>sort</span>
            </button>
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
