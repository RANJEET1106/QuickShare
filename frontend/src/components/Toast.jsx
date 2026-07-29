function Toast({ toast, onClose }) {
  if (!toast) return null;

  const { type, message } = toast;

  return (
    <div
      className="position-fixed bottom-0 end-0 p-3"
      style={{ zIndex: 1055 }}
    >
      <div
        className={`toast show align-items-center text-bg-${
          type === "error" ? "danger" : "success"
        } border-0`}
      >
        <div className="d-flex">
          <div className="toast-body">{message}</div>
          <button
            className="btn-close btn-close-white me-2 m-auto"
            onClick={onClose}
          ></button>
        </div>
      </div>
    </div>
  );
}

export default Toast;
