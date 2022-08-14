import { useCallback } from "react";
import { useState } from "react";
import CreateModal from "./Modal";

const CreateService = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = useCallback(() => {
    setModalOpen((state) => !state);
  }, []);

  return (
    <>
      {modalOpen && <CreateModal closeModal={handleModalOpen} />}

      <div className='create-service'>
        <button onClick={handleModalOpen}>
          <span style={{ fontSize: 16 }}>Adicionar novo serviço</span>
          <span className='material-icons' style={{ fontSize: 30 }}>
            add
          </span>
        </button>
      </div>

      {/* btn  responsive */}
      <div className='respon'>
        <button className='create-service btn' onClick={handleModalOpen}>
          <span style={{ fontSize: 16 }}>Adicionar novo serviço</span>
          <span className='material-icons' style={{ fontSize: 20 }}>
            add
          </span>
        </button>
      </div>

      <style jsx>{`
        .create-service {
          position: relative;
          width: 240px;
          height: 300px;
          background: #fff;
          border: var(--gray-border);
          border-radius: 4px;
          cursor: pointer;
          border-color: var(--color-primary-light);
        }
        .respon {
          display: none;
        }
        .create-service.btn {
          width: 100%;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
        }

        .create-service button {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          transition: color 0.2s ease-in-out;
        }
        .create-service button:hover,
        .create-service button:focus {
          color: var(--color-primary);
        }

        @media (max-width: 499px) {
          .create-service {
            display: none;
          }
          .respon {
            display: block;
          }
        }
      `}</style>
    </>
  );
};

export default CreateService;
