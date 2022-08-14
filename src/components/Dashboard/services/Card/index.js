import { useCallback } from "react";
import { useState, memo } from "react";

import DropMenu from "./DropMenu"; // opções de editar e excluir o serviço
import CreateSchedule from "../../../CreateSchedule";

const Card = ({ item, adm }) => {
  const [show, setShow] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);

  const closeCreator = useCallback(() => {
    setShow(() => false);
  }, []);

  return (
    <>
      {show && (
        <CreateSchedule closeCreator={closeCreator} selectedService={item._id} />
      )}
      <div className='service'>
        {dropOpen && <DropMenu id={item._id} setDropOpen={setDropOpen} />}
        {adm && !dropOpen && (
          <button className='three-dots' onClick={() => setDropOpen(() => true)}>
            <span className='material-icons'>more_vert</span>
          </button>
        )}
        <div className='align'>
          <span className='name'>{item.name}</span>
          <span className='price'>R$ {item.price.toString().replace(".", ",")}</span>
        </div>
        <span className='desc'>{item.description}</span>
        <button className='btn' onClick={() => setShow(true)}>
          Agendar serviço
        </button>
      </div>

      <style jsx>{`
        .service {
          position: relative;
          width: 240px;
          height: 300px;
          background: #fff;
          border: var(--gray-border);
          border-radius: 4px;
          display: flex;
          align-items: center;
          padding: 20px;
          flex-direction: column;
          justify-content: space-between;
        }
        .service:hover {
          border-color: #bfbfbf;
        }
        .three-dots {
          position: absolute;
          top: 10px;
          right: -2px;
          color: #7a7a7a;
          display: none;
        }
        .three-dots:hover {
          color: var(--color-primary);
        }
        .service:hover .three-dots {
          display: block;
        }
        .align {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .name {
          text-align: center;
          color: var(--color-primary);
          font-size: 20px;
          font-weight: bold;
        }
        .price {
          font-size: 18px;
          color: #303030;
        }
        .desc {
          text-align: center;
          font-size: 14px;
          color: #303030;
        }
        .btn {
          justify-self: flex-end;
          background: var(--color-primary);
          color: #fff;
          border: none;
          border-radius: 5px;
          padding: 8px 10px;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .btn:hover {
          background: var(--color-primary-dark);
        }

        @media (max-width: 1250px) {
          .three-dots {
            display: block;
          }
        }
      `}</style>
    </>
  );
};

export default memo(Card);
