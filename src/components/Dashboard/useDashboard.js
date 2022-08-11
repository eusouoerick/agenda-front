import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/userSlice";
import { setCurrentPage } from "../../store/dashboardSlice";

const useHook = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, _id } = useSelector((state) => state.user);

  useEffect(() => {
    // Verifica se o usuário está logado
    (async () => {
      const token = localStorage.getItem("token");
      if (token && !_id) {
        dispatch(getUser());
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
    // deixa colorido o icone da pagina atual no AsideMenu
    const pathname = router.pathname.split("/").pop();
    dispatch(setCurrentPage(`${pathname[0].toUpperCase()}${pathname.slice(1)}`));
  }, [dispatch, router]);

  return { loading, _id };
};

export default useHook;
