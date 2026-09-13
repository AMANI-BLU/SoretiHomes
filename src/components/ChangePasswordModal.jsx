import React, { useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  Loader2,
  X
} from 'lucide-react';
import { changeAdminPassword } from '../lib/supabase';

const MIN_PASSWORD_LENGTH = 8;

export default function ChangePasswordModal({ onClose }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg('');

    if (!currentPassword) {
      setErrorMsg('Enter your current password to continue.');
      return;
    }
    if (newPassword.length < MIN_PASSWORD_LENGTH) {
      setErrorMsg(`New password must be at least ${MIN_PASSWORD_LENGTH} characters long.`);
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg('New passwords do not match.');
      return;
    }
    if (currentPassword === newPassword) {
      setErrorMsg('Choose a new password that is different from your current password.');
      return;
    }

    try {
      setIsLoading(true);
      await changeAdminPassword(currentPassword, newPassword);
      setIsComplete(true);
    } catch (error) {
      const message = error?.message || '';
      setErrorMsg(
        message.includes('CURRENT_PASSWORD_INVALID')
          ? 'Your current password is incorrect.'
          : message.includes('ADMIN_ACCESS_REQUIRED')
          ? 'Your administrator session is no longer valid. Please sign in again.'
          : 'Password could not be changed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-backdrop z-[120] p-4 sm:p-6" onMouseDown={(event) => {
      if (event.target === event.currentTarget && !isLoading) onClose();
    }}>
      <div
        className="modal-content max-w-md bg-slate-900 text-slate-100 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-700"
        role="dialog"
        aria-modal="true"
        aria-labelledby="change-password-title"
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 id="change-password-title" className="text-lg font-extrabold text-white">
                Change Password
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Secure your administrator account.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-50"
            aria-label="Close change password dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isComplete ? (
          <div className="space-y-5">
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="font-extrabold text-sm">Password changed successfully.</p>
                <p className="text-xs mt-1 leading-relaxed">Your administrator password has been updated.</p>
              </div>
            </div>
            <button type="button" onClick={onClose} className="btn-primary w-full justify-center py-3 text-sm font-extrabold">
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="leading-relaxed font-semibold">{errorMsg}</span>
              </div>
            )}

            <PasswordField
              label="Current password"
              value={currentPassword}
              onChange={setCurrentPassword}
              showPassword={showPasswords}
              autoComplete="current-password"
            />
            <PasswordField
              label={`New password (min. ${MIN_PASSWORD_LENGTH} characters)`}
              value={newPassword}
              onChange={setNewPassword}
              showPassword={showPasswords}
              autoComplete="new-password"
            />
            <PasswordField
              label="Confirm new password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              showPassword={showPasswords}
              autoComplete="new-password"
            />

            <button
              type="button"
              onClick={() => setShowPasswords((visible) => !visible)}
              className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-2"
            >
              {showPasswords ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              {showPasswords ? 'Hide passwords' : 'Show passwords'}
            </button>

            <div className="flex flex-col-reverse sm:flex-row gap-2 pt-2">
              <button type="button" onClick={onClose} disabled={isLoading} className="btn-secondary flex-1 justify-center py-3 text-sm font-bold disabled:opacity-50">
                Cancel
              </button>
              <button type="submit" disabled={isLoading} className="btn-primary flex-1 justify-center py-3 text-sm font-extrabold disabled:opacity-50">
                {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Lock className="w-4 h-4" /> Save password</>}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function PasswordField({ label, value, onChange, showPassword, autoComplete }) {
  return (
    <label className="block">
      <span className="block text-xs font-bold text-slate-400 uppercase mb-1">{label}</span>
      <div className="relative">
        <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete}
          className="w-full pl-10 pr-4 py-2.5 text-sm font-semibold rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
        />
      </div>
    </label>
  );
}
