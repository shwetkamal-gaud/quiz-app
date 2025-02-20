import { X } from "lucide-react";
import React from "react";
import ReactDOM from "react-dom";



type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    header: string;
    handleSubmit: () => void;
    timeLeft: number
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, header, handleSubmit, timeLeft }) => {



    if (!isOpen) return null;
    return ReactDOM.createPortal(
        <div className="fixed  inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.6)]">
            <div className="w-200 bg-white rounded-lg shadow-lg ">
                <div className="border-b p-4 flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-800">{header}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                        <X />
                    </button>
                </div>
                <div className="p-4">
                    {timeLeft > 0 ?`Do you want to submit and finish quiz`:'Oops... Timout Submit and Finish the Quiz'}
                    <div className="flex justify-end gap-4 mb-2 me-2">
                        {timeLeft > 0 && <button
                            className="py-2 px-4 rounded-lg bg-gray-200"
                            onClick={onClose}
                        >
                            Cancel
                        </button>}
                        <button
                            className="py-2 px-4 rounded-lg bg-purple-500 text-white"
                            onClick={handleSubmit}
                        >
                            Submit & Finish
                        </button>
                    </div>

                </div>
            </div>
        </div>,
    document.body
    );
};

export default Modal;
