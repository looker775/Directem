import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useI18n } from '../context/I18nContext';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { t } = useI18n();

  useEffect(() => {
    let active = true;

    const handleRecovery = async () => {
      const url = new URL(window.location.href);
      const code = url.searchParams.get('code');
      if (code) {
        await supabase.auth.exchangeCodeForSession(code);
      }
      const { data } = await supabase.auth.getSession();
      if (!active) return;
      if (data.session) {
        setReady(true);
      }
    };

    handleRecovery();

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (!active) return;
      if (event === 'PASSWORD_RECOVERY' || session) {
        setReady(true);
      }
    });

    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (password.length < 8) {
      setError(t('Password must be at least 8 characters.'));
      return;
    }
    if (password !== confirm) {
      setError(t('Passwords do not match.'));
      return;
    }

    setLoading(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) throw updateError;
      setSuccess(t('Password updated. You can now sign in.'));
      setTimeout(() => navigate('/login'), 800);
    } catch (err: any) {
      setError(err.message || t('Unable to reset password.'));
    } finally {
      setLoading(false);
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
          <h2>{t('Set a new password')}</h2>
          <p>{t('Choose a strong password to secure your account.')}</p>
        </div>

        {!ready && (
          <div className="alert">
            {t('Use the password reset link from your email to open this page.')}
          </div>
        )}
        {error && <div className="alert error">{error}</div>}
        {success && <div className="alert success">{success}</div>}

        <form onSubmit={handleSubmit} className="form">
          <label>
            {t('New password')}
            <div className="input-wrap">
              <Lock size={16} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder={t('Repeat new password')}
                required
              />
            </div>
          </label>
          <button className="primary-button" type="submit" disabled={loading || !ready}>
            {loading ? t('Updating...') : t('Update password')}
          </button>
        </form>
      </div>
    </div>
  );
}
