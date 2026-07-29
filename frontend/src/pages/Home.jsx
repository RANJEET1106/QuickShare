import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadModal from "../components/UploadModal";

function Home() {
  const navigate = useNavigate();

  const [showUpload, setShowUpload] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");

  const handleViewPin = () => {
    if (!/^\d{6}$/.test(pinInput)) {
      setPinError("Pin must be a 6 digit number");
      return;
    }
    navigate(`/${pinInput}`);
  };

  return (
    <div className="container py-5">
      <div className="bento-grid fade-in">
        <div className="bento-col-12 text-center mb-4">
          <h1 className="fw-bold display-4 mb-3" style={{ background: "linear-gradient(45deg, var(--primary), #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Quick Share
          </h1>
          <p className="lead text-muted" style={{ maxWidth: "600px", margin: "0 auto" }}>
            Seamlessly share files and notes with a pin.
            No sign-up, no hassle.
          </p>
        </div>
        <div className="bento-col-6">
          <div className="glass-panel p-5 h-100 d-flex flex-column justify-content-center align-items-center text-center interactive"
            onClick={() => setShowUpload(true)}>
            <div className="mb-4 p-3 rounded-circle" style={{ background: "var(--primary-soft)" }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <h2 className="fw-semibold">Upload</h2>
            <p className="text-muted">Create a new access pin</p>
            <button className="btn btn-primary mt-3 px-5">Start Upload</button>
          </div>
        </div>
        <div className="bento-col-6">
          <div className="glass-panel p-5 h-100 d-flex flex-column justify-content-center">
            <h3 className="fw-semibold mb-3">View using access pin</h3>
            <p className="text-muted mb-4">Enter your pin code</p>

            <div className="w-100" style={{ maxWidth: "300px", margin: "0 auto" }}>
              <input
                className="form-control glass text-center fw-bold fs-4 mb-3"
                style={{ letterSpacing: "0.2em", height: "60px" }}
                placeholder="000 000"
                value={pinInput}
                maxLength={6}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  setPinInput(val);
                  setPinError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleViewPin()}
              />

              {pinError && (
                <div className="text-danger small mb-3 text-center">{pinError}</div>
              )}

              <button
                className="btn w-100"
                style={{ backgroundColor: "var(--surface-muted)", color: "var(--text)" }}
                onClick={handleViewPin}
              >
                Access Content &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>

      {
        showUpload && (
          <UploadModal
            onClose={() => setShowUpload(false)}
            onSuccess={(pin) => navigate(`/${pin}`)}
          />
        )
      }
    </div >
  );
}

export default Home;
