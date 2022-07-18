const ThreeDotsLoading = () => {
  return (
    <>
      <div className='loading'>
        <div className='align'>
          <div className='box'></div>
          <div className='box'></div>
          <div className='box'></div>
        </div>
      </div>

      <style jsx>{`
        .loading {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 20px;
        }
        .align {
          display: flex;
          gap: 10px;
        }
        .box {
          opacity: 0;
          width: 10px;
          height: 10px;
          background-color: #000;
          border-radius: 50%;
          animation: loading 1s infinite;
        }
        .align .box:nth-child(2) {
          animation-delay: 0.2s;
        }
        .align .box:nth-child(3) {
          animation-delay: 0.3s;
        }

        @keyframes loading {
          0% {
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default ThreeDotsLoading;
