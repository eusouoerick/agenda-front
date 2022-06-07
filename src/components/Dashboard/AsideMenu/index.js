import Head from "next/head";
import Link from "next/link";
import classnames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { setAsideMenuOpen } from "../../../store/dashboardSlice";

const AsideMenu = () => {
  const dispatch = useDispatch();
  const { asideMenuPages, asideMenuOpen, currentPage } = useSelector(
    (state) => state.dashboard
  );
  const { adm } = useSelector((state) => state.user);

  return (
    <>
      <aside className={classnames({ open: asideMenuOpen })}>
        <span className='logo'>LOGO</span>
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
              <button style={{ color: "#fff" }} className='nav-item'>
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
          /* transition: width 0.2s ease-in-out; */
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
        }
        .item-focus {
          color: var(--text-color-primary);
          background-color: var(--dashboard-aside-background);
          border-radius: 9999px;
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
