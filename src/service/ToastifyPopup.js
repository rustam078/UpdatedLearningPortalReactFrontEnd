import { toast } from "react-toastify";

export const hasError = (err) => {
    if (err && (err.response.status === 500 || err.response.status === 403 || err.response.status === 401))
        return true;
    return false;
}

export const loadPopup = (msg) => {
    return toast.error(msg, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}

export const loadSuccessPopup = (msg) => {
    return toast.success(msg, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}