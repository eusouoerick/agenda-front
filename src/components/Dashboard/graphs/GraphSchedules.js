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
            label: "Agendamentos criados nos últimos 7 dias",
            borderColor: "#3e95cd",
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

export default GraphSchedules;
