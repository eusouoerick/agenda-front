import { useState, useRef } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_SERVICE, GET_SERVICES } from "../../../../graphql/schemas/services";
import classNames from "classnames";

import WindowBlur from "../../../windowBlur";
import ThreeDotsLoading from "../../../ThreeDotsLoading";
import { useCallback } from "react";

const CreateModal = ({ closeModal }) => {
  const [createService, { loading }] = useMutation(
    CREATE_SERVICE("_id", "name", "description", "price", "duration")
  );

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
  });
  const handleFormChange = useCallback((e) => {
    setForm((form) => ({ ...form, [e.target.id]: e.target.value }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.description.length <= 165 && form.name.length <= 35) {
      if (form.price.length > 0 && +form.price.replace(",", ".")) {
        if (form.duration.length > 0 && +form.duration) {
          createService({
            variables: {
              data: {
                name: form.name,
                description: form.description,
                price: +form.price.replace(",", "."),
                duration: +form.duration,
              },
            },
            update: (cache, { data: { createService } }) => {
              const { services } = cache.readQuery({ query: GET_SERVICES("_id") });
              cache.writeQuery({
                query: GET_SERVICES("_id"),
                data: { services: [...services, createService] },
              });
            },
            onCompleted: () => {
              closeModal();
            },
          });
        }
      }
    }
  };

  return (
    <>
      <WindowBlur setChildrenState={loading ? () => {} : closeModal}>
        <form className='modal' onSubmit={handleSubmit}>
          {loading ? (
            <div className='loading'>
              <ThreeDotsLoading />
            </div>
          ) : (
            <>
              <div className='field'>
                <span
                  className={classNames("counter", {
                    alert: form.name.length > 35,
                  })}
                >
                  {form.name.length}/35
                </span>
                <label htmlFor='name'>Nome</label>
                <input
                  value={form.name}
                  onChange={handleFormChange}
                  type='text'
                  id='name'
                  placeholder='Nome curto e descritivo'
                  className={classNames("input", {
                    alert: form.name.length > 35,
                  })}
                  autoComplete='off'
                  required
                  autoFocus
                />
              </div>
              <div className='align'>
                <div className='field'>
                  <label htmlFor='price'>Preço</label>
                  <input
                    value={form.price}
                    onChange={handleFormChange}
                    type='text'
                    id='price'
                    placeholder='Ex: 0,00'
                    className={classNames("input num", {
                      alert: form.price.length > 0 && !+form.price.replace(",", "."),
                    })}
                    required
                    autoComplete='off'
                  />
                </div>
                <div className='field'>
                  <label htmlFor='duration'>Duração</label>
                  <input
                    value={form.duration}
                    onChange={handleFormChange}
                    placeholder='Em minutos'
                    type='text'
                    id='duration'
                    className={classNames("input num", {
                      alert: form.duration.length > 0 && !+form.duration,
                    })}
                    required
                    autoComplete='off'
                  />
                </div>
              </div>
              <div className='field'>
                <span
                  className={classNames("counter", {
                    alert: form.description.length > 165,
                  })}
                >
                  {form.description.length}/165
                </span>
                <label htmlFor='description'>Descrição</label>
                <textarea
                  value={form.description}
                  onChange={handleFormChange}
                  id='description'
                  placeholder='Até 165 caracteres'
                  className={classNames("input", {
                    alert: form.description.length > 165,
                  })}
                  required
                  autoComplete='off'
                />
              </div>
              <div className='btns'>
                <button type='submit' className='btn-submit'>
                  Adicionar serviço
                </button>
                <button onClick={closeModal}>Cancelar</button>
              </div>
            </>
          )}
        </form>
      </WindowBlur>

      <style jsx>{`
        .modal {
          padding: 20px;
          width: 370px;
          height: 400px;
          background: #fff;
          border: var(--gray-border);
          border-radius: 4px;
        }
        .loading {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
        }
        .align {
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
        .counter {
          position: absolute;
          right: 0;
          top: 1px;
          color: #999;
          font-size: 12px;
        }
        .counter.alert {
          color: #f00;
        }
        .field {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 5px;
          margin-bottom: 20px;
        }
        .field label {
          font-size: 14px;
          font-weight: bold;
          color: #444;
        }
        .field .input {
          border: solid 1px #ccc;
          border-radius: 4px;
          padding: 10px;
        }
        .field .input.alert {
          border-color: #f00;
          outline-color: #f00;
        }
        .field .input.num {
          width: 100px;
          text-align: center;
        }
        .field textarea {
          resize: none;
          width: 100%;
          height: 86px;
        }
        .btns {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .btn-submit {
          margin-top: 10px;
          width: 100%;
          height: 40px;
          border-radius: 4px;
          background: var(--color-primary);
          color: #fff;
          transition: background 0.2s;
        }
        .btn-submit:hover {
          background: var(--color-primary-dark);
        }
      `}</style>
    </>
  );
};

export default CreateModal;
