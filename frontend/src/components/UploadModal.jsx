import { useState } from "react";
import { newFileUpload, newTextUpload, uploadFileToPin, uploadTextToPin } from "../api/client";
import TextEditor from "./TextEditor";
import FileDropZone from "./FileDropZone";
import useToast from "../utils/useToast";
import Toast from "./Toast";

function UploadModal({ onClose, onSuccess, existingPin }) {
  const [mode, setMode] = useState("FILE"); // FILE | TEXT
  const [files, setFiles] = useState([]);
  const [text, setText] = useState("");

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");

  const { toast, showToast, clearToast } = useToast();

  const handleFileSubmit = async () => {
    if (files.length === 0) {
      showToast("error", "Please select at least one file");
      return;
    }

    setLoading(true);
    try {
      let pin = existingPin;
      let startIndex = 0;
      if (!pin) {
        setProgress(`Uploading 1/${files.length}...`);
        const firstFile = files[0];
        pin = await newFileUpload(firstFile);
        startIndex = 1;
      }
      if (files.length > startIndex) {
        for (let i = startIndex; i < files.length; i++) {
          setProgress(`Uploading ${i + 1}/${files.length}...`);
          await uploadFileToPin(files[i], pin);
        }
      }

      onSuccess(pin);
    } catch (e) {
      console.error(e);
      showToast("error", e.message || "Upload failed");
      setLoading(false);
    }
  };

  const handleTextSubmit = async () => {
    if (!text.trim()) {
      showToast("error", "Please enter some text");
      return;
    }

    setLoading(true);
    try {
      let pin;
      if (existingPin) {
        await uploadTextToPin(text, existingPin);
        pin = existingPin;
      } else {
        pin = await newTextUpload(text);
      }
      onSuccess(pin);
    } catch (e) {
      showToast("error", e.message || "Upload failed");
      setLoading(false);
    }
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ zIndex: 1050, backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(5px)" }}
    >
      <div
        className="glass p-4 slide-up"
        style={{ width: "90%", maxWidth: "800px", maxHeight: "90vh", display: "flex", flexDirection: "column" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="m-0 fw-bold">New Share</h4>
          <button
            className="btn btn-link text-decoration-none"
            style={{ color: "var(--text-muted)", fontSize: "1.5rem" }}
            onClick={!loading ? onClose : undefined}
          >
            &times;
          </button>
        </div>

        <div className="d-flex gap-2 mb-4">
          <button
            className={`btn flex-grow-1 ${mode === "FILE" ? "btn-primary" : "glass-panel"}`}
            onClick={() => !loading && setMode("FILE")}
            disabled={loading}
          >
            File Upload
          </button>
          <button
            className={`btn flex-grow-1 ${mode === "TEXT" ? "btn-primary" : "glass-panel"}`}
            onClick={() => !loading && setMode("TEXT")}
            disabled={loading}
          >
            Text Note
          </button>
        </div>

        <div className="flex-grow-1 overflow-auto mb-4" style={{ minHeight: "300px" }}>
          {mode === "FILE" ? (
            <div className="d-flex flex-column gap-3">
              <FileDropZone onFilesSelected={(newFiles) => setFiles(prev => [...prev, ...newFiles])} />

              {files.length > 0 && (
                <div className="glass-panel p-3">
                  <h6 className="mb-2">Selected Files ({files.length})</h6>
                  <ul className="list-unstyled m-0">
                    {files.map((f, i) => (
                      <li key={i} className="d-flex justify-content-between align-items-center py-2 border-bottom" style={{ borderColor: 'var(--border)' }}>
                        <span className="text-truncate" style={{ maxWidth: "80%" }}>{f.name}</span>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => setFiles(files.filter((_, idx) => idx !== i))}
                          disabled={loading}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <TextEditor value={text} onChange={setText} />
          )}
        </div>

        <div className="d-flex justify-content-end gap-2">
          <button
            className="btn btn-secondary"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary px-4"
            onClick={mode === "FILE" ? handleFileSubmit : handleTextSubmit}
            disabled={loading}
          >
            {loading ? (progress || "Uploading...") : "Create Share"}
          </button>
        </div>
      </div>

      <Toast toast={toast} onClose={clearToast} />
    </div>
  );
}

export default UploadModal;
