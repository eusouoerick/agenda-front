import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className='container'>
      <header>
        <div className='focus'>
          <div className='hd-lf'>
            <span className='logo'>LOGO</span>
            <nav>
              <ul className='nav'>
                <li>
                  <a href='#fc'>
                    <span>About us</span>
                  </a>
                </li>
                <li>
                  <a href='#services'>
                    <span>Services</span>
                  </a>
                </li>
                <li>
                  <a href='#schedules'>
                    <span>Schedules</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div>
            <button className='btn lgn'>Sign in</button>
            <button className='btn rgt'>Sign up</button>
          </div>
        </div>
      </header>
      <main>
        <section id='fc' className='fc'>
          <article>
            <h1>Lorem ipsum dolor sit amet consectetur</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis
              voluptatibus exercitationem praesentium alias autem numquam quo
              explicabo, sapiente repellendus magni minima laudantium accusantium
              dignissimos dicta ea distinctio mollitia!
            </p>
            <a href='#services'>Ver mais</a>
          </article>
          <Image
            src='/img/s1.jpg'
            alt='foto ilustrativa'
            width={470}
            height={320}
            priority
            quality={100}
          />
        </section>
        <section id='services' className='services'>
          <h2>Serviços</h2>
          <div className='sv-list'>
            <div>
              <h4>Massagens relaxantes</h4>
              <ul>
                <li>Massagem relaxante corporal</li>
                <li>Massagem Anti Álgica</li>
                <li>Terapia das pedras quentes</li>
              </ul>
            </div>
            <div>
              <h4>Terapias orientais</h4>
              <ul>
                <li>Acupuntura Auricular com Cristais Radiônicos</li>
                <li>Acupuntura Energética com Agulhas</li>
                <li>Acupuntura sem Agulhas com Cristais</li>
              </ul>
            </div>
            <div>
              <h4>Fisioterapia</h4>
              <ul>
                <li>Hidroterapia</li>
                <li>Pilates</li>
                <li>Laser</li>
              </ul>
            </div>
            <div className='btn-container'>
              <a href='#' className='btn sv-btn'>
                Ver agenda
              </a>
            </div>
          </div>
        </section>
        <section className='calendar'></section>
      </main>
      <footer></footer>

      <style jsx>{`
        header {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100vw;
          opacity: 0;
          animation: fadeIn 0.2s ease-in-out forwards;
        }
        header .focus {
          width: 65rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 50px;
        }
        header .hd-lf {
          display: flex;
          align-items: center;
        }
        header .logo {
          font-size: 24px;
          font-weight: bold;
          color: hsl(250, 70%, 50%);
        }
        header .nav {
          display: flex;
          gap: 20px;
        }
        header .nav li {
          cursor: pointer;
          list-style: none;
        }
        header .nav li a {
          text-decoration: none;
          color: #000;
        }
        header .nav li a:hover {
          text-decoration: underline;
        }
        .btn {
          padding: 6px 8px;
          background: none;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
        }
        header .btn.lgn:hover {
          color: hsl(250, 70%, 50%);
          text-decoration: underline;
        }
        header .btn.rgt {
          color: hsl(250, 70%, 50%);
          margin-left: 10px;
          border: 1px solid hsl(250, 70%, 50%);
        }
        header .btn.rgt:hover {
          color: hsl(0, 0%, 100%);
          background: hsl(250, 70%, 50%);
        }
        main {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 40px 0 80px;
        }
        .fc {
          opacity: 0;
          width: 65rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          animation: fadeIn 0.5s cubic-bezier(0.4, 0, 1, 1) forwards;
        }
        @keyframes fadeIn {
          100% {
            opacity: 1;
          }
        }
        .fc article {
          width: 500px;
        }
        .fc article a {
          justify-self: flex-end;
        }
        .services {
          background: #f5f5f5;
          opacity: 0;
          width: 100vw;
          max-height: 380px;
          padding: 2rem 0;
          margin-top: 90px;
          display: flex;
          gap: 1rem;
          flex-direction: column;
          align-items: center;
          animation: fadeIn 1s cubic-bezier(0.4, 0, 1, 1) forwards;
        }
        .sv-list {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          grid-gap: 1.1rem;
        }
        .sv-list ul {
          margin: 0;
        }
        .sv-list h4 {
          margin: 5px 0 10px;
        }
        .sv-list li {
          padding: 2px 0;
        }
        .sv-list li::marker {
          color: hsl(250, 70%, 50%);
        }
        .sv-list .btn-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .sv-list .sv-btn {
          text-decoration: none;
          color: #fff;
          background: hsl(250, 70%, 50%);
          border: solid 1px hsl(250, 70%, 50%);
        }
        .sv-list .btn-container a:hover {
          background: hsl(250, 70%, 50%);
          color: #fff;
        }
        footer {
          background: hsl(0, 0%, 10%);
          width: 100vw;
          height: 200px;
        }
      `}</style>
    </div>
  );
}
