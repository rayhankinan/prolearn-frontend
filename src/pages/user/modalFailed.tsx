
import React from "react";

type ModalFailedProps = {
  open: boolean;
  onClose: () => void;
  error: String;
};

const ModalFailed = ({open, onClose, error}: ModalFailedProps) => {
  return (
    <div>
      <div
        className="fixed inset-0 bg-red-200 bg-opacity-25 overflow-y-auto"
      >
        <div className="relative top-80 mx-auto p-5 border w-96 shadow-lg
        rounded-xl bg-white shadow-xl border-2 border-red-500">
          <div className="mt-3 text-center">
            <div className="mx-auto flex items-center justify-center h-16
            w-16 border-2 border-red-500 rounded-full bg-red-100">
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-6 w-6 text-red-600">
              <path fill="none" stroke="currentColor" stroke-width="2" d="M18 6L6 18">
              </path>
              <path fill="none" stroke="currentColor" stroke-width="2" d="M6 6L18 18">
              </path>
            </svg>
            </div>
            <h3 className="text-xl leading-6 font-bold text-gray-900 mt-5">
              Registration Failed!
            </h3>
            <div className="mt-2 px-7 py-3">
              <p className="text-sm text-gray-500">
                {error}
              </p>
            </div>
            <div className="mt-5">
              <button
                className="bg-red-500 text-white rounded-xl px-8 py-2 text-base font-medium
                hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                onClick={onClose}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalFailed;