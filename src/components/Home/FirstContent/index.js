import Image from "next/image";
import HOME_ITT from "../../../assets/img/home_itt.jpg";

const FirstContent = () => {
  return (
    <>
      <section className='fc'>
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
        <Image
          src={HOME_ITT}
          alt='foto ilustrativa'
          width={470}
          height={320}
          priority
          quality={100}
        />
      </section>

      <style jsx>{`
        .fc {
          background: #fff;
          opacity: 0;
          width: 65rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          animation: fadeIn 0.5s cubic-bezier(0.4, 0, 1, 1) forwards;
        }
        .fc article {
          width: 500px;
        }
        .fc article a {
          justify-self: flex-end;
        }
      `}</style>
    </>
  );
};

export default FirstContent;
