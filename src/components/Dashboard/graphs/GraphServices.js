import { useMemo } from "react";
import { useQuery, gql } from "@apollo/client";
import { Pie } from "react-chartjs-2";
import ThreeDotsLoading from "../../ThreeDotsLoading";

const SCHEMA = gql`
  query GraphServices {
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
    <Pie
      width={100}
      height={50}
      data={{
        labels,
        datasets: [
          {
            data: counts,
            backgroundColor: [
              "#3e95cd",
              "#8e5ea2",
              "#3cba9f",
              "#e8c3b9",
              "#c45850",
              "#FCC714",
              "#6EE61E",
            ],
            fill: true,
          },
        ],
      }}
      options={{
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              title: (context) => {
                return context[0].label;
              },
              label: ({ raw }) => {
                return " Qtd: " + raw;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function () {
                return "";
              },
            },
          },
        },
      }}
    />
  );
};

export default GraphServices;
