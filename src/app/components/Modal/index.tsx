import React, { ReactNode } from "react";
import "./customModalStyles.css";

interface CustomModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onRequestClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="customOverlay">
      <div className="customModal">
        {children}
        
      </div>
    </div>
  );
};

export default CustomModal;
