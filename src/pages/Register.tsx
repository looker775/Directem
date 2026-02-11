import { useEffect, useState } from 'react';
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
  const [ownerAvailable, setOwnerAvailable] = useState(true);
  const [ownerChecking, setOwnerChecking] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useI18n();
  const params = new URLSearchParams(location.search);
  const isOwnerSignup =
    location.pathname.startsWith('/kali/owner') || params.get('role') === 'owner';
  const isAdminSignup =
    !isOwnerSignup && (location.pathname.startsWith('/kali') || params.get('role') === 'admin');

  useEffect(() => {
    if (!isOwnerSignup) return;
    let active = true;
    const checkOwner = async () => {
      setOwnerChecking(true);
      try {
        const { data } = await supabase.rpc('directem_owner_exists');
        if (!active) return;
        setOwnerAvailable(!data);
      } catch {
        if (!active) return;
        setOwnerAvailable(true);
      } finally {
        if (!active) return;
        setOwnerChecking(false);
      }
    };
    checkOwner();
    return () => {
      active = false;
    };
  }, [isOwnerSignup]);

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
            role: isOwnerSignup ? 'owner' : isAdminSignup ? 'admin' : 'buyer',
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
          isOwnerSignup
            ? t('Owner account created. Check your email to confirm, then sign in.')
            : isAdminSignup
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
          {isOwnerSignup && <span className="pill">{t('Owner access')}</span>}
          {isAdminSignup && <span className="pill">{t('Admin request')}</span>}
          <h2>
            {isOwnerSignup
              ? t('Owner registration')
              : isAdminSignup
                ? t('Request admin access')
                : t('Create your Directem account')}
          </h2>
          <p>
            {isOwnerSignup
              ? t('Owner access is limited to one account.')
              : isAdminSignup
                ? t('Admin access is granted only after owner approval.')
                : t('Access verified UAE employer contacts in minutes.')}
          </p>
        </div>

        {error && <div className="alert error">{error}</div>}
        {success && <div className="alert success">{success}</div>}
        {isOwnerSignup && !ownerChecking && !ownerAvailable && (
          <div className="alert error">{t('Owner registration is no longer available.')}</div>
        )}

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
                disabled={isOwnerSignup && (!ownerAvailable || ownerChecking)}
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
                disabled={isOwnerSignup && (!ownerAvailable || ownerChecking)}
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
                disabled={isOwnerSignup && (!ownerAvailable || ownerChecking)}
              />
            </div>
          </label>
          <button
            className="primary-button"
            type="submit"
            disabled={loading || (isOwnerSignup && (!ownerAvailable || ownerChecking))}
          >
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
              <Link to={isOwnerSignup ? '/kali' : '/login'}>{t('Sign in')}</Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
