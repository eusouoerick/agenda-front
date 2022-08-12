import { useDispatch } from "react-redux";
import { setUser } from "../../../../store/userSlice";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../../graphql/schemas/users";
import { toast } from "react-toastify";

const useHook = ({ inputs, setModal }) => {
  const dispatch = useDispatch();
  const [updateUser, { loading }] = useMutation(
    UPDATE_USER("name", "email", "phone", "contact"),
    { fetchPolicy: "no-cache" }
  );

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const phoneRegex = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}(\-|\s)?[0-9]{4}$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {};
    Object.keys(inputs).forEach((key) => {
      if (inputs[key].replace(" ", "")) {
        data[key] = inputs[key];
      }
    });

    if (!data["email"] || emailRegex.test(data["email"])) {
      if (!data["phone"] || phoneRegex.test(data["phone"])) {
        updateUser({
          variables: { data },
        }).then(({ data }) => {
          const { contact, name } = data.updateUser;
          dispatch(setUser({ contact, name }));
          setModal();
          toast("Usuário atualizado com sucesso!", {
            type: "success",
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }).catch(({ message }) => {
          toast(message, {
            type: "error",
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        })
      }
    }
  };

  return { handleSubmit, loading };
};

export default useHook;
