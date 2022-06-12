import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../store/userSlice";

import Header from "../Header";
import AsideMenu from "../AsideMenu";

const Main = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);

  useEffect(() => {
    const check = async () => {
      const token = localStorage.getItem("token");
      if (token && !_id) {
        await dispatch(getUser());
      } else if (!token) {
        router.push("/");
      }
    };
    check();
  }, [_id, dispatch, router]);

  if (!_id) return <h1>Carregando...</h1>;
  return (
    <>
      <AsideMenu />
      <div style={{ width: "100%" }}>
        <Header />
        <main>{children}</main>
      </div>

      <style jsx>{`
        main {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-top: 64px;
        }
      `}</style>
    </>
  );
};

export default Main;
