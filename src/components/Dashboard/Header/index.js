import { useCallback } from "react";
import { useState } from "react";

import EditUserModal from "./EditUserModal";
import MenuModal from "./MenuModal";

const HeaderDashboard = ({ loadingRouter }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [menuModal, setMenuModal] = useState(false);

  const handleEditModalOpen = useCallback(() => {
    setEditModalOpen((state) => !state);
  }, []);

  const toogleMenuModal = useCallback(() => {
    setMenuModal((state) => !state);
  }, []);

  return (
    <>
      {editModalOpen && <EditUserModal setModal={handleEditModalOpen} />}
      {menuModal && <MenuModal toogleMenuModal={toogleMenuModal} />}
      
      <header>
        <div className='flex'>
          <button className='btn-menu' onClick={toogleMenuModal}>
            <span className='material-icons'>menu</span>
          </button>
          <h1>LOGO</h1>
        </div>
        {!loadingRouter && (
          <div>
            <button className='btn-edit-user' onClick={handleEditModalOpen}>
              <span>Editar perfil</span>
            </button>
          </div>
        )}
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
        .flex {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .flex h1 {
          margin: 0;
        }

        .btn-menu {
          display: none;
        }

        .btn-edit-user::before {
          content: " ";
          display: block;
          width: 2px;
          height: 30px;
          background-color: #ccc;
        }
        .btn-edit-user {
          position: relative;
          display: flex;
          gap: 15px;
          align-items: center;
          font-size: 16px;
          font-weight: bold;
          color: #5c5c5c;
        }
        .btn-edit-user:hover {
          color: var(--color-primary);
        }

        @media (max-width: 1250px) {
          .btn-menu {
            display: block;
          }
          .btn-edit-user{
            font-size: 14px;
          }
        }
        @media (max-width: 768px) {
          header {
            padding: 0 20px;
          }
          .flex h1 {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default HeaderDashboard;
