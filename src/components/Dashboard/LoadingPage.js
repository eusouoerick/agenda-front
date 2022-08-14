import ThreeDotsLoading from "../ThreeDotsLoading";

const LoadingPage = () => {
  return (
    <>
      <div>
        <h2>Carregando dados do usuário</h2>
        <ThreeDotsLoading />
      </div>

      <style jsx>{`
        div {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        @media (max-width: 750px) {
          h2 {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default LoadingPage;
