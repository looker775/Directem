import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Mail, User, Lock } from 'lucide-react';
import { getUserProfile, supabase } from '../lib/supabase';
import { useI18n } from '../context/I18nContext';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useI18n();
  const params = new URLSearchParams(location.search);
  const isAdminSignup =
    location.pathname.startsWith('/kali') || params.get('role') === 'admin';

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
            role: isAdminSignup ? 'admin' : 'buyer',
          },
        },
      });

      if (signUpError) throw signUpError;
      if (signUpData?.session) {
        const profile = await getUserProfile();
        if (profile?.role === 'owner') {
          navigate('/owner');
          return;
        }
        if (profile?.role === 'admin') {
          navigate('/admin');
          return;
        }
        navigate('/buyer');
        return;
      }

      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError || !signInData?.session) {
        setSuccess(
          isAdminSignup
            ? t('Admin request created. Check your email to confirm, then wait for owner approval.')
            : t('Account created. Check your email to confirm, then sign in.')
        );
        return;
      }

      const profile = await getUserProfile();
      if (profile?.role === 'owner') {
        navigate('/owner');
        return;
      }
      if (profile?.role === 'admin') {
        navigate('/admin');
        return;
      }
      navigate('/buyer');
      return;
    } catch (err: any) {
      setError(err.message || t('Unable to register.'));
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
          {isAdminSignup && <span className="pill">{t('Admin request')}</span>}
          <h2>{isAdminSignup ? t('Request admin access') : t('Create your Directem account')}</h2>
          <p>
            {isAdminSignup
              ? t('Admin access is granted only after owner approval.')
              : t('Access verified UAE employer contacts in minutes.')}
          </p>
        </div>

        {error && <div className="alert error">{error}</div>}
        {success && <div className="alert success">{success}</div>}

        <form onSubmit={handleRegister} className="form">
          <label>
            {t('Full name')}
            <div className="input-wrap">
              <User size={16} />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={t('Full name')}
                required
              />
            </div>
          </label>
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
                placeholder={t('Create a strong password')}
                required
              />
            </div>
          </label>
          <button className="primary-button" type="submit" disabled={loading}>
            {loading ? t('Creating account...') : t('Create account')}
          </button>
        </form>

        <p className="helper">
          {isAdminSignup ? (
            <>
              {t('Already approved?')}{' '}
              <Link to="/kali">{t('Sign in as admin')}</Link>
            </>
          ) : (
            <>
              {t('Already have an account?')}{' '}
              <Link to="/login">{t('Sign in')}</Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
