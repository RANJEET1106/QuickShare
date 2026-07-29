import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePin } from "../hooks/usePin";
import FileList from "../components/FileList";
import TextList from "../components/TextList";
import UploadModal from "../components/UploadModal";

function PinPage() {
  const { pin } = useParams();
  const navigate = useNavigate();
  const { data, loading, error, refresh } = usePin(pin);

  const [showUpload, setShowUpload] = useState(false);

  if (loading && !data) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="container py-5 text-center">
        <h3 className="text-danger mb-3">Pin Not Found or Error</h3>
        <p className="text-muted">{error}</p>
        <button className="btn btn-outline-primary" onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>
    );
  }

  // const { files = [], texts = [] } = data || {};
  const {
    fileItemList: files = [],
    textItemList: texts = []
  } = data || {};
  
  // const {files}= useState[data.fileItemList];
  // const {texts}= useState[data.textItemList];

  return (
    <div className="container py-4 fade-in">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h6 className="text-uppercase text-muted fw-bold small mb-1">Access Pin</h6>
          <h1 className="fw-bold m-0" style={{ fontFamily: "monospace", letterSpacing: "2px" }}>
            {pin}
          </h1>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary" onClick={() => navigate("/")}>
            Back
          </button>
          <button className="btn btn-primary" onClick={() => setShowUpload(true)}>
            + Add Item
          </button>
        </div>
      </div>

      <div className="bento-grid">
        <div className="bento-col-6">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-semibold m-0">Files ({files.length})</h4>
          </div>
          <FileList files={files} pin={pin} onRefresh={refresh} />
        </div>
        <div className="bento-col-6">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-semibold m-0">Notes ({texts.length})</h4>
          </div>
          <TextList texts={texts} onRefresh={refresh} />
        </div>
      </div>

      {showUpload && (
        <UploadModal
          existingPin={pin}
          onClose={() => setShowUpload(false)}
          onSuccess={() => {
            setShowUpload(false);
            refresh();
          }}
        />
      )}
    </div>
  );
}

export default PinPage;
