import { useCallback } from "react";
import { useState } from "react";

import EditUserModal from "./EditUserModal";

const HeaderDashboard = () => {
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleEditModalOpen = useCallback(() => {
    setEditModalOpen((state) => !state);
  }, []);

  return (
    <>
      {editModalOpen && <EditUserModal setModal={handleEditModalOpen} />}
      <header>
        <h1>LOGO</h1>
        <div>
          <button className='user-container' onClick={handleEditModalOpen}>
            <span>Editar perfil</span>
          </button>
        </div>
      </header>
      <style jsx>{`
        header {
          background-color: #fff;
          width: 100%;
          height: 70px;
          padding: 0 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .user-container::before {
          content: " ";
          display: block;
          width: 2px;
          height: 30px;
          background-color: #ccc;
        }
        .user-container {
          position: relative;
          display: flex;
          gap: 15px;
          align-items: center;
          font-size: 16px;
          font-weight: bold;
          color: #5c5c5c;
        }
        .user-container:hover {
          color: var(--color-primary);
        }
      `}</style>
    </>
  );
};

export default HeaderDashboard;
