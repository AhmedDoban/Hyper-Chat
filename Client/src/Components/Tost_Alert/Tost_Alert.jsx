import { toast } from "react-toastify";

const Tost_Alert = (msg, type) => {
  const setting = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  type === "error"
    ? toast.error(msg, {
        setting,
        theme: "colored",
      })
    : toast.success(msg, {
        setting,
        theme: "colored",
      });
};
export default Tost_Alert;
