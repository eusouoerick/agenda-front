import { useState } from "react";
import { useRouter } from "next/router";
// redux
import { useDispatch } from "react-redux";
import { setWindowBlur } from "../../store/settingsSlice";
import { getUser } from "../../store/userSlice";
// graphql
import { useMutation, useLazyQuery } from "@apollo/client";
import { CREATE_USER, LOGIN } from "../../graphql/schemas/users";

import style from "./loginModal.module.css";

const LoginModal = ({ loginLayout }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [createUserGql] = useMutation(CREATE_USER, null, { fetchPolicy: "no-cache" });
  const [loginGql] = useLazyQuery(LOGIN, null, { fetchPolicy: "no-cache" });

  const [layout, setLayout] = useState(loginLayout); // true = login, false = signup
  const [form, setForm] = useState({
    name: "",
    contact: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm(() => ({ ...form, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(() => true);
    try {
      let token = "";
      if (layout) {
        const { data } = await loginGql({
          variables: {
            data: { ...form, name: undefined },
          },
        });
        token = data.login;
      } else {
        const { data } = await createUserGql({ variables: { data: form } });
        token = data.createUser;
      }
      localStorage.setItem("token", token);
      await dispatch(getUser());
      setLoading(() => false);
      dispatch(setWindowBlur());
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      setLoading(() => false);
    }
  };

  return (
    <div className={style["login-modal"]}>
      <h2>{layout ? "Login" : "Criar conta"}</h2>
      {!loading && (
        <>
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
  );
};

export default LoginModal;
