import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setWindowBlur } from "../../../../../store/settingsSlice";

import WindowBlur from "../../../../windowBlur";
import CreateSchedule from "../../../../CreateSchedule";

const HeaderTable = () => {
  const [createOpen, setCreateOpen] = useState(false);
  const dispatch = useDispatch();
  const { windowBlur } = useSelector((state) => state.settings);

  const handleCreateSchedule = () => {
    setCreateOpen((state) => !state);
    dispatch(setWindowBlur(true));
  };

  return (
    <>
      {windowBlur && createOpen && (
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
          <button>
            <span className='material-icons'>refresh</span>
          </button>
        </div>
        <div className='btns-right'>
          <button>
            <span className='material-icons'>sort</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        .table-header {
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
      `}</style>
    </>
  );
};

export default HeaderTable;
