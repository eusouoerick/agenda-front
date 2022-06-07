import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWindowBlur } from "../../store/settingsSlice";
import style from "./windowBlur.module.css";

const WindowBlur = ({ children, setChildrenState }) => {
  // setChildrenState tem que uma função que altera o estado
  // de um Boolean
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
        setChildrenState(() => false);
      }}
    >
      <div>{children}</div>
    </div>
  );
};

export default WindowBlur;
