import { useState, useCallback, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStatus } from "../../../../../store/tableFilterSlice";
import classNames from "classnames";

const BtnStatus = ({ name }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.tableFilter);
  const [clicked, setClicked] = useState(status.includes(name));

  const handleClick = useCallback(() => {
    setClicked((state) => !state);
    dispatch(setStatus(name));
  }, [dispatch, name]);

  return (
    <>
      <button
        className={classNames("status", { [name]: clicked })}
        onClick={handleClick}
      >
        {name}
      </button>

      <style jsx>{`
        .status {
          box-sizing: border-box;
          min-width: 100px;
          font-size: 13px;
          font-weight: 600;
          border-radius: 9999px;
          padding: 6px 15px;
          border: 1px solid transparent;
          background-color: #e9e9e9;
          color: #5e5e5e;
          text-transform: capitalize;
        }
        .status.pending {
          background-color: var(--pending-background);
          color: var(--color-pending);
          border-color: var(--pending-border);
        }
        .status.completed {
          background-color: var(--completed-background);
          color: var(--color-completed);
          border-color: var(--completed-border);
        }
        .status.cancelled {
          background-color: var(--cancelled-background);
          color: var(--color-cancelled);
          border-color: var(--cancelled-border);
        }
      `}</style>
    </>
  );
};

export default memo(BtnStatus);
