const ServicesPage = () => {
  return (
    <>
      <div className='c'>
        <div className='service'>
          <div className='align'>
            <span className='name'>Spa Estética Corporal Especial</span>
            <span className='price'>R$ 356,00</span>
          </div>
          <span className='desc'>
            Este tipo vai ajudar a combater edemas e eliminar as toxinas e substâncias
            nocivas do seu organismo, durante um dia tranquilo de cuidados
          </span>
          <button>Agendar serviço</button>
        </div>
        <div className='service'>
          <div className='align'>
            <span className='name'>Spa Estética Corporal Especial</span>
            <span className='price'>R$ 356,00</span>
          </div>
          <span className='desc'>
            Este tipo vai ajudar a combater edemas e eliminar as toxinas e substâncias
            nocivas do seu organismo, durante um dia tranquilo de cuidados
          </span>
          <button>Agendar serviço</button>
        </div>
        <div className='service'>
          <div className='align'>
            <span className='name'>Spa Estética Corporal Especial</span>
            <span className='price'>R$ 356,00</span>
          </div>
          <span className='desc'>
            Este tipo vai ajudar a combater edemas e eliminar as toxinas e substâncias
            nocivas do seu organismo, durante um dia tranquilo de cuidados
          </span>
          <button>Agendar serviço</button>
        </div>
        <div className='service'>
          <div className='align'>
            <span className='name'>Spa Estética Corporal Especial</span>
            <span className='price'>R$ 356,00</span>
          </div>
          <span className='desc'>
            Este tipo vai ajudar a combater edemas e eliminar as toxinas e substâncias
            nocivas do seu organismo, durante um dia tranquilo de cuidados
          </span>
          <button>Agendar serviço</button>
        </div>
      </div>

      <style jsx>{`
        .c {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }
        .service {
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: space-between;
          width: 240px;
          height: 300px;
          padding: 20px;
          background: #fff;
          border: var(--gray-border);
          border-radius: 4px;
        }
        .service:hover {
          border-color: #bfbfbf;
        }
        .align {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .name {
          text-align: center;
          color: var(--color-primary);
          font-size: 20px;
          font-weight: bold;
        }
        .price {
          font-size: 18px;
          color: #303030;
        }
        .desc {
          text-align: center;
          font-size: 14px;
          color: #303030;
        }

        button {
          justify-self: flex-end;
          background: var(--color-primary);
          color: #fff;
          border: none;
          border-radius: 5px;
          padding: 8px 10px ;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.2s;
        }
        button:hover {
          background: var(--color-primary-dark);
        }
      `}</style>
    </>
  );
};

export default ServicesPage;
