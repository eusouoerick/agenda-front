import { useEffect } from "react";
import { useSelector } from "react-redux";

import Header from "../components/Home/Header";
import FirstContent from "../components/Home/FirstContent";
import Services from "../components/Home/Services";
import Calendar from "../components/Calendar";

export default function Home() {
  const { windowBlur } = useSelector((state) => state.settings);

  // • passar esste useEffect para o componente WindowBlur
  useEffect(() => {
    if (windowBlur) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [windowBlur]);

  return (
    <div className='container'>
      {/* colocar dentro do componente que vai gerar a ação
        {windowBlur && <WindowBlur></WindowBlur>} */}
      <Header />
      <main>
        <FirstContent />
        <Services />
        <section className='calendar-container'>
          <h2 style={{ margin: 0 }}>Agendar dia</h2>
          <Calendar />
        </section>
      </main>
      <footer>
        <span>by Erick Gabriel</span>
        <span>limaerick.03@gmail.com</span>
      </footer>

      <style jsx>{`
        main {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 40px 0 120px;
          gap: 90px;
        }
        .calendar-container {
          opacity: 0;
          animation: fadeIn 1.2s cubic-bezier(0.4, 0, 1, 1) forwards;
          display: flex;
          align-items: center;
          flex-direction: column;
          gap: 40px;
        }
        footer {
          position: absolute;
          background: hsl(0, 0%, 10%);
          width: 100vw;
          height: 200px;
          color: #e9e9e9;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          font-weight: 300;
        }
      `}</style>
    </div>
  );
}

Home.getLayout = (page) => {
  return <>{page}</>;
};
