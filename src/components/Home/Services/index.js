import { useRef, useMemo, useEffect, useState } from "react";
import CardService from "./CardService";

const Services = ({ servicesList }) => {
  const carousel = useRef(null);
  const [showBtn, setShowBtn] = useState(null);

  const handleLeftClick = (e) => {
    e.preventDefault();
    carousel.current.scrollLeft -= carousel.current.offsetWidth;
  };
  const handleRightClick = (e) => {
    e.preventDefault();
    carousel.current.scrollLeft += carousel.current.offsetWidth;
  };

  useEffect(() => {
    if (carousel.current.offsetWidth >= 1237) {
      setShowBtn("block");
    } else {
      setShowBtn("none");
    }
  }, [carousel]);

  return (
    <>
      <section className='services'>
        <h2>Serviços</h2>
        <div
          className='carousel'
          style={{ justifyContent: showBtn === "none" ? "center" : "space-between" }}
        >
          <button
            className='carousel-btn'
            style={{ display: showBtn }}
            onClick={handleLeftClick}
          >
            <span className='material-icons'>chevron_left</span>
          </button>
          <div className='items' ref={carousel}>
            {servicesList.map((item) => (
              <CardService item={item} key={item._id} />
            ))}
          </div>
          <button
            className='carousel-btn'
            style={{ display: showBtn }}
            onClick={handleRightClick}
          >
            <span className='material-icons'>chevron_right</span>
          </button>
        </div>
      </section>

      <style jsx>{`
        .services {
          background: #ebebebcc;
          opacity: 0;
          width: 100vw;
          padding: 2rem 0;
          display: flex;
          gap: 1rem;
          flex-direction: column;
          align-items: center;
          animation: fadeIn 1s cubic-bezier(0.4, 0, 1, 1) forwards;
        }
        .carousel {
          width: 100%;
          max-width: 2000px;
          display: flex;
          align-items: center;
          padding: 0 15px;
          gap: 10px;
        }
        .items {
          display: flex;
          max-width: 100%;
          overflow-x: hidden;
          scroll-behavior: smooth;
          align-items: center;
          gap: 10px;
        }
        .carousel-btn {
          height: 220px;
          width: 40px;
          background: #d9d9d9;
          border: solid 1px #ccc;
        }
        .carousel-btn span {
          font-size: 25px;
          font-weight: bold;
          color: var(--color-primary);
        }
        .service-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 240px;
          max-width: 240px;
          height: 300px;
          background: #fff;
          border: var(--gray-border);
          border-radius: 4px;
          display: flex;
          align-items: center;
          padding: 20px;
          flex-direction: column;
          justify-content: space-around;
        }
        .name {
          text-align: center;
          color: var(--color-primary);
          font-size: 20px;
          font-weight: bold;
        }

        .price {
          font-size: 18px;
          font-weight: bold;
          color: #303030;
        }
        .desc {
          text-align: center;
          font-size: 14px;
          color: #303030;
        }

        @media (max-width: 1100px) {
          .carousel {
            padding: 0 10px;
          }
          .items {
            overflow-x: auto;
          }
        }
      `}</style>
    </>
  );
};

export default Services;
