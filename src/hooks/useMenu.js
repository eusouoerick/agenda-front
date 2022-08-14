import { useCallback } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const useMenu = () => {
  const router = useRouter();
  const { adm } = useSelector((state) => state.user);
  const { asideMenuPages, asideMenuOpen, currentPage } = useSelector(
    (state) => state.dashboard
  );

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    router.push("/");
    // client.resetStore();
  }, [router]);

  return { handleLogout, asideMenuPages, asideMenuOpen, currentPage, adm };
};

export default useMenu;
