import { useState, useRef } from "react";

function FileDropZone({ onFilesSelected }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files);
      onFilesSelected(files);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      onFilesSelected(files);
    }
  };

  return (
    <div
      className={`glass-panel p-5 text-center interactive ${isDragOver ? "border-primary" : ""
        }`}
      style={{
        borderStyle: "dashed",
        borderWidth: "2px",
        height: "300px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        type="file"
        multiple
        ref={inputRef}
        className="d-none"
        onChange={handleChange}
      />

      <div className="mb-3">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      </div>

      <h5 className="fw-semibold mb-2">Drop files here or click to upload</h5>
      <p className="text-muted small">
        Support for multiple files. Max 50MB per file.
      </p>
    </div>
  );
}

export default FileDropZone;
