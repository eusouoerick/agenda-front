import { useQuery } from "@apollo/client";
import { GET_SCHEDULES } from "../../graphql/schemas/schedules";
import { format } from "date-fns";
import classnames from "classnames";

const Dashboard = () => {
  const { data, loading, error } = useQuery(GET_SCHEDULES);
  return (
    <div>
      <table>
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
          {data?.schedules?.map((item) => (
            <tr key={item._id}>
              <td className='focus'>{item.createdBy.name}</td>
              <td className='blur'>{item.createdBy.contact}</td>
              <td>{item.service.name}</td>
              <td style={{ padding: "10px 0" }}>
                <span className={classnames("status", { completed: item.status })}>
                  {item.status ? "Completed" : "Pending"}
                </span>
              </td>
              <td className='blur'>{format(new Date(), "dd/MM/yyyy")}</td>
              <td>R$ {item.service.price.toString().replace(".", ",")}</td>
              <td>
                <button className='delete'>
                  <span className='material-icons'>close</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        table {
          width: 1e3px;
          max-width: 1e3px;
          background-color: #fff;
          border-collapse: collapse;
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
        th,
        td {
          display: table-cell;
          text-align: center;
          padding: 15px 10px;
        }
        td {
          border-bottom: 1px solid #e6e6e6;
        }
        td.focus {
          font-weight: bold;
          text-transform: capitalize;
        }
        td.blur {
          color: hsla(337, 7%, 36%, 1);
        }
        .status {
          min-width: 98px;
          font-size: 13px;
          font-weight: 600;
          border-radius: 9999px;
          padding: 6px 15px;
          background-color: var(--pending-background);
          color: var(--color-pending);
        }
        .status.completed {
          background-color: var(--completed-background);
          color: var(--color-completed);
        }
        button.delete {
          padding: 0px;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: hsla(337, 7%, 36%, 1);
        }
        button.delete:hover {
          color: var(--color-cancelled);
        }
        td.align-itens {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
