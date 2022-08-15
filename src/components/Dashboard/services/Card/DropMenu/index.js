import { useRef, useEffect } from "react";
import useDropMenu from "./useDropMenu";

const DropMenu = ({ setDropOpen, id }) => {
  const dropRef = useRef();
  const { handleDelete } = useDropMenu({ id });

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
