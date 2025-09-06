function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <>
      <div
        className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50 bg-gray-700/50 z-40"
        onClick={onClose}
      >
        <div
          className="bg-white m-2 p-2 border-gray-100 rounded-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </>
  );
}
export default Modal;
