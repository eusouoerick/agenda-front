// ----------------------------------------------------------------------------

// Forma de acessar a API GraphQL sem o apollo-client
const graphqlAPI = async (query, variables) => {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: token ? `Bearer ${token}` : null,
    },
    body: JSON.stringify({ query, variables }),
  });
  const { data } = await res.json();
  return data;
};

export default graphqlAPI;
