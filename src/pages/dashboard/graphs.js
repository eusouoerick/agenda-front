import GraphSchedules from "../../components/Dashboard/graphs/GraphSchedules";
import GraphMoney from "../../components/Dashboard/graphs/GraphMoney";
import GraphServices from "../../components/Dashboard/graphs/GraphServices";
import GraphUsers from "../../components/Dashboard/graphs/GraphUsers";

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);

const GraphsPage = () => {
  return (
    <>
      <div className='container'>
        <div className='graph-area'>
          <GraphSchedules />
        </div>
        <div className='graph-area'>
          <GraphMoney />
        </div>
        <div className='graph-area'>
          <GraphServices />
        </div>
        <div className='graph-area'>
          <GraphUsers />
        </div>
      </div>

      <style jsx>{`
        .container {
          width: 100%;
          max-width: 1200px;
          display: grid;
          justify-content: center;
          grid-template-columns: repeat(auto-fit, minmax(500px, 500px));
          grid-gap: 40px;
        }
        .graph-area {
          display: flex;
          justify-content: center;
          padding: 10px;
          width: 100%;
          height: 271px;
          border-radius: 4px;
          border: var(--gray-border);
          background-color: #fff;
        }

        @media (max-width: 510px) {
          .container {
            grid-template-columns: repeat(auto-fit, minmax(100vw, 100vw));
          }
          .graph-area {
            padding: 20px 0px;
          }
        }
      `}</style>
    </>
  );
};

export default GraphsPage;
