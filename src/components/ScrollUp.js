import { useState, useEffect, useCallback } from "react";

const ScrollUp = ({ container }) => {
  const [show, setShow] = useState(false);

  const handleScroll = useCallback(() => {
    container.current.scroll(0, 0);
  }, [container]);

  useEffect(() => {
    const onScroll = (e) => {
      if (e.target.scrollTop > 85) {
        setShow(() => true);
      } else if (e.target.scrollTop <= 85) {
        setShow(() => false);
      }
    };
    container.current.addEventListener("scroll", onScroll);
  }, [container]);

  return (
    <>
      {show && (
        <button onClick={handleScroll}>
          <span className='material-icons'>arrow_upward</span>
        </button>
      )}
      <style jsx>{`
        button {
          color: #efefef;
          position: fixed;
          bottom: 20px;
          right: 40px;
          width: 45px;
          height: 40px;
          border: solid 1px #ccc;
          background: #181818;
          border-radius: 6px;
          opacity: 0;
          index: 999;
          animation: fadeIn 0.5s forwards;
        }

        @keyframes fadeIn {
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default ScrollUp;
