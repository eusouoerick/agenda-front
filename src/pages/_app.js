import Head from "next/head";

import { ApolloProvider } from "@apollo/client";
import client from "../graphql/ApolloConfig";
import { Provider } from "react-redux";
import store from "../store";
import classNames from "classnames";

import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "../components/Dashboard";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Head>
          <title>Home</title>
        </Head>

        <ToastContainer />
        <div className={classNames({ "dashboard-container": !Component.getLayout })}>
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
