import { gql } from "@apollo/client";
import { print } from "graphql";

import Header from "../components/Home/Header";
import FirstContent from "../components/Home/FirstContent";
import Services from "../components/Home/Services";
import About from "../components/Home/About";

export default function Home({ services }) {
  return (
    <div className='container'>
      <Header />
      <main>
        <FirstContent />
        <Services servicesList={services} />
        <About />
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

export const getStaticProps = async () => {
  const SCHEMA = gql`
    query {
      services {
        _id
        name
        description
        price
      }
    }
  `;
  const res = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: print(SCHEMA) }),
  });
  const { data } = await res.json();
  return {
    props: {
      services: data.services,
    },
    revalidate: 600,
  };
};

Home.getLayout = (page) => {
  return <>{page}</>;
};
