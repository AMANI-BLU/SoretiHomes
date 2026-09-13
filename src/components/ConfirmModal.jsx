import React, { useEffect } from 'react';
import { AlertTriangle, Trash2, Check, X, Loader2, Info } from 'lucide-react';

export default function ConfirmModal({
  isOpen,
  title = 'Are you sure?',
  message,
  type = 'danger', // 'danger' | 'warning' | 'info'
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isProcessing = false,
  onConfirm,
  onCancel
}) {
  // Handle ESC key to dismiss
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isProcessing && onCancel) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isProcessing, onCancel]);

  if (!isOpen) return null;

  return (
    <div 
      className="modal-backdrop z-[9999] flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isProcessing && onCancel) {
          onCancel();
        }
      }}
    >
      <div 
        className="modal-content max-w-md w-full my-auto p-6 sm:p-7 space-y-5 animate-scale-up border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl rounded-3xl relative"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        {onCancel && !isProcessing && (
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Header Icon and Content */}
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
            type === 'danger'
              ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/60'
              : type === 'warning'
              ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/60'
              : 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900/60'
          }`}>
            {type === 'danger' ? (
              <Trash2 className="w-6 h-6 stroke-[2.2]" />
            ) : type === 'warning' ? (
              <AlertTriangle className="w-6 h-6 stroke-[2.2]" />
            ) : (
              <Info className="w-6 h-6 stroke-[2.2]" />
            )}
          </div>

          <div className="space-y-1.5 min-w-0 pr-4">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-lg leading-snug">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed break-words">
              {message}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isProcessing}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-bold transition-all disabled:opacity-50"
            >
              {cancelText}
            </button>
          )}

          <button
            type="button"
            onClick={onConfirm}
            disabled={isProcessing}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all shadow-lg flex items-center gap-2 disabled:opacity-75 ${
              type === 'danger'
                ? 'bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-700 hover:to-red-800 shadow-rose-600/30'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 shadow-amber-500/20'
            }`}
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                {type === 'danger' ? <Trash2 className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                <span>{confirmText}</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
