const Modal = ({ is_open, on_close, children }) => {
  return (
    <div className={`modal-overlay ${is_open ? "open" : ""}`} onClick={on_close}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export default Modal;