import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../store/userSlice";

import Header from "../Header";

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

  if (!_id) return <div></div>;
  return (
    <div style={{ width: "100%" }}>
      <Header />
      {children}
    </div>
  );
};

export default Main;
