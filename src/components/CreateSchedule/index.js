import { useRef, useCallback } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { format } from "date-fns";
import { GET_SERVICES } from "../../graphql/schemas/services";
import { CREATE_SCHEDULE, GET_SCHEDULES } from "../../graphql/schemas/schedules";

import WindowBlur from "../windowBlur";

// get-fields - https://github.com/eusouoerick/get-fields
const SCHEMA = [
  "_id",
  { name: "createdBy", items: ["_id", "name", "contact"] },
  { name: "service", items: ["_id", "name", "price", "duration"] },
  "date",
  "status",
];

const CreateSchedule = ({ closeCreator, selectedService }) => {
  const date = useRef();
  const time = useRef();
  const service = useRef();

  const {
    data,
    loading,
    error: servicesError,
  } = useQuery(GET_SERVICES("_id", "name", "price"));
  const [createSchedule, { error: createError }] = useMutation(
    CREATE_SCHEDULE(...SCHEMA) // fields que vão ser retornados da consulta;
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      createSchedule({
        variables: {
          data: {
            service: service.current.value,
            date: new Date(`${date.current.value} ${time.current.value}`),
          },
        },
        refetchQueries: [
          {
            query: GET_SCHEDULES(...SCHEMA),
            variables: { service: "all", date: "" },
          },
        ],
        onCompleted: () => closeCreator(),
        onError: (error) => console.log(error.message),
      });
    },
    [createSchedule, closeCreator]
  );

  return (
    <WindowBlur setChildrenState={closeCreator}>
      <form className='form' onSubmit={handleSubmit}>
        {true && <span className='error'>{createError?.message}</span>}
        <div className='fc'>
          <div className='date-container'>
            <div className='input-area'>
              <label htmlFor='date'>Data</label>
              <input
                ref={date}
                className='input'
                id='date'
                name='date'
                type='date'
                min={format(new Date(), "yyyy-MM-dd")}
                autoFocus
                required
              />
            </div>
            <div className='input-area'>
              <label htmlFor=''>Horario</label>
              <input
                ref={time}
                style={{ minWidth: 90, maxWidth: 90 }}
                className='input'
                id='time'
                name='time'
                type='time'
                value={"09:00"}
                onChange={(e) => e.target.value}
                min='09:00'
                max='18:00'
                required
              />
            </div>
          </div>
          <div className='input-area services-area'>
            <label htmlFor='services'>Serviço</label>
            <select
              ref={service}
              className='input'
              name='services'
              id='services'
              required
              defaultValue={selectedService || undefined}
            >
              <option value='' style={{ color: "transparent" }}>
                Selecionar
              </option>
              {data?.services.map((item) => (
                <option value={item._id} key={item._id}>
                  {item.name} - R${item.price.toString().replace(".", ",")}
                </option>
              ))}
            </select>
          </div>
          <div className='btns'>
            <button type='submit' disabled={loading}>
              Agendar dia
            </button>
            <button className='blur' onClick={closeCreator}>
              Cancelar
            </button>
          </div>
        </div>
      </form>

      <style jsx>{`
        .form {
          width: 350px;
          height: 360px;
          background: #fff;
          border-radius: 4px;
          padding: 10px 25px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 30px;
        }
        .form .input-area {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        span.error {
          color: red;
          margin-top: 10px;
        }
        .fc {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        label {
          font-size: 14px;
          font-weight: bold;
          color: #444;
        }
        .input {
          width: 100%;
          height: 40px;
          border-radius: 4px;
          border: 1px solid #ccc;
          padding: 0 10px;
          margin-bottom: 10px;
        }
        .date-container {
          width: 270px;
          display: flex;
          justify-content: space-between;
        }
        .services-area {
          width: 270px;
        }
        #services {
          font-size: 14px;
        }
        .btns {
          margin-top: 10px;
          width: 200px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        form button[type="submit"] {
          width: 100%;
          padding: 10px 7px;
          border-radius: 4px;
          border: none;
          background: var(--color-primary);
          color: #fff;
          font-size: 16px;
          cursor: pointer;
        }
      `}</style>
    </WindowBlur>
  );
};

export default CreateSchedule;
