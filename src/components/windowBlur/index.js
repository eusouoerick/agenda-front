import style from "./windowBlur.module.css";

const WindowBlur = ({ children, setChildrenState }) => {
  // setChildrenState - Quando o windowBlur fechar ele vai chamar essa função
  // para fechar o componente children

  return (
    <div
      className={style.windowBlur}
      onClick={() => {
        if (setChildrenState) {
          setChildrenState();
        }
      }}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};

export default WindowBlur;
