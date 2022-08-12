import { useRef } from "react";
import useDashboard from "./useDashboard";

import Header from "./Header";
import AsideMenu from "./AsideMenu";
import LoadingPage from "./LoadingPage";
import ScrollUp from "../ScrollUp";
import LoadingRouter from "./LoadingRouter";

// Este componente é responsável por organizar o layout da páginas do dashboard
// e por verificar se o usuário está logado ~> _app.js
const Dashboard = ({ children }) => {
  const ref = useRef();
  const { loading, _id, loadingRouter } = useDashboard();

  if (loading) return <LoadingPage />;
  if (_id) {
    return (
      <>
        <AsideMenu />
        <div ref={ref} className='dashboard'>
          <Header loadingRouter={loadingRouter} />
          {loadingRouter ? <LoadingRouter /> : <main id='main'>{children}</main>}
        </div>
        <ScrollUp container={ref} />

        <style jsx>{`
          .dashboard {
            width: 100%;
            overflow-y: scroll;
            scroll-behavior: smooth;
          }
          main {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: 60px;
          }
        `}</style>
      </>
    );
  }
};

export default Dashboard;
