import { marked } from "marked";
import DOMPurify from "dompurify";

marked.setOptions({
  breaks: true,
  gfm: true
});

export function renderMarkdown(markdown) {
  const html = marked.parse(markdown || "");
  return DOMPurify.sanitize(html);
}

export function markdownToPlainText(markdown) {
  const html = marked.parse(markdown || "");
  const temp = document.createElement("div");
  temp.innerHTML = DOMPurify.sanitize(html);
  return temp.textContent || temp.innerText || "";
}
