import classnames from "classnames";

const BtnStatus = ({ handleUpdate, loading, status, respon }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    handleUpdate();
  };

  return (
    <>
      <button
        style={{ textTransform: "capitalize" }}
        className={classnames("status", {
          completed: status === "completed",
          cancelled: status === "cancelled",
          respon,
        })}
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? "Loading..." : status}
      </button>

      <style jsx>{`
        .status {
          min-width: 100px;
          font-size: 13px;
          font-weight: 600;
          border-radius: 9999px;
          padding: 6px 15px;
          background-color: var(--pending-background);
          color: var(--color-pending);
          border: 1px solid var(--pending-border);
          transition: background 0.3s;
          transition: color 0.3s;
          transition: background-color 0.3s;
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
        .status:disabled {
          background-color: #ccc;
          color: #343434;
          border-color: #afafaf;
        }

        @media (max-width: 768px) {
          .respon {
            padding: 5px 10px;
            min-width: 20px;
            font-size: 11px;
          }
        }

        @media (max-width: 375px) {
          .respon {
            padding: 3px 10px;
          }
        }
      `}</style>
    </>
  );
};

export default BtnStatus;
