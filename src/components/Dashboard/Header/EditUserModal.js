import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/userSlice";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../graphql/schemas/users";
import classNames from "classnames";

import WindowBlur from "../../windowBlur";
import ThreeDotsLoading from "../../ThreeDotsLoading";

const EditUserModal = ({ setModal }) => {
  const dispatch = useDispatch();
  const [updateUser, { loading }] = useMutation(
    UPDATE_USER("name", "email", "phone", "contact"),
    {
      fetchPolicy: "no-cache",
    }
  );

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
    contact: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((state) => ({ ...state, [name]: value }));
  };
  const changeContact = (name) => {
    setInputs((state) => ({ ...state, contact: name }));
  };

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const phoneRegex = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}(\-|\s)?[0-9]{4}$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {};
    Object.keys(inputs).forEach((key) => {
      if (inputs[key].replace(" ", "")) {
        data[key] = inputs[key];
      }
    });

    if (!data["email"] || emailRegex.test(data["email"])) {
      if (!data["phone"] || phoneRegex.test(data["phone"])) {
        updateUser({
          variables: { data },
        }).then(({ data }) => {
          const { contact, name } = data.updateUser;
          dispatch(setUser({ contact, name }));
          setModal();
        });
      }
    }
  };

  return (
    <>
      <WindowBlur setChildrenState={loading ? () => {} : setModal}>
        <form onSubmit={handleSubmit}>
          {loading ? (
            <div className='loading'>
              <ThreeDotsLoading />
            </div>
          ) : (
            <>
              <label>
                <span>Nome</span>
                <input
                  type='text'
                  name='name'
                  autoComplete='off'
                  onChange={handleInputChange}
                />
              </label>
              <label>
                <span>Email</span>
                <input
                  type='text'
                  name='email'
                  autoComplete='off'
                  className={classNames({
                    alert: inputs.email.length > 0 && !emailRegex.test(inputs.email),
                  })}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                <span>Telefone</span>
                <input
                  type='text'
                  name='phone'
                  autoComplete='off'
                  className={classNames({
                    alert: inputs.phone.length > 0 && !phoneRegex.test(inputs.phone),
                  })}
                  onChange={handleInputChange}
                />
              </label>
              <div className='btns'>
                <span>Contato principal</span>
                <div className='align'>
                  <button
                    type='button'
                    className={classNames("btn-contact", {
                      selected: inputs.contact === "email",
                    })}
                    onClick={() => changeContact("email")}
                  >
                    Email
                  </button>
                  <button
                    type='button'
                    className={classNames("btn-contact", {
                      selected: inputs.contact === "phone",
                    })}
                    onClick={() => changeContact("phone")}
                  >
                    Telefone
                  </button>
                </div>
              </div>
              <div className='submit-container'>
                <button type='submit' className='btn-submit'>
                  Salvar
                </button>
                <button className='btn-close-modal' onClick={setModal}>
                  Cancelar
                </button>
              </div>
            </>
          )}
        </form>
      </WindowBlur>

      <style jsx>{`
        form {
          padding: 20px;
          width: 400px;
          height: 440px;
          background-color: #fff;
          display: flex;
          flex-direction: column;
          gap: 20px;
          border-radius: 4px;
        }
        .loading {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
        }
        .btns,
        label span {
          font-size: 14px;
          font-weight: bold;
          color: #444;
          margin-left: 3px;
        }
        label input {
          border: solid 1px #ccc;
          border-radius: 4px;
          padding: 10px;
          width: 100%;
        }
        label input.alert {
          border-color: #f00;
          outline-color: #f00;
        }
        .align {
          padding: 10px 0;
          display: flex;
          gap: 20px;
          align-items: center;
        }
        .btn-contact {
          border: solid 1px #ccc;
          min-width: 100px;
          border-radius: 4px;
          color: #000;
          padding: 7px;
          font-weight: bold;
        }
        .btn-contact:hover {
          color: var(--color-primary);
          border-color: var(--color-primary);
        }
        .selected {
          color: var(--color-primary);
          border-color: var(--color-primary);
        }

        .submit-container {
          margin-top: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .btn-submit {
          background-color: var(--color-primary);
          color: #fff;
          border: none;
          border-radius: 4px;
          padding: 10px;
          font-weight: bold;
          width: 100%;
          transition: background 0.2s;
        }
        .btn-submit:hover {
          background-color: var(--color-primary-dark);
        }
        .btn-close-modal {
          width: 70px;
          padding: 5px;
        }
      `}</style>
    </>
  );
};

export default EditUserModal;
