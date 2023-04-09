import React from "react";

type ModalSuccessProps = {
  open: boolean;
  onClose: () => void;
};

const ModalSuccess = ({ open, onClose }: ModalSuccessProps) => {
  return (
    <div>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto">
        <div
          className="relative top-80 mx-auto my-auto p-5 border w-96 shadow-lg
        rounded-md bg-white"
        >
          <div className="mt-3 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Successful!
            </h3>
            <div className="mt-2 px-7 py-3">
              <p className="text-sm text-gray-500">
                Account has been successfully registered!
              </p>
              <div className="mt-5">
                <button
                  className="bg-red-500 text-white rounded-xl px-8 py-2 text-base font-medium hover:bg-red-600
                  focus:outline-none focus:ring-2 focus:ring-red-300"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSuccess;
