import Image from "next/image";

const FirstContent = () => {
  return (
    <>
      <section>
        <article>
          <h1>Lorem ipsum dolor sit amet consectetur</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis
            voluptatibus exercitationem praesentium alias autem numquam quo explicabo,
            sapiente repellendus magni minima laudantium accusantium dignissimos dicta
            ea distinctio mollitia!
          </p>
          <a href='#services' id='services'>
            Ver mais
          </a>
        </article>
        <div className='img'>
          <Image
            src='/images/home.jpg'
            alt='foto ilustrativa'
            width={470}
            height={320}
            priority
            quality={100}
          />
        </div>
      </section>

      <style jsx>{`
        section {
          background: #fff;
          opacity: 0;
          width: 65rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          animation: fadeIn 0.5s cubic-bezier(0.4, 0, 1, 1) forwards;
        }
        section article {
          width: 500px;
        }
        section article a {
          justify-self: flex-end;
        }

        @media (max-width: 1100px) {
          section {
            width: 100%;
            padding: 0 50px;
          }
          .img {
            width: 40%;
          }
        }

        @media (max-width: 980px) {
          .img {
            display: none;
          }
        }

        @media (max-width: 510px) {
          section {
            padding: 0 25px;
          }
        }
      `}</style>
    </>
  );
};

export default FirstContent;
