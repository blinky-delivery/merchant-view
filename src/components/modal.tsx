import { CircleX } from "lucide-react";
import React, { ReactNode } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg shadow-lg w-[1000px] mx-auto p-4 relative"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
                {title && (
                    <div className="flex justify-between justify-items-center">
                        <h2 className="text-lg font-semibold  mb-4">{title}</h2>
                        <button
                            className=" text-gray-500 hover:text-gray-800"
                            onClick={onClose}
                        >
                            <CircleX />
                        </button>
                    </div>
                )}

                {children}


            </div>
        </div>
    );
};

export default Modal;