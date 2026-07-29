function PinHeader({ pin }) {
  const copyPin = () => {
    navigator.clipboard.writeText(pin);
  };

  return (
    <div className="glass p-3 mb-4 d-flex justify-content-between align-items-center fade-in">
      <h5 className="mb-0 fw-semibold">Pin: {pin}</h5>
      <button
        className="btn btn-outline-primary btn-sm"
        onClick={copyPin}
      >
        Copy Pin
      </button>
    </div>
  );
}

export default PinHeader;
