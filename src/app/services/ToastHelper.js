import { toast } from "react-toastify";

export const ERROR_MESSAGE = "Something wen't wrong, Please try again later!";

export const notifySuccess = (message) => {
  toast.success(message);
};

export const notifyError = (message) => {
  toast.error(message);
};

export const createToast = () => {
  return toast.loading("Processing...");
};

export const clearToast = () => {
  return toast.dismiss();
};

export const toastSuccess = (id, res) => {
  toast.update(id, {
    render: res.message || res.success,
    type: "success",
    isLoading: false,
    autoClose: 3000,
  });
};

export const toastError = (id, error) => {
  if (error.json) {
    error.json().then((errorMessage) => {
      toast.update(id, {
        render: errorMessage?.message ?? ERROR_MESSAGE,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    });
  } else {
    // Error log
    toast.update(id, {
      render: ERROR_MESSAGE,
      type: "error",
      isLoading: false,
      autoClose: 3000,
    });
  }
};
