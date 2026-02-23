import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ is_open, on_close, children }) => {
  const [mounted, setMounted] = useState(false);

  // Wait for dom node to exist before trying to render the portal
  useEffect(() => {
    if (document.getElementById('modal-root')) {
      setMounted(true);
    }
  }, []);

  if (!mounted) {
    return null;
  }

  const modal_body = (
    <div className={`modal-overlay ${is_open ? "open" : ""}`} onClick={on_close}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );

  return createPortal(modal_body, document.getElementById('modal-root'));
}

export default Modal;