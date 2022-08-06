import { useMemo } from "react";
import { useQuery, gql } from "@apollo/client";
import { Line } from "react-chartjs-2";
import ThreeDotsLoading from "../../ThreeDotsLoading";

const SCHEMA = gql`
  query GraphMoney {
    graphMoney {
      name
      count
    }
  }
`;

const GraphMoney = () => {
  const { data, loading } = useQuery(SCHEMA, { fetchPolicy: "no-cache" });

  const labels = useMemo(() => data?.graphMoney.map((item) => item.name), [data]);
  const counts = useMemo(() => data?.graphMoney.map((item) => item.count), [data]);

  if (loading) return <ThreeDotsLoading />;
  return (
    <Line
      width={100}
      height={50}
      data={{
        labels,
        datasets: [
          {
            data: counts,
            label: "Ganhos nos últimos 7 dias",
            borderColor: "hsl(144deg 70% 64%)",
            fill: true,
          },
        ],
      }}
      options={{
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      }}
    />
  );
};

export default GraphMoney;
