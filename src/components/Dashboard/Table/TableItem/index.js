import { memo, useState, useRef } from "react";
import { format } from "date-fns";
import useHook from "./useHook";

import TableItemModal from "./TableItemModal";
import BtnStatus from "./BtnStatus";

const TableItem = ({ item, handlePage }) => {
  const ref = useRef();
  const [status, setStatus] = useState(item.status);
  const [modalOpen, setModalOpen] = useState(false);
  const { handleUpdate, handleDelete, loading } = useHook({
    item,
    status,
    setStatus,
    element: ref,
    handlePage,
  });
  const handleModal = () => {
    setModalOpen((state) => !state);
  };

  return (
    <>
      {modalOpen && (
        <TableItemModal
          item={item}
          handleDelete={handleDelete}
          handleModal={handleModal}
          handleUpdate={handleUpdate}
          loading={loading}
        />
      )}
      <tr ref={ref} onClick={handleModal}>
        <td className='focus none-2'>{item.createdBy.name.split(" ")[0]}</td>
        <td className='blur none'>{item.createdBy.contact}</td>
        <td className='service'>{item.service.name}</td>
        <td style={{ padding: "10px 0" }}>
          <BtnStatus
            status={item.status}
            handleUpdate={handleUpdate}
            loading={loading}
            respon
          />
        </td>
        <td className='blur align-itens'>
          <span>
            {format(new Date(item.date), "H") +
              "h" +
              (+format(new Date(item.date), "mm") || "")}
          </span>
          <span>{format(new Date(item.date), "dd/MM/yyyy")}</span>
        </td>
        <td className='none'>R$ {item.service.price.toString().replace(".", ",")}</td>
        <td className='none'>
          <button
            className='delete'
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(item._id);
            }}
          >
            <span className='material-icons'>close</span>
          </button>
        </td>
      </tr>

      <style jsx>{`
        td {
          display: table-cell;
          text-align: center;
          padding: 15px 10px;
          cursor: pointer;
          border-bottom: var(--gray-border);
        }
        .service {
          width: 200px;
          max-width: 200px;
        }
        .focus {
          font-weight: bold;
          text-transform: capitalize;
        }
        .blur {
          color: hsla(337, 7%, 36%, 1);
        }

        button.delete {
          padding: 0px;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: hsla(337, 7%, 36%, 1);
        }
        button.delete:hover {
          color: var(--color-cancelled);
        }
        td.align-itens {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        @media (max-width: 768px) {
          .blur {
            font-size: 14px;
          }
          .service {
            font-size: 14px;
          }
        }

        @media (max-width: 768px) {
          .none {
            display: none;
          }
        }
        @media (max-width: 425px) {
          .none-2 {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default memo(TableItem);
