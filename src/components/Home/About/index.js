const About = () => {
  return (
    <>
      <section id='about-us'>
        <h2 style={{ margin: "0px 0 40px" }}>About Us</h2>
        <div className='container'>
          <div className='map-area'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m21!1m12!1m3!1d1545.1913787488195!2d-43.68749140300183!3d-22.90949165830977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m6!3e0!4m3!3m2!1d-22.9097389!2d-43.6870403!4m0!5e0!3m2!1spt-BR!2sbr!4v1659820696271!5m2!1spt-BR!2sbr'
              width='100%'
              height='100%'
              style={{ border: 0 }}
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
            ></iframe>
          </div>
          <div>
            <div className='text-area'>
              <h3>Mais sobre nós</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad est eveniet
                sed sint dolorum architecto eaque distinctio, modi autem magnam,
                accusantium amet! Nam exercitationem magnam explicabo distinctio. Natus
                atque exercitationem provident molestias laboriosam, fugiat, ex minima
                voluptate ea id accusantium.
              </p>
            </div>
            <div className='text-area'>
              <h3>Formas de contatos</h3>
              <ul>
                <li>Tel: 202020202</li>
                <li>Email: email@email.com</li>
                <li>Endereço: Av. Brasil, 0000 - Santa Cruz, Rio de Janeiro</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        section {
          width: 1000px;
          text-align: center;
        }
        .container {
          display: flex;
          text-align: start;
          gap: 40px;
        }
        .map-area {
          width: 500px;
          min-width: 500px;
          height: 350px;
          min-height: 350px;
        }
        .text-area {
          display: flex;
          flex-direction: column;
          margin-bottom: 10px;
        }
        .text-area h3 {
          margin: 0;
        }
        .text-area ul {
          list-style: none;
          padding: 0;
        }
        .text-area li {
          margin: 5px 0 0;
        }

        @media (max-width: 1100px) {
          section {
            width: 100%;
          }
          .container {
            flex-direction: column-reverse;
          }
          .text-area {
            padding: 0 50px;
          }
          .map-area {
            padding: 0 50px;
            width: 100%;
          }
        }
        @media (max-width: 600px) {
          .map-area {
            padding: 0;
          }
        }
        @media (max-width: 510px) {
          .text-area {
            padding: 0 25px;
          }
          .map-area {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default About;
