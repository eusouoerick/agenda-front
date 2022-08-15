import Image from "next//image";
import { useRouter } from "next/dist/client/router";

const NotFound = () => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <>
      <div className='container'>
        <div className='txt-area'>
          <span className='error'>404</span>
          <p>
            The page you are looking for doesn’t exist or an other error occurred, go
            back to home page.
          </p>
          <button className='btn' onClick={handleClick}>
            Go Back
          </button>
        </div>
        <div className='img'>
          <Image width={300} height={300} src='/images/404.png' alt='error' />
        </div>
      </div>

      <style jsx>{`
        .container {
          margin: auto;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 40px;
        }

        .txt-area {
          width: 400px;
        }
        .error {
          font-size: 50px;
          font-weight: bold;
        }
        .btn {
          background: #2278f7;
          height: 35px;
          width: 150px;
          border-radius: 6px;
          font-size: 16px;
          color: #fff;
        }

        @media (max-width: 768px) {
          .container {
            flex-direction: column-reverse;
          }
          .img {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .txt-area {
            padding: 0 10px;
            width: 100%;
          }
        }
      `}</style>
    </>
  );
};

NotFound.getLayout = (page) => <>{page}</>;

export default NotFound;
