import React from "react";

const ConfirmationModal = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-xl font-semibold text-center mb-4">{message}</h3>
        <div className="flex justify-around">
          <button
            onClick={onConfirm}
            className="w-1/3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="w-1/3 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
