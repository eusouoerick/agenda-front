import { useEffect } from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setCreateScheduleOpen, setNoItems } from "../../../store/dashboardSlice";

const NoItems = () => {
  const dispatch = useDispatch();

  const toggleCreateSchedule = useCallback(() => {
    dispatch(setCreateScheduleOpen());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setNoItems(true));
    return () => {
      dispatch(setNoItems(false));
    };
  }, [dispatch]);

  return (
    <>
      <div className='no-items'>
        <div className='align'>
          <h3>Nenhum agendamento encontrado</h3>
          <button className='btn' onClick={toggleCreateSchedule}>
            Agendar dia
            <span className='material-icons'>add</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        .no-items {
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 1e3px;
          height: 200px;
          background-color: #fff;
          border: var(--gray-border);
        }
        .align {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .btn {
          display: flex;
          align-items: center;
          font-size: 14px;
          gap: 3px;
          heigh: 36px;
          min-height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
          padding: 5px 7px;
          border: solid 1px var(--color-primary);
          border-radius: 5px;
          font-weight: bold;
          letter-spacing: 0.02rem;
          color: var(--color-primary);
        }
        .btn:hover {
          background: var(--color-primary);
          color: #fff;
        }
      `}</style>
    </>
  );
};

export default NoItems;
