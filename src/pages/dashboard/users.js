import { useQuery } from "@apollo/client/react";
import { GET_ALL_USERS } from "../../graphql/schemas/users";

import ThreeDotsLoading from "../../components/ThreeDotsLoading";
import UserCard from "../../components/Dashboard/user/UserCard";

const Users = () => {
  const { data, loading } = useQuery(GET_ALL_USERS("_id", "name", "email", "phone"), {
    nextFetchPolicy: "network-only",
  });

  if (loading) return <ThreeDotsLoading />;
  return (
    <>
      <div className='container'>
        {data?.users.map((user) => (
          <UserCard user={user} key={user._id} />
        ))}
      </div>

      <style jsx>{`
        .container {
          width: 100%;
          max-width: 1200px;
          display: grid;
          justify-content: center;
          grid-template-columns: repeat(auto-fit, minmax(400px, 400px));
          gap: 20px;
        }
      `}</style>
    </>
  );
};

export default Users;
