import ThreeDotsLoading from "../ThreeDotsLoading";

const LoadingRouter = () => {
  return (
    <>
      <div className='loading'>
        <ThreeDotsLoading />
      </div>

      <style jsx>{`
        .loading {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </>
  );
};

export default LoadingRouter;
