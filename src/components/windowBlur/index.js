import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWindowBlur } from "../../store/settingsSlice";
import style from "./windowBlur.module.css";

const WindowBlur = ({ children, setChildrenState }) => {
  // setChildrenState - Quando o windowBlur fechar ele vai chamar essa função
  // para setar o estado do componente que está dentro do windowBlur para que ele seja fechado
  const dispatch = useDispatch();

  // • Não tá respondendo quando o windowBlur é "false"
  // const { windowBlur } = useSelector((state) => state.settings);
  // useEffect(() => {
  //   if (windowBlur) {
  //     document.body.style.overflowY = "hidden";
  //   } else {
  //     document.body.style.overflowY = "auto";
  //   }
  // }, [windowBlur]);

  return (
    <div
      className={style.windowBlur}
      onClick={() => {
        dispatch(setWindowBlur());
        if (setChildrenState) {
          setChildrenState(() => false);
        }
      }}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};

export default WindowBlur;
