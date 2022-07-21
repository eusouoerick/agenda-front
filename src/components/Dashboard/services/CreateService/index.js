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

      <style jsx>{`
        .create-service {
          position: relative;
          width: 240px;
          height: 300px;
          background: #fff;
          border: var(--gray-border);
          border-radius: 4px;
          grid-column: 1;
          grid-row: 1;
          cursor: pointer;
          border-color: var(--color-primary-light);
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
      `}</style>
    </>
  );
};

export default CreateService;
