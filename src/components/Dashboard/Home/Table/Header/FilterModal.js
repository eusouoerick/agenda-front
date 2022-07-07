import { useEffect } from "react";

import BtnStatus from "./BtnStatus";

const FilterModal = ({ closeModal }) => {
  return (
    <>
      <div className='filter-modal'>
        <div className='header'>
          <span>Filtros</span>
          <button onClick={() => closeModal(() => false)}>
            <span className='material-icons'>close</span>
          </button>
        </div>
        <form className='body' onSubmit={(e) => e.preventDefault()}>
          <div className='field'>
            <label htmlFor='ft-date'>Data:</label>
            <input id='ft-date' type='date' />
          </div>
          <div className='field'>
            <label htmlFor='ft-services'>Serviço:</label>
            <select id='ft-services'>
              <option value='all' selected>Todos</option>
              <option value='1'>Serviço 1</option>
              <option value='2'>Serviço 2</option>
              <option value='3'>Serviço 3</option>
            </select>
          </div>
          <div className='field' style={{ flexDirection: "column" }}>
            <span>Status:</span>
            <div className='btns-status'>
              <BtnStatus name={"completed"} />
              <BtnStatus name={"pending"} />
              <BtnStatus name={"cancelled"} />
            </div>
          </div>
        </form>
      </div>

      <style jsx>{`
        .filter-modal {
          opacity: 1;
          display: flex;
          flex-direction: column;
          position: absolute;
          top: 0;
          right: 0;
          height: 300px;
          width: 260px;
          background: #fff;
          border: var(--gray-border);
          border-radius: 4px;
          font-weight: bold;
          letter-spacing: 0.02rem;
          color: #585858;
          z-index: 1;
          box-shadow: 0px 4px 10px hsl(0deg 0% 60%);
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem;
          border-bottom: var(--gray-border);
        }
        .body {
          padding: 20px 10px;
          font-size: 16 px;
        }
        .field {
          position: relative;
          margin-bottom: 15px;
        }
        .field label {
          margin-right: 0.5rem;
        }
        .field select {
          margin-top: 5px;
          padding: 3px 10px;
          width: 100%;
        }
        .field input[type="date"] {
          width: 150px;
          padding: 2px 5px;
          position: absolute;
          right: 0;
        }
        .field .btns-status {
          margin-top: 5px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          gap: 10px 0;
        }
        .field input[type="checkbox"] {
          display: none;
        }
        .field input[type="checkbox"]:checked + label {
          color: var(--color-completed);
        }
      `}</style>
    </>
  );
};

export default FilterModal;
