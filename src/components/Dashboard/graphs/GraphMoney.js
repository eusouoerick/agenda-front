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
            backgroundColor: "hsla(144, 70%, 64%, 0.2)",
            fill: true,
            tension: 0.1,
          },
        ],
      }}
      options={{
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              boxWidth: 0,
              font: {
                size: 16,
                weight: "bold",
                family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
              },
            },
          },
          tooltip: {
            callbacks: {
              label: ({ raw }) => {
                const s = raw > 0 ? "R$ " : "";
                return ` Qtd: ${s}` + raw;
              },
            },
          },
        },
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
