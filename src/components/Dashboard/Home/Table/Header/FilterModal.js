import { useEffect } from "react";

// • parent - é o useRef do componente que chamou o modal;
const FilterModal = ({ closeModal }) => {
  useEffect(() => {}, []);

  return (
    <>
      <div className='filter-modal'>
        <div className='header'>
          <span>Filtros</span>
          <button onClick={() => closeModal(() => false)}>
            <span className='material-icons'>close</span>
          </button>
        </div>
        <form className='body'>
          <div>
            <label htmlFor='ft-date'>Data</label>
            <input id='ft-date' type='date' />
          </div>
          <div>
            <label htmlFor='ft-services'>Serviço</label>
            <select id='ft-services'>
              <option value='1'>Serviço 1</option>
              <option value='2'>Serviço 2</option>
              <option value='3'>Serviço 3</option>
            </select>
          </div>
          <div>
            <span>Status</span>
            <input type='checkbox' name='' id='ft-satatus-completed' />
            <label htmlFor='ft-satatus-completed'>Completed</label>
            <input type='checkbox' name='' id='ft-satatus-pending' />
            <label htmlFor='ft-satatus-pending'>Pending</label>
            <input type='checkbox' name='' id='ft-satatus-cancelled' />
            <label htmlFor='ft-satatus-cancelled'>Canceled</label>
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
          height: 320px;
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
      `}</style>
    </>
  );
};

export default FilterModal;
