import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getUserProfile, signOut, type Profile } from '../lib/supabase';
import { Loader2 } from 'lucide-react';
import { useI18n } from '../context/I18nContext';

interface ProtectedRouteProps {
  allowedRoles: Array<Profile['role']>;
  children: React.ReactNode;
}

export default function ProtectedRoute({ allowedRoles, children }: ProtectedRouteProps) {
  const { t } = useI18n();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const load = async () => {
      const nextProfile = await getUserProfile();
      if (!active) return;
      setProfile(nextProfile);
      setLoading(false);
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="centered">
        <Loader2 className="spin" />
      </div>
    );
  }

  if (!profile) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(profile.role)) {
    const fallback: Record<Profile['role'], string> = {
      owner: '/owner',
      admin: '/admin',
      buyer: '/buyer',
    };
    return <Navigate to={fallback[profile.role] || '/'} replace />;
  }

  if (profile.role === 'admin') {
    const approved = profile.admin_approved === true;
    const blocked = profile.admin_blocked === true;
    if (!approved || blocked) {
      return (
        <div className="centered">
          <div className="card narrow">
            <h2>{blocked ? t('Admin account blocked') : t('Admin approval required')}</h2>
            <p>
              {blocked
                ? t('Your admin account has been blocked by the owner. Contact support if this is unexpected.')
                : t('Your admin account is pending owner approval.')}
            </p>
            <button className="primary-button" onClick={signOut}>
              {t('Sign out')}
            </button>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
}
