import { format } from "date-fns";

import WindowBlur from "../../../../windowBlur";
import BtnStatus from "../BtnStatus";

const TableItemModal = ({
  handleModal,
  handleDelete,
  item,
  handleUpdate,
  loading,
}) => {
  return (
    <>
      <WindowBlur setChildrenState={handleModal}>
        <div className='container'>
          <button className='btn-close' onClick={handleModal}>
            <span className='material-icons'>close</span>
          </button>
          <div className='id-area'>
            <span className='id-title'>#ID</span>
            <i>
              <span className='id'>{item._id}</span>
            </i>
          </div>
          <div className='info-area'>
            <div className='info'>
              <span className='title'>Autor</span>
              <span>{item.createdBy.name}</span>
            </div>
            <div className='info'>
              <span className='title'>Contato</span>
              <span>{item.createdBy.contact}</span>
            </div>
            <div className='info'>
              <span className='title'>Serviço</span>
              <span>{item.service.name}</span>
            </div>
            <div className='info'>
              <span className='title'>Preço</span>
              <span>
                {item.service.price.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
            <div className='info'>
              <span className='title'>Data</span>
              <div>
                <span style={{ marginRight: 10 }}>
                  {format(new Date(item.date), "H") +
                    "h" +
                    (+format(new Date(item.date), "mm") || "")}
                </span>
                <span>{format(new Date(item.date), "dd/MM/yyyy")}</span>
              </div>
            </div>
          </div>
          <div className='btn-area'>
            <button className='btn-delete' onClick={() => handleDelete(item._id)}>
              Deletar
            </button>
            <div className='status-area'>
              <span>Status</span>
              <BtnStatus
                status={item.status}
                handleUpdate={handleUpdate}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </WindowBlur>

      <style jsx>{`
        .container {
          padding: 20px 15px;
          width: 350px;
          height: 360px;
          background-color: #fff;
          position: relative;
          border-radius: 5px;
          font-size: 14px;
        }
        .btn-close {
          position: absolute;
          top: 10px;
          right: 10px;
          padding: 10px;
        }

        .id-area {
          color: #343434;
          height: 50px;
          display: flex;
          flex-direction: column;
          border-bottom: 1px solid #ccc;
        }
        .id-title {
          font-weight: bold;
        }
        .id {
          font-weight: bold;
        }
        .info {
          overflow: auto;
          padding: 10px 0;
          display: flex;
          border-bottom: 1px solid #ccc;
        }

        .title {
          font-weight: bold;
          width: 100px;
          min-width: 100px;
        }

        .btn-area {
          display: flex;
          justify-content: space-around;
          align-items: center;
          margin: 25px auto;
        }
        button.btn-delete {
          align-self: flex-end;
          background-color: hsl(0deg 82% 52%);
          color: #fff;
          border-radius: 5px;
          padding: 7px 20px;
          max-height: 30px;
        }
        button.btn-delete:hover {
          background-color: hsl(0deg 82% 32%);
        }
        .status-area {
          font-weight: bold;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }

        @media (max-width: 350px) {
          .container {
            width: 100vw;
            border-radius: 0;
          }
        }
      `}</style>
    </>
  );
};

export default TableItemModal;
