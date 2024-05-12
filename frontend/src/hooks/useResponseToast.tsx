import { toast } from "react-toastify";

type ToastType = "success" | "warning" | "error" | "info";

const useResponseToast = () => {
  const showToast = (status: number, messages: string[]) => {
    // Define los colores de los toasts basados en el código de estado HTTP
    let toastType: ToastType;
    switch (true) {
      case status >= 200 && status < 300:
        toastType = "success"; // Verde para éxito
        break;
      case status >= 400 && status < 500:
        toastType = "warning"; // Amarillo para advertencias
        break;
      case status >= 500:
        toastType = "error"; // Rojo para errores internos del servidor
        break;
      default:
        toastType = "info"; // Azul para otros tipos de información
    }

    // Crear un mensaje de lista si hay múltiples mensajes
    const content = (
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
    );

    // Mostrar el toast con el contenido y el tipo específico
    toast[toastType](content, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return showToast;
};
export default useResponseToast;
