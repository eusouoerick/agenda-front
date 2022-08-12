import { useCallback } from "react";
import Head from "next/head";
import Link from "next/link";
import classnames from "classnames";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage } from "../../../store/dashboardSlice";
import { setAsideMenuOpen } from "../../../store/dashboardSlice";
// import client from "../../../graphql/ApolloConfig";

const AsideMenu = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { adm } = useSelector((state) => state.user);
  const { asideMenuPages, asideMenuOpen, currentPage } = useSelector(
    (state) => state.dashboard
  );

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    router.push("/");
    // client.resetStore();
  }, [router]);

  return (
    <>
      <Head>
        <title>{currentPage} - Dashboard</title>
      </Head>
      <aside className={classnames({ open: asideMenuOpen })}>
        <button
          className={classnames("btn-expand", { open: asideMenuOpen })}
          onClick={() => dispatch(setAsideMenuOpen())}
        >
          <span className='material-icons'>expand_more</span>
        </button>
        <nav className='nav-container'>
          <ul className={classnames({ open: asideMenuOpen })}>
            {asideMenuPages.map(({ name, href, icon, onlyAdm }) => {
              if (onlyAdm && !adm) return null;
              return (
                <li key={href} style={{ width: asideMenuOpen ? "100%" : "auto" }}>
                  <Link href={href}>
                    <a
                      className={classnames("nav-item", {
                        "item-focus": currentPage === name,
                      })}
                      onClick={() => dispatch(setCurrentPage(name))}
                    >
                      <span
                        className='material-icons icon'
                        style={{ fontWeight: 200 }}
                      >
                        {icon}
                      </span>
                      {asideMenuOpen && <span>{name}</span>}
                    </a>
                  </Link>
                </li>
              );
            })}
            <li className='signout' style={{ width: asideMenuOpen ? "100%" : "auto" }}>
              <button
                onClick={handleLogout}
                style={{ color: "#fff" }}
                className='nav-item'
              >
                <span className='material-icons' style={{ transform: "scaleX(-1)" }}>
                  logout
                </span>
                {asideMenuOpen && <span style={{ fontSize: 15 }}>Sign out</span>}
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <style jsx>{`
        aside {
          background-color: hsl(0, 0%, 10%);
          width: 72px;
          height: 100vh;
          display: flex;
          flex-direction: column;
          gap: 20px;
          align-items: center;
          color: #fff;
          padding: 20px 0;
        }
        aside::before {
          content: "";
          display: block;
          height: 20px;
        }
        aside.open {
          width: 230px;
        }
        .btn-expand {
          padding: 0;
          margin-left: 60px;
          width: 30px;
          height: 25px;
          border-radius: 9999px;
          background-color: hsl(0, 0%, 10%);
          color: #fff;
          transform: rotate(-90deg);
          transition: transform 0.2s ease-in-out;
        }
        .btn-expand.open {
          transform: rotate(90deg);
          margin-left: 220px;
        }
        .nav-container {
          height: 100%;
          width: 100%;
        }
        .nav-container ul {
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%;
          list-style: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          color: #fff;
          text-decoration: none;
        }
        .nav-container ul.open {
          padding: 0 40px;
          align-items: flex-start;
        }
        .nav-item {
          width: 100%;
          padding: 7px 10px;
          display: flex;
          align-items: center;
          gap: 20px;
          text-decoration: none;
          color: #fff;
          transition: color 0.15s ease-in-out;
        }
        .item-focus {
          color: var(--text-color-primary);
          /* background-color: var(--dashboard-aside-background); */
          border-radius: 9999px;
          transition: all 0.15s linear;
        }
        .icon {
          font-size: 24px;
          font-weight: 200;
        }
        .signout {
          margin: auto 0 0 0;
        }
      `}</style>
    </>
  );
};

export default AsideMenu;
