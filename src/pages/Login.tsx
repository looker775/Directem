import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import { supabase, getUserProfile } from '../lib/supabase';
import { useI18n } from '../context/I18nContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const isOwnerPortal = location.pathname === '/kali';
  const { t } = useI18n();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (signInError) throw signInError;
      if (!data.user) throw new Error('Login failed.');

      const profile = await getUserProfile();
      if (!profile) {
        navigate('/buyer');
        return;
      }

      const destination = profile.role === 'owner'
        ? '/owner'
        : profile.role === 'admin'
          ? '/admin'
          : '/buyer';

      navigate(destination);
    } catch (err: any) {
      setError(err.message || t('Unable to sign in.'));
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
          {isOwnerPortal && <span className="pill">{t('Owner & Admin portal')}</span>}
          <h2>{isOwnerPortal ? t('Owner & Admin access') : t('Welcome back')}</h2>
          <p>
            {isOwnerPortal
              ? t('Private access for the Directem owner and owner-approved admins.')
              : t('Sign in to access employer contacts.')}
          </p>
        </div>

        {error && <div className="alert error">{error}</div>}

        <form onSubmit={handleLogin} className="form">
          <label>
            {t('Email')}
            <div className="input-wrap">
              <Mail size={16} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('you@company.com')}
                required
              />
            </div>
          </label>
          <label>
            {t('Password')}
            <div className="input-wrap">
              <Lock size={16} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          </label>
          <Link className="pill-link" to="/forgot">
            {isOwnerPortal ? t('Forgot admin password?') : t('Forgot password?')}
          </Link>
          <button className="primary-button" type="submit" disabled={loading}>
            {loading ? t('Signing in...') : t('Sign in')}
          </button>
        </form>

        <p className="helper">
          {isOwnerPortal ? (
            <>
              {t('Need admin access?')}{' '}
              <Link to="/kali/register">{t('Request admin access')}</Link>
              <br />
              {t('Owner registration link (one-time)')}{' '}
              <Link to="/kali/owner">{t('Owner registration')}</Link>
              <br />
              {t('Buyer access? Use the buyer sign in page')}{' '}
              <Link to="/login">{t('Sign in')}</Link>
            </>
          ) : (
            <>
              {t('New to Directem? Create an account')}{' '}
              <Link to="/register">{t('Register')}</Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
