import { deleteItem } from "../api/client";

function FileList({ files, pin, onRefresh }) {
  const handleDelete = async (uuid) => {
    if (confirm("Are you sure you want to delete this file?")) {
      try {
        await deleteItem(uuid);
        onRefresh();
      } catch (e) {
        alert(e.message);
      }
    }
  };

  if (!files || files.length === 0) return (
    <div className="text-center p-4 text-muted border rounded-3" style={{ borderStyle: 'dashed' }}>
      No files shared yet
    </div>
  );

  return (
    <div className="d-flex flex-column gap-3">
      {files.map((file) => (
        <div key={file.id} className="glass-panel p-3 d-flex align-items-center gap-3 interactive">
          <div className="rounded p-2" style={{ background: "var(--surface-muted)" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
              <polyline points="13 2 13 9 20 9"></polyline>
            </svg>
          </div>

          <div className="flex-grow-1 overflow-hidden" style={{ minWidth: 0 }}>
            <a
              href={file.fileLink}
              target="_blank"
              rel="noreferrer"
              className="fw-medium text-truncate d-block text-decoration-none"
              style={{ color: "var(--text)" }}
            >
              {file.fileName}
            </a>
            <small className="text-muted">{file.mimeType}</small>
          </div>

          <a
            href={file.fileDownload}
            download={file.fileName}
            className="btn btn-sm btn-outline-primary me-2"
            title="Download File"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 3v12"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <path d="M5 21h14"></path>
            </svg>
          </a>

          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => handleDelete(file.id)}
            title="Delete File"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}

export default FileList;
