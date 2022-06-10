import { ApolloProvider } from "@apollo/client";
import client from "../graphql/ApolloConfig";
import { Provider } from "react-redux";
import store from "../store";
import classNames from "classnames";
import "../styles/globals.css";

import AsideMenu from "../components/Dashboard/AsideMenu";
import MainDashboard from "../components/Dashboard/Main";

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
            <>
              <AsideMenu />
              <MainDashboard style={{ width: "100%" }}>
                <Component {...pageProps} />
              </MainDashboard>
            </>
          )}
        </div>
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;
