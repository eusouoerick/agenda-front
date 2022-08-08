import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getUser } from "../../store/userSlice";
import { useMutation, useLazyQuery } from "@apollo/client";
import { CREATE_USER, LOGIN } from "../../graphql/schemas/users";

const useHook = ({ layout, form }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [createUserGql] = useMutation(CREATE_USER, null, { fetchPolicy: "no-cache" });
  const [loginGql] = useLazyQuery(LOGIN, null, { fetchPolicy: "no-cache" });

  useEffect(() => {
    setError(null);
  }, [layout]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(() => true);
    try {
      let token = "";
      if (layout) {
        const { data, error } = await loginGql({
          variables: {
            data: { ...form, name: undefined },
          },
          onError: (e) => {
            setError(e.message);
            setLoading(() => false);
          },
        });
        if (error) throw new Error(error);
        token = data.login;
      } else {
        const { data, error } = await createUserGql({
          variables: { data: form },
          onError: (e) => {
            setError(e.message);
            setLoading(() => false);
          },
        });
        if (error) throw new Error(error);
        token = data.createUser;
      }
      localStorage.setItem("token", token);
      await dispatch(getUser());
      router.push("/dashboard");
    } catch (error) {
      console.error(error.message);
      setLoading(() => false);
    }
  };

  useEffect(() => {
    return () => {
      setLoading(() => false);
    };
  }, []);

  return { handleSubmit, loading, error };
};

export default useHook;
