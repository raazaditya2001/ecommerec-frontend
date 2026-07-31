import toast from "react-hot-toast";

const notify = {
  success: (message) => toast.success(message),

  error: (message) => toast.error(message),

  warning: (message) =>
    toast(message, {
      icon: "⚠️",
      style: {
        background: "#f59e0b",
        color: "#fff",
      },
    }),

  loading: (message) => toast.loading(message),

  dismiss: (id) => toast.dismiss(id),

  promise: (promise, messages) =>
    toast.promise(promise, {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
    }),

  custom: (message) =>
    toast(message, {
      icon: "🔥",
    }),
};

export default notify;
