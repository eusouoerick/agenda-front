const Services = () => {
  return (
    <>
      <section className='services'>
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
            <a id='calendar' href='#calendar' className='btn-home sv-btn'>
              Ver agenda
            </a>
          </div>
        </div>
      </section>

      <style jsx>{`
        .services {
          background: #e9e9e9;
          opacity: 0;
          width: 100vw;
          max-height: 380px;
          padding: 2rem 0;
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
          color: var(--color-primary);
        }
        .sv-list .btn-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .sv-list .sv-btn {
          text-decoration: none;
          color: #fff;
          background: var(--color-primary);
          border: solid 1px var(--color-primary);
          transition: border, background 0.15s ease-in-out;
        }
        .sv-list .btn-container .sv-btn:hover {
          background: var(--color-primary-dark);
          border-color: var(--color-primary-dark);
        }
        .sv-list .btn-container a:hover {
          background: var(--color-primary);
          color: #fff;
        }
      `}</style>
    </>
  );
};

export default Services;
