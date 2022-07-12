import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  concat,
} from "@apollo/client";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

// Configura o cabecalho da requisição com o token
const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null,
      },
    };
  });
  return forward(operation);
});

export default new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          schedules: {
            keyArgs: ["service", "date"],
            merge(_, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});
