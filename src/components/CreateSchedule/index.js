import { gql, useQuery } from "@apollo/client";
import { format } from "date-fns";

const GET_SERVICES = gql`
  query GetServices {
    services {
      _id
      name
      price
    }
  }
`;

const CreateSchedule = ({ closeCreator }) => {
  const { data, loading, error } = useQuery(GET_SERVICES);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };
  return (
    <>
      <form className='modal' onSubmit={handleSubmit}>
        <h2 style={{ fontSize: 22 }}>Erro mensagem</h2>
        <div className='date-container'>
          <div className='input-area'>
            <label htmlFor='date'>Data</label>
            <input
              className='input'
              id='date'
              name='date'
              type='date'
              min={format(new Date(), "yyyy-MM-dd")}
              autoFocus
              // required
            />
          </div>
          <div className='input-area'>
            <label htmlFor=''>Horario</label>
            <input
              style={{ minWidth: 90, maxWidth: 90 }}
              className='input'
              id='time'
              name='time'
              type='time'
              // min='09:00'
              // max='18:00'
              // required
            />
          </div>
        </div>
        <div className='input-area services-area'>
          <label htmlFor='services'>Serviço</label>
          <select className='input' name='services' id='services'>
            <option value='' defaultChecked style={{ color: "transparent" }}>
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
          <button type='submit'>Agendar dia</button>
          <button className='blur' onClick={closeCreator}>
            Cancelar
          </button>
        </div>
      </form>

      <style jsx>{`
        .modal {
          width: 350px;
          height: 360px;
          background: #fff;
          border-radius: 6px;
          padding: 10px 25px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .modal .input-area {
          display: flex;
          flex-direction: column;
          gap: 5px;
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
    </>
  );
};

export default CreateSchedule;
