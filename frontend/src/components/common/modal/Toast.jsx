import React from "react"

const Toast = ({ toast }) => {
  if (!toast) return null

  return (
    <div className="toast-container">
      <div className={`toast-alert ${toast.type}`}>
        <span className="toast-icon">
          {toast.type === "success" && <i className="fa-solid fa-circle-check"></i>}
          {toast.type === "info" && <i className="fa-solid fa-circle-info"></i>}
          {toast.type === "error" && <i className="fa-solid fa-circle-exclamation"></i>}
        </span>
        <span className="toast-msg">{toast.message}</span>
      </div>
    </div>
  )
}

export default Toast