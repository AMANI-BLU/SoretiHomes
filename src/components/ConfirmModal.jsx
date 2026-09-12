import React from 'react';
import { AlertTriangle, Info, Check, X } from 'lucide-react';

export default function ConfirmModal({
  isOpen,
  title,
  message,
  type = 'warning', // 'warning' | 'info' | 'danger'
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content max-w-md my-auto p-6 space-y-5 animate-scale-up border border-slate-200">
        
        {/* Header Icon */}
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
            type === 'danger' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'
          }`}>
            <AlertTriangle className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg leading-tight">
              {title}
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {message}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          {onCancel && (
            <button
              onClick={onCancel}
              className="btn-secondary py-2.5 px-4 text-xs font-bold"
            >
              {cancelText}
            </button>
          )}

          <button
            onClick={onConfirm}
            className={`btn-primary py-2.5 px-5 text-xs font-bold ${
              type === 'danger'
                ? 'bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-700 hover:to-red-800 shadow-rose-600/30'
                : ''
            }`}
          >
            {type === 'danger' ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
            {confirmText}
          </button>
        </div>

      </div>
    </div>
  );
}
