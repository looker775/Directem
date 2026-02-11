import { useEffect, useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useI18n } from '../context/I18nContext';

export default function AccountSettings() {
  const { t } = useI18n();
  const [currentEmail, setCurrentEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [emailSuccess, setEmailSuccess] = useState('');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  useEffect(() => {
    let active = true;
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!active) return;
      const email = data.user?.email ?? '';
      setCurrentEmail(email);
      setNewEmail(email);
    };
    loadUser();
    return () => {
      active = false;
    };
  }, []);

  const handleEmailUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    setEmailError('');
    setEmailSuccess('');

    const trimmed = newEmail.trim();
    if (!trimmed) {
      setEmailError(t('Email is required.'));
      return;
    }
    if (trimmed === currentEmail) {
      setEmailError(t('Email is unchanged.'));
      return;
    }

    setEmailLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ email: trimmed });
      if (error) throw error;
      setEmailSuccess(t('Email update sent. Check your inbox to confirm.'));
    } catch (err: any) {
      setEmailError(err.message || t('Unable to update email.'));
    } finally {
      setEmailLoading(false);
    }
  };

  const handlePasswordUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (newPassword.length < 8) {
      setPasswordError(t('Password must be at least 8 characters.'));
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError(t('Passwords do not match.'));
      return;
    }

    setPasswordLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      setPasswordSuccess(t('Password updated.'));
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setPasswordError(err.message || t('Unable to update password.'));
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-header">
          <div className="brand auth-brand">
            <img src="/logo.png" alt="Directem logo" className="brand-logo" />
            <span className="brand-mark">Directem</span>
          </div>
          <h2>{t('Account settings')}</h2>
          <p>{t('Update your email or password securely.')}</p>
        </div>

        <form onSubmit={handleEmailUpdate} className="form">
          {emailError && <div className="alert error">{emailError}</div>}
          {emailSuccess && <div className="alert success">{emailSuccess}</div>}
          <label>
            {t('Current email')}
            <div className="input-wrap">
              <Mail size={16} />
              <input type="email" value={currentEmail} disabled />
            </div>
          </label>
          <label>
            {t('New email')}
            <div className="input-wrap">
              <Mail size={16} />
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder={t('New email')}
                required
              />
            </div>
          </label>
          <button className="secondary-button" type="submit" disabled={emailLoading}>
            {emailLoading ? t('Updating...') : t('Update email')}
          </button>
        </form>

        <div className="divider" />

        <form onSubmit={handlePasswordUpdate} className="form">
          {passwordError && <div className="alert error">{passwordError}</div>}
          {passwordSuccess && <div className="alert success">{passwordSuccess}</div>}
          <label>
            {t('New password')}
            <div className="input-wrap">
              <Lock size={16} />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder={t('Create a strong password')}
                required
              />
            </div>
          </label>
          <label>
            {t('Confirm password')}
            <div className="input-wrap">
              <Lock size={16} />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t('Repeat new password')}
                required
              />
            </div>
          </label>
          <button className="secondary-button" type="submit" disabled={passwordLoading}>
            {passwordLoading ? t('Updating...') : t('Update password')}
          </button>
        </form>
      </div>
    </div>
  );
}
