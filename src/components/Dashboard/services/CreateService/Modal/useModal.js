import { useMutation } from "@apollo/client";
import { CREATE_SERVICE, GET_SERVICES } from "../../../../../graphql/schemas/services";
import { toast } from "react-toastify";

const useModal = ({ form, closeModal }) => {
  const [createService, { loading }] = useMutation(
    CREATE_SERVICE("_id", "name", "description", "price", "duration")
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.description.length <= 165 && form.name.length <= 35) {
      if (form.price.length > 0 && +form.price.replace(",", ".")) {
        if (form.duration.length > 0 && +form.duration) {
          createService({
            variables: {
              data: {
                name: form.name,
                description: form.description,
                price: +form.price.replace(",", "."),
                duration: +form.duration,
              },
            },
            update: (cache, { data: { createService } }) => {
              const { services } = cache.readQuery({ query: GET_SERVICES("_id") });
              cache.writeQuery({
                query: GET_SERVICES("_id"),
                data: { services: [...services, createService] },
              });
            },
            onCompleted: () => {
              closeModal();
              toast("Serviço criado com sucesso!", {
                type: "success",
                position: "top-right",
                autoClose: 2000,
                theme: "dark",
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
              });
            },
          });
        }
      }
    }
  };

  return { handleSubmit, loading };
};

export default useModal;
