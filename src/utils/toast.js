// filename: frontend/src/utils/toast.js
import toast from "react-hot-toast";

// Thin wrapper around react-hot-toast so the whole app uses consistent
// styling and copy conventions (e.g. past-tense confirmations).
const baseStyle = {
  borderRadius: "10px",
  background: "var(--color-paper-raised)",
  color: "var(--color-ink)",
  border: "1px solid var(--color-border)",
  fontSize: "0.9rem",
};

export const notifySuccess = (message) => toast.success(message, { style: baseStyle });
export const notifyError = (message) => toast.error(message, { style: baseStyle });
export const notifyInfo = (message) => toast(message, { style: baseStyle, icon: "ℹ️" });
