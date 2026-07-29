import { useState, useEffect } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

function TextEditor({ value, onChange }) {
  const [tab, setTab] = useState("WRITE");

  const getPreview = () => {
    if (!value) return "<p class='text-muted'>Nothing to preview</p>";
    return DOMPurify.sanitize(marked.parse(value));
  };

  return (
    <div className="d-flex flex-column h-100">
      <div className="d-flex gap-2 mb-3">
        <button
          className={`btn ${tab === "WRITE" ? "btn-primary" : "btn-outline-secondary"}`}
          onClick={() => setTab("WRITE")}
        >
          Write
        </button>
        <button
          className={`btn ${tab === "PREVIEW" ? "btn-primary" : "btn-outline-secondary"}`}
          onClick={() => setTab("PREVIEW")}
        >
          Preview
        </button>
      </div>

      {tab === "WRITE" ? (
        <textarea
          className="form-control glass-panel flex-grow-1 p-3"
          style={{
            minHeight: "300px",
            backgroundColor: "var(--surface)",
            color: "var(--text)",
            border: "1px solid var(--border)",
            resize: "none"
          }}
          placeholder="Start typing... You can use **Markdown**"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <div
          className="glass-panel p-3 flex-grow-1 overflow-auto"
          style={{ minHeight: "300px", maxHeight: "500px" }}
          dangerouslySetInnerHTML={{ __html: getPreview() }}
        />
      )}
    </div>
  );
}

export default TextEditor;
