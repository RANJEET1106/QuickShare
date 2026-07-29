function EmptyState({ title, subtitle }) {
  return (
    <div className="text-center py-4 text-muted">
      <div className="fw-semibold mb-1">{title}</div>
      <div className="small">{subtitle}</div>
    </div>
  );
}

export default EmptyState;
