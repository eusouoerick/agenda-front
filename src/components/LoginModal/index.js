import { useState } from "react";
import useHook from "./useHook";

import style from "./loginModal.module.css";
import ThreeDotsLoading from "../ThreeDotsLoading";
import WindowBlur from "../windowBlur";

const LoginModal = ({ loginLayout, setLoginModal }) => {
  const [layout, setLayout] = useState(loginLayout); // true = login, false = signup
  const [form, setForm] = useState({ name: "", contact: "", password: "" });
  const { handleSubmit, loading, error } = useHook({ layout, form });

  const handleChange = (e) => {
    setForm(() => ({ ...form, [e.target.name]: e.target.value }));
  };

  return (
    <WindowBlur setChildrenState={loading ? () => {} : setLoginModal}>
      <div className={style["login-modal"]}>
        {loading ? (
          <div className={style.loading}>
            <ThreeDotsLoading />
          </div>
        ) : (
          <>
            {error ? (
              <span className={style.error}>{error}</span>
            ) : (
              <h2>{layout ? "Login" : "Criar conta"}</h2>
            )}
            <form
              className={style.form}
              style={{ marginTop: layout ? 20 : 0 }}
              onSubmit={handleSubmit}
            >
              {!layout && (
                <div className={style["input-area"]}>
                  <input
                    className={style.input}
                    type='text'
                    id='name'
                    name='name'
                    placeholder='Nome'
                    autoComplete='off'
                    value={form.name}
                    onChange={handleChange}
                    autoFocus={!layout}
                    required
                  />
                </div>
              )}
              <div className={style["input-area"]}>
                <input
                  className={style.input}
                  type='text'
                  id='contact'
                  name='contact'
                  placeholder='Email ou telefone'
                  autoComplete='off'
                  value={form.contact}
                  onChange={handleChange}
                  autoFocus={layout}
                  required
                />
              </div>
              <div className={style["input-area"]}>
                <input
                  className={style.input}
                  type='password'
                  id='password'
                  name='password'
                  placeholder='Senha'
                  autoComplete='current-password'
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type='submit'>Confirmar</button>
            </form>
            <div>
              <button
                className={style.changeLayout}
                style={{ marginTop: layout ? 30 : 0 }}
                onClick={() => {
                  setForm(() => ({
                    name: "",
                    contact: "",
                    password: "",
                  }));
                  setLayout((state) => !state);
                }}
              >
                {layout ? "Criar conta" : "Já tenha conta"}
              </button>
            </div>
          </>
        )}
      </div>
    </WindowBlur>
  );
};

export default LoginModal;
