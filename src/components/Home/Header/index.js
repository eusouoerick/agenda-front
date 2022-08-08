import { useState, useEffect } from "react";
import WindowBlur from "../../windowBlur";

import LoginModal from "../../LoginModal";

const Header = () => {
  // loginLayout define se o modal de login ou de signup será exibido
  // true = login, false = signup
  const [loginLayout, setLoginLayout] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  const handleClickLogin = () => {
    setLoginModal((state) => !state);
  };

  // • passar esste useEffect para o componente WindowBlur
  useEffect(() => {
    if (loginModal) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [loginModal]);

  return (
    <>
      {loginModal && (
        <LoginModal loginLayout={loginLayout} setLoginModal={setLoginModal} />
      )}

      <header>
        <div className='focus'>
          <div className='hd-lf'>
            <span className='logo'>LOGO</span>
            <nav>
              <ul className='nav'>
                <li>
                  <a href='#services'>
                    <span>Services</span>
                  </a>
                </li>
                <li>
                  <a href='#about-us'>
                    <span>About us</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div>
            <button
              className='btn-home lgn'
              onClick={() => {
                setLoginLayout(() => true);
                handleClickLogin();
              }}
            >
              Sign in
            </button>
            <button
              className='btn-home rgt'
              onClick={() => {
                setLoginLayout(() => false);
                handleClickLogin();
              }}
            >
              Sign up
            </button>
          </div>
        </div>
      </header>

      <style jsx>{`
        header {
          background: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100vw;
          opacity: 0;
          animation: fadeIn 0.2s ease-in-out forwards;
        }
        header .focus {
          width: 65rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 50px;
        }
        header .hd-lf {
          display: flex;
          align-items: center;
        }
        header .logo {
          font-size: 24px;
          font-weight: bold;
          color: var(--color-primary);
        }
        header .nav {
          display: flex;
          gap: 20px;
        }
        header .nav li {
          cursor: pointer;
          list-style: none;
        }
        header .nav li a {
          text-decoration: none;
          color: #000;
        }
        header .nav li a:hover {
          text-decoration: underline;
        }
        header .btn-home.lgn:hover {
          color: var(--color-primary);
          text-decoration: underline;
        }
        header .btn-home.rgt {
          color: var(--color-primary);
          margin-left: 10px;
          border: 1px solid var(--color-primary);
        }
        header .btn-home.rgt:hover {
          color: hsl(0, 0%, 100%);
          background: var(--color-primary);
        }
      `}</style>
    </>
  );
};

export default Header;
