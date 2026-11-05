'use client';

import { useEffect } from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDestructive = true,
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isLoading) onCancel();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isLoading, onCancel]);

  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open" open>
      <button
        type="button"
        className="modal-backdrop"
        aria-label="Close dialog"
        disabled={isLoading}
        onClick={onCancel}
      />
      <div className="modal-box" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <h3 id="modal-title" className="text-lg font-bold">
          {title}
        </h3>
        <p className="py-4">{message}</p>
        <div className="modal-action">
          <button type="button" className="btn btn-outline" disabled={isLoading} onClick={onCancel}>
            {cancelText}
          </button>
          <button
            type="button"
            className={isDestructive ? 'btn btn-error' : 'btn btn-primary'}
            disabled={isLoading}
            onClick={onConfirm}
          >
            {isLoading ? <span className="loading loading-spinner loading-sm" /> : null}
            {isLoading ? 'Deleting...' : confirmText}
          </button>
        </div>
      </div>
    </dialog>
  );
}
