function FileTypeIcon({ fileName }) {
  const ext = fileName.split(".").pop().toLowerCase();

  let icon = "📄";

  if (["pdf"].includes(ext)) icon = "📕";
  else if (["png", "jpg", "jpeg", "gif", "webp"].includes(ext)) icon = "🖼️";
  else if (["zip", "rar", "7z"].includes(ext)) icon = "🗜️";
  else if (["doc", "docx"].includes(ext)) icon = "📝";
  else if (["xls", "xlsx", "csv"].includes(ext)) icon = "📊";
  else if (["ppt", "pptx"].includes(ext)) icon = "📽️";
  else if (["txt", "md"].includes(ext)) icon = "📃";

  return <span aria-hidden>{icon}</span>;
}

export default FileTypeIcon;
