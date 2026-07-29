import { useState } from "react";

export default function useToast() {
  const [toast, setToast] = useState(null);

  const showToast = (type, message, timeout = 3000) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), timeout);
  };

  return { toast, showToast, clearToast: () => setToast(null) };
}
