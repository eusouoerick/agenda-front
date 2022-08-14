import { useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import classnames from "classnames";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../../../store/dashboardSlice";
import useMenu from "../../../../hooks/useMenu";

const MenuModal = ({ toogleMenuModal }) => {
  const dispatch = useDispatch();
  const menuRef = useRef();
  const { handleLogout, asideMenuPages, currentPage, adm } = useMenu();

  useEffect(() => {
    const closeModal = (e) => {
      if (menuRef.current.contains(e.target)) return;
      toogleMenuModal();
    };
    document.addEventListener("mousedown", closeModal);
    return () => {
      document.removeEventListener("mousedown", closeModal);
    };
  }, [toogleMenuModal]);

  return (
    <>
      <Head>
        <title>{currentPage} - Dashboard</title>
      </Head>
      <div className='container'>
        <div ref={menuRef} className='menu'>
          <div className='header'>
            <span className='logo'>LOGO</span>
            <button className='btn-close' onClick={toogleMenuModal}>
              <span className='material-icons'>close</span>
            </button>
          </div>

          <nav className='nav-container'>
            <ul>
              {asideMenuPages.map(({ name, href, icon, onlyAdm }) => {
                if (onlyAdm && !adm) return null;
                return (
                  <li key={href}>
                    <Link href={href}>
                      <a
                        className={classnames("nav-item", {
                          "item-focus": currentPage === name,
                        })}
                        onClick={() => {
                          dispatch(setCurrentPage(name));
                          toogleMenuModal();
                        }}
                      >
                        <span
                          className='material-icons icon'
                          style={{ fontWeight: 200 }}
                        >
                          {icon}
                        </span>
                        <span>{name}</span>
                      </a>
                    </Link>
                  </li>
                );
              })}
              <li className='signout'>
                <button
                  onClick={handleLogout}
                  style={{ color: "#fff" }}
                  className='nav-item'
                >
                  <span className='material-icons' style={{ transform: "scaleX(-1)" }}>
                    logout
                  </span>
                  <span style={{ fontSize: 15 }}>Sign out</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <style jsx>{`
        .container {
          position: fixed;
          display: flex;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 99;
        }
        .menu {
          position: fixed;
          background-color: hsl(0, 0%, 10%);
          overflow-x: hidden;
          width: 0;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 20px;
          align-items: center;
          color: #fff;
          padding: 20px 0;
          animation: menu-slide 0.1s ease-out forwards;
        }
        @keyframes menu-slide {
          100% {
            width: 250px;
          }
        }

        .header {
          position: relative;
          width: 100%;
          height: 55px;
          border-bottom: 1px solid #565656;
          display: flex;
          padding: 0 20px;
        }
        .header .logo {
          font-size: 22px;
        }
        .header .btn-close {
          position: absolute;
          top: 0;
          right: 10px;
          color: #fff;
          height: 26px;
          width: 35px;
          border-radius: 999px;
          background-color: #fff;
          color: hsl(0, 0%, 10%);
        }
        .nav-container {
          height: calc(100vh - 50px);
        }
        .nav-container ul {
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%;
          list-style: none;
          display: flex;
          align-items: flex-start;
          flex-direction: column;
          gap: 20px;
          color: #fff;
          text-decoration: none;
          padding: 0 40px;
        }
        .nav-container ul {
          width: 100%;
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

export default MenuModal;
