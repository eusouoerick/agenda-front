const CardService = ({ item }) => {
  return (
    <>
      <div className='service-card'>
        <span className='name'>{item.name}</span>
        <span className='price'>R$ {item.price.toString().replace(".", ",")}</span>
        <span className='desc'>{item.description}</span>
      </div>

      <style jsx>{`
        .service-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 240px;
          max-width: 240px;
          height: 300px;
          background: #fff;
          /* border: var(--gray-border); */
          border: solid 1px #ccc;
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
      `}</style>
    </>
  );
};

export default CardService;
