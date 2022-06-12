import { ApolloProvider } from "@apollo/client";
import client from "../graphql/ApolloConfig";
import { Provider } from "react-redux";
import store from "../store";
import classNames from "classnames";
import "../styles/globals.css";

import Dashboard from "../components/Dashboard/Main";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <div
          style={{ width: "100vw", height: "100vh" }}
          className={classNames({ "dashboard-container": !Component.getLayout })}
        >
          {Component.getLayout ? (
            <Component {...pageProps} />
          ) : (
            <Dashboard style={{ width: "100%" }}>
              <Component {...pageProps} />
            </Dashboard>
          )}
        </div>
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;