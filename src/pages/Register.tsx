import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, User, Lock } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const isAdminSignup =
    location.pathname.startsWith('/kali') || params.get('role') === 'admin';

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const { error: signUpError } = await supabase.auth.signUp({
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
      setSuccess(
        isAdminSignup
          ? 'Admin request created. Check your email to confirm, then wait for owner approval.'
          : 'Account created. Check your email to confirm, then sign in.'
      );
      setFullName('');
      setEmail('');
      setPassword('');
    } catch (err: any) {
      setError(err.message || 'Unable to register.');
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
          {isAdminSignup && <span className="pill">Admin request</span>}
          <h2>{isAdminSignup ? 'Request admin access' : 'Create your Directem account'}</h2>
          <p>
            {isAdminSignup
              ? 'Admin access is granted only after owner approval.'
              : 'Access verified UAE employer contacts in minutes.'}
          </p>
        </div>

        {error && <div className="alert error">{error}</div>}
        {success && <div className="alert success">{success}</div>}

        <form onSubmit={handleRegister} className="form">
          <label>
            Full name
            <div className="input-wrap">
              <User size={16} />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full name"
                required
              />
            </div>
          </label>
          <label>
            Email
            <div className="input-wrap">
              <Mail size={16} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
              />
            </div>
          </label>
          <label>
            Password
            <div className="input-wrap">
              <Lock size={16} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                required
              />
            </div>
          </label>
          <button className="primary-button" type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="helper">
          {isAdminSignup ? (
            <>
              Already approved? <Link to="/kali">Sign in as admin</Link>
            </>
          ) : (
            <>
              Already have an account? <Link to="/login">Sign in</Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
