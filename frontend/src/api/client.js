const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function request(url, options = {}, retry = true) {
  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      const text = await res.text();
      const error = new Error(text || `Request failed: ${res.status}`);
      error.status = res.status;
      throw error;
    }

    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return res.json();
    }
    return res.text();
  } catch (err) {
    if (retry) {
      // Simple retry logic: wait 500ms then try once more
      await new Promise(r => setTimeout(r, 500));
      return request(url, options, false);
    }
    throw err;
  }
}

export function fetchByPin(pin) {
  return request(`${BASE_URL}/${pin}`);
}

export function newFileUpload(file) {
  const formData = new FormData();
  formData.append("type", "FILE");
  formData.append("file", file);

  return request(`${BASE_URL}/upload`, {
    method: "POST",
    body: formData
  });
}

export function newTextUpload(textContent) {
  // Exact JSON payload as requested
  const formData = new FormData();
  formData.append("type", "TEXT");
  formData.append("textContent", textContent);

  return request(`${BASE_URL}/upload`, {
    method: "POST",
    body: formData
  });
}

export function uploadFileToPin(file, sharePin) {
  const formData = new FormData();
  formData.append("type", "FILE");
  formData.append("sharePin", sharePin);
  formData.append("file", file);

  return request(`${BASE_URL}/upload`, {
    method: "POST",
    body: formData
  });
}

export function uploadTextToPin(textContent, sharePin) {
  // Exact JSON payload as requested
  const formData = new FormData();
  formData.append("type", "TEXT");
  formData.append("sharePin", sharePin);
  formData.append("textContent", textContent);

  return request(`${BASE_URL}/upload`, {
    method: "POST",
    body: formData
  });
}

export function updateText(uuid, textContent) {
  // PATCH body: { textContent: "..." }
  return request(`${BASE_URL}/${uuid}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ textContent })
  });
}

export function deleteItem(uuid) {
  return request(`${BASE_URL}/${uuid}`, {
    method: "DELETE"
  });
}
