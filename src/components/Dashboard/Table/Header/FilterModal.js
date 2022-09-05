import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setService, setDate } from '../../../../store/tableFilterSlice';
import { useQuery, gql } from '@apollo/client';
import BtnStatus from './BtnStatus';

const SCHEMA = gql`
  query {
    servicesBySchedules {
      _id
      name
    }
  }
`;

const FilterModal = ({ closeModal, handlePage }) => {
  const modalRef = useRef();
  const dispatch = useDispatch();
  const { service, date } = useSelector((state) => state.tableFilter);
  const { data, loading } = useQuery(SCHEMA);

  const selectService = useCallback(
    (id) => {
      handlePage(1);
      dispatch(setService(id));
    },
    [dispatch, handlePage]
  );

  const selectDate = useCallback(
    (date) => {
      handlePage(1);
      dispatch(setDate(date));
    },
    [dispatch, handlePage]
  );

  useEffect(() => {
    // close modal when click outside of it
    const handleCloseModal = (event) => {
      if (!modalRef.current.contains(event.target)) {
        closeModal();
      }
    };
    document.addEventListener('mousedown', handleCloseModal);
    return () => {
      document.removeEventListener('mousedown', handleCloseModal);
    };
  }, [closeModal]);

  return (
    <>
      <div className='filter-modal' ref={modalRef}>
        <div className='header'>
          <span>Filtros</span>
          <button onClick={() => closeModal(() => false)}>
            <span className='material-icons'>close</span>
          </button>
        </div>
        <form className='body' onSubmit={(e) => e.preventDefault()}>
          <div className='field'>
            <label htmlFor='ft-date'>Data:</label>
            <input
              id='ft-date'
              type='date'
              value={date}
              onChange={(e) => selectDate(e.target.value)}
            />
          </div>
          <div className='field'>
            <label htmlFor='ft-services'>Serviço:</label>
            {loading && <p>Loading...</p>}
            {!loading && (
              <select
                id='ft-services'
                defaultValue={service}
                onChange={(e) => selectService(e.target.value)}
              >
                <option value='all'>Todos</option>
                {data?.servicesBySchedules?.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className='field' style={{ flexDirection: 'column' }}>
            <span>Status:</span>
            <div className='btns-status'>
              <BtnStatus name={'completed'} />
              <BtnStatus name={'pending'} />
              <BtnStatus name={'cancelled'} />
            </div>
          </div>
        </form>
      </div>

      <style jsx>{`
        .filter-modal {
          display: flex;
          flex-direction: column;
          position: absolute;
          top: 0;
          right: 5px;
          width: 260px;
          height: 290px;
          animation: slide 0.15s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          overflow: hidden;
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
        .field input[type='date'] {
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
        .field input[type='checkbox'] {
          display: none;
        }
        .field input[type='checkbox']:checked + label {
          color: var(--color-completed);
        }
      `}</style>
    </>
  );
};

export default FilterModal;
