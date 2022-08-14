import { useMemo } from "react";
import { useQuery, gql } from "@apollo/client";
import { Line } from "react-chartjs-2";
import ThreeDotsLoading from "../../ThreeDotsLoading";

const SCHEMA = gql`
  query GraphSchedules {
    graphSchedules {
      name
      count
    }
  }
`;

const GraphSchedules = () => {
  const { data, loading } = useQuery(SCHEMA, { fetchPolicy: "no-cache" });

  const labels = useMemo(() => data?.graphSchedules.map((item) => item.name), [data]);
  const counts = useMemo(() => data?.graphSchedules.map((item) => item.count), [data]);

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
            label: "Agendamentos criados",
            borderColor: "#3e95cd",
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
                return " Qtd: " + raw;
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

export default GraphSchedules;
