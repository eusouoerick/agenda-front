import { useSelector } from "react-redux";
import TableItem from "./TableItem";

const Table = ({ data, handlePage }) => {
  const { status } = useSelector((state) => state.tableFilter);

  return (
    <>
      <table style={{ borderBottom: data?.schedules.length ? "none" : null }}>
        <thead>
          <tr>
            <th>Author</th>
            <th>Contact</th>
            <th>Serviço</th>
            <th>Status</th>
            <th>Date</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.schedules?.map((item, index) => {
            if (status.includes(item.status))
              return (
                <TableItem
                  item={item}
                  key={item._id}
                  req={index + 1 === data.schedules.length}
                  handlePage={handlePage}
                />
              );
          })}
        </tbody>
      </table>

      <style jsx>{`
        table {
          width: 1e3px;
          max-width: 1e3px;
          background-color: #fff;
          border-collapse: collapse;
          border: var(--gray-border);
          border-radius: 5px;
        }
        thead {
          height: 50px;
        }
        th {
          color: hsl(337, 31%, 12%);
          font-size: 14px;
          font-weight: 400;
          line-height: 18px;
          letter-spacing: 0.02em;
        }
        th {
          display: table-cell;
          text-align: center;
          padding: 15px 10px;
        }
      `}</style>
    </>
  );
};

export default Table;
