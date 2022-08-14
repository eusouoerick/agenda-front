import { useMemo } from "react";
import { useQuery, gql } from "@apollo/client";
import { Bar } from "react-chartjs-2";
import ThreeDotsLoading from "../../ThreeDotsLoading";

const SCHEMA = gql`
  query GraphUsers {
    graphUsers {
      name
      count
    }
  }
`;

const GraphUsers = () => {
  const { data, loading } = useQuery(SCHEMA, { fetchPolicy: "no-cache" });

  const labels = useMemo(() => data?.graphUsers.map((item) => item.name), [data]);
  const counts = useMemo(() => data?.graphUsers.map((item) => item.count), [data]);

  if (loading) return <ThreeDotsLoading />;
  return (
    <Bar
      width={100}
      height={50}
      data={{
        labels,
        datasets: [
          {
            data: counts,
            label: "Contas criadas",
            backgroundColor: "hsl(337deg 100% 64%)",
            fill: true,
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
                return ` Qtd: ` + raw;
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

export default GraphUsers;
