import { useQuery } from "@apollo/client";
import { GET_SERVICES } from "../../graphql/schemas/services";
import { useSelector } from "react-redux";

import ThreeDotsLoading from "../../components/ThreeDotsLoading";
import CreateService from "../../components/Dashboard/services/CreateService";
import Card from "../../components/Dashboard/services/Card";

const ServicesPage = () => {
  const { data, loading, error } = useQuery(
    GET_SERVICES("_id", "name", "price", "description")
  );
  const { adm } = useSelector((state) => state.user);

  if (loading) return <ThreeDotsLoading />;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <div className='c'>
        {adm && <CreateService />}
        {data?.services?.map((item) => (
          <Card key={item._id} item={item} adm={adm} />
        ))}
      </div>

      <style jsx>{`
        .c {
          width: 100%;
          max-width: 1200px;
          display: grid;
          justify-content: center;
          grid-template-columns: repeat(auto-fit, minmax(240px, 240px));
          grid-gap: 20px;
        }
      `}</style>
    </>
  );
};

export default ServicesPage;
