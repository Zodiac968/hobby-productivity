function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <>
      <div
        className="fixed inset-0 bg-gray-700/50 z-40"
        onClick={onClose}
      ></div>
      <div className="fixed z-50 bg-white" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </>
  );
}
export default Modal;
