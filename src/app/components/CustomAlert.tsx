'use client';

import { useEffect } from 'react';

interface CustomAlertProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

export default function CustomAlert({ isOpen, title, message, onClose }: CustomAlertProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="customAlertOverlay" onClick={onClose}>
      <div className="customAlertModal" onClick={(e) => e.stopPropagation()}>
        <div className="customAlertHeader">
          <h3 className="customAlertTitle">{title}</h3>
        </div>
        
        <div className="customAlertContent">
          <p className="customAlertMessage">{message}</p>
        </div>
        
        <div className="customAlertFooter">
          <button 
            className="customAlertButton" 
            onClick={onClose}
            autoFocus
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}