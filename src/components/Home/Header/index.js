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
        <div className='container'>
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
          <div className='btns'>
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
        .container {
          width: 65rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 50px;
        }
        .hd-lf {
          display: flex;
          align-items: center;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: var(--color-primary);
        }
        .nav {
          display: flex;
          gap: 20px;
        }
        .nav li {
          cursor: pointer;
          list-style: none;
        }
        .nav li a {
          text-decoration: none;
          color: #000;
        }
        .nav li a:hover {
          text-decoration: underline;
        }
        .btn-home.lgn:hover {
          color: var(--color-primary);
          text-decoration: underline;
        }
        .btn-home.rgt {
          color: var(--color-primary);
          margin-left: 10px;
          border: 1px solid var(--color-primary);
        }
        .btn-home.rgt:hover {
          color: hsl(0, 0%, 100%);
          background: var(--color-primary);
        }

        @media (max-width: 765px) {
          nav {
            display: none;
          }
        }
        @media (max-width: 400px) {
          .container {
            width: 100%;
            padding: 20px 10px;
          }
        }
      `}</style>
    </>
  );
};

export default Header;
