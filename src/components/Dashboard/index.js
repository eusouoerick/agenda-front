import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/userSlice";
import { setCurrentPage } from "../../store/dashboardSlice";

import Header from "./Header";
import AsideMenu from "./AsideMenu";

// Este componente é responsável por organizar o layout da páginas do dashboard
// e por verificar se o usuário está logado
// No _app.js ele é chamado como <Dashboard>
const Main = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, _id } = useSelector((state) => state.user);

  useEffect(() => {
    // Verifica se o usuário está logado
    (async () => {
      const token = localStorage.getItem("token");
      if (token && !_id) {
        await dispatch(getUser());
      } else if (!token) {
        router.push("/");
      }
    })();
  }, [_id, dispatch, router]);

  useEffect(() => {
    // Redireciona o usuário se o token expirar ou se o usuário não estiver logado
    if (!loading && !_id) {
      localStorage.removeItem("token");
      router.push("/");
    }
  }, [loading, _id, router]);

  useEffect(() => {
    // deixa  icone do AsideMenu colorido da pagina atual
    const pathname = router.pathname.split("/").pop();
    dispatch(setCurrentPage(`${pathname[0].toUpperCase()}${pathname.slice(1)}`));
  }, [dispatch, router]);

  if (loading) return <h1>Carregando...</h1>;
  if (_id) {
    return (
      <>
        <AsideMenu />
        <div style={{ width: "100%", overflow: "auto" }}>
          <Header />
          <main id='main'>{children}</main>
        </div>

        <style jsx>{`
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

export default Main;
