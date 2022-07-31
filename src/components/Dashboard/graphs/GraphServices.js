import { useMemo } from "react";
import { useQuery, gql } from "@apollo/client";
import { Bar } from "react-chartjs-2";
import ThreeDotsLoading from "../../ThreeDotsLoading";

const SCHEMA = gql`
  query {
    graphServices {
      name
      count
    }
  }
`;

const GraphServices = () => {
  const { data, loading } = useQuery(SCHEMA, { fetchPolicy: "no-cache" });

  const labels = useMemo(() => data?.graphServices.map((item) => item.name), [data]);
  const counts = useMemo(() => data?.graphServices.map((item) => item.count), [data]);

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
            label: "Serviços mais solicitados",
            backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f"],
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

export default GraphServices;
