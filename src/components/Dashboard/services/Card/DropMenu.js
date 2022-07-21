import { useRef, useEffect, useCallback } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_SERVICE, GET_SERVICES } from "../../../../graphql/schemas/services";

const DropMenu = ({ setDropOpen, id }) => {
  const [deleteService] = useMutation(DELETE_SERVICE());
  const dropRef = useRef();

  useEffect(() => {
    const closeDrop = (e) => {
      if (!dropRef.current.contains(e.target)) {
        setDropOpen(() => false);
      }
    };
    document.addEventListener("mousedown", closeDrop);
    return () => {
      document.removeEventListener("mousedown", closeDrop);
    };
  }, [setDropOpen]);

  const handleDelete = useCallback(() => {
    deleteService({
      variables: { id },
      update: (cache) => {
        const { services } = cache.readQuery({ query: GET_SERVICES("_id") });
        cache.writeQuery({
          query: GET_SERVICES("_id"),
          data: { services: services.filter((service) => service._id !== id) },
        });
      },
    });
  }, [deleteService, id]);

  return (
    <>
      <div className='drop-menu' ref={dropRef}>
        <button className='drop-menu__item' onClick={handleDelete}>
          <span>Remover</span>
        </button>
      </div>

      <style jsx>{`
        .drop-menu {
          position: absolute;
          top: 12px;
          right: 10px;
          width: 100px;
          background: #2a2a2a;
          border: var(--gray-border);
          z-index: 100;
        }
        .drop-menu__item {
          color: #fff;
          padding: 8px 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          cursor: pointer;
          font-size: 14px;
        }
      `}</style>
    </>
  );
};

export default DropMenu;
