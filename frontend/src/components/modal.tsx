import type{ ModalProps } from "../types/modal.types";

const Modal = ({children,handleClose,isHidden}:ModalProps) => {

    return (
    <div className={`fixed w-full h-full z-10 bg-neutral-500/30 top-0 left-0 justify-center items-center ${isHidden?'hidden':"flex"}` } id="modal-container" onClick={handleClose}>
      <div  onClick={(e) => e.stopPropagation()} className="border relative w-1/2 bg-neutral-800 py-2 px-4 rounded-lg" id="content">
        <header className="flex justify-end">
          <button onClick={handleClose} id="close-button" className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={35}
              height={35}
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
              ></path>
            </svg>
          </button>
        </header>
        {children}
      </div>
    </div>
  );
};

export default Modal;
