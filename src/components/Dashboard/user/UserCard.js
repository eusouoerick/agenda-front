import { useState } from "react";

import UserModal from "./UserModal";

const UserCard = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen((state) => !state);
  };

  return (
    <>
      {isOpen && <UserModal userId={user._id} setModal={handleOpen} />}
      <div className='user'>
        <div className='info'>
          <span className='name'>{user.name}</span>
          <div className='contact'>
            {user.email && <span>{user.email}</span>}
            {user.phone && <span>{user.phone}</span>}
          </div>
        </div>
        <div className='actions'>
          <button className='btn more' onClick={handleOpen}>
            Ver mais
          </button>
          {/* <button className='btn block' >Bloquear</button> */}
        </div>
      </div>

      <style jsx>{`
        .user {
          padding: 10px 15px;
          height: 100px;
          width: 400px;
          background-color: #fff;
          border-radius: 5px;
          border: var(--gray-border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .info,
        .contact {
          display: flex;
          flex-direction: column;
        }
        .info {
          gap: 10px;
        }
        .user .name {
          text-transform: capitalize;
          font-size: 18px;
          font-weight: bold;
        }
        .user .contact {
          gap: 3px;
          font-size: 14px;
          color: #666;
        }

        .actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: center;
        }
        .btn {
          padding: 7px 12px;
          border-radius: 5px;
          border: var(--gray-border);
        }
        .btn.more {
          background-color: var(--color-primary);
          color: #fff;
        }

        @media (max-width: 410px) {
          .user {
            width: 100%;
            border-radius: 0;
          }
        }
      `}</style>
    </>
  );
};

export default UserCard;
