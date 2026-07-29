import { useState } from "react";
import { deleteItem, updateText } from "../api/client";
import { marked } from "marked";
import DOMPurify from "dompurify";
import TextEditor from "./TextEditor";

function TextItem({ item, onRefresh }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(item.textContent);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (confirm("Delete this note?")) {
      await deleteItem(item.id);
      onRefresh();
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await updateText(item.id, editContent);
      setIsEditing(false);
      onRefresh();
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    const html = DOMPurify.sanitize(marked.parse(item.textContent));
    const temp = document.createElement("div");
    temp.innerHTML = html;
    const plain = temp.innerText || temp.textContent;

    navigator.clipboard.writeText(plain);
  };

  if (isEditing) {
    return (
      <div className="glass-panel p-3">
        <TextEditor value={editContent} onChange={setEditContent} />
        <div className="d-flex justify-content-end gap-2 mt-2">
          <button className="btn btn-sm btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
          <button className="btn btn-sm btn-primary" onClick={handleUpdate} disabled={loading}>Save</button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel p-3">
      <div
        className="mb-3 markdown-body"
        style={{ color: "var(--text)" }}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(item.textContent)) }}
      />

      <div className="d-flex justify-content-end gap-2 border-top pt-2" style={{ borderColor: "var(--border)" }}>
        <button className="btn btn-sm btn-outline-secondary" onClick={handleCopy} title="Copy Text">
          Copy
        </button>
        <button className="btn btn-sm btn-outline-primary" onClick={() => setIsEditing(true)} title="Edit">
          Edit
        </button>
        <button className="btn btn-sm btn-outline-danger" onClick={handleDelete} title="Delete">
          Delete
        </button>
      </div>
    </div>
  );
}

function TextList({ texts, onRefresh }) {
  if (!texts || texts.length === 0) return (
    <div className="text-center p-4 text-muted border rounded-3" style={{ borderStyle: 'dashed' }}>
      No notes shared yet
    </div>
  );

  return (
    <div className="d-flex flex-column gap-3">
      {texts.map(t => <TextItem key={t.id} item={t} onRefresh={onRefresh} />)}
    </div>
  );
}

export default TextList;
