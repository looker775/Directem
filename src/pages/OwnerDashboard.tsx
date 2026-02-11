import { useEffect, useState } from 'react';
import { BadgeCheck, Crown, Shield, Users, Package, ClipboardList, Loader2 } from 'lucide-react';
import { supabase, type Profile } from '../lib/supabase';
import { useI18n } from '../context/I18nContext';

interface AdminUser {
  id: string;
  full_name?: string | null;
  email?: string | null;
  created_at: string;
  admin_approved?: boolean | null;
  admin_blocked?: boolean | null;
}

export default function OwnerDashboard() {
  const { t } = useI18n();
  const [loading, setLoading] = useState(true);
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [stats, setStats] = useState({ packages: 0, employers: 0, purchases: 0 });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setLoading(true);
    setError('');
    try {
      await Promise.all([loadAdmins(), loadStats()]);
    } catch (err: any) {
      console.error('Failed to load owner dashboard:', err);
      setError(t('Unable to load owner dashboard.'));
    } finally {
      setLoading(false);
    }
  };

  const loadAdmins = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('id, full_name, email, created_at, admin_approved, admin_blocked')
      .eq('role', 'admin')
      .order('created_at', { ascending: false });
    if (data) setAdmins(data as AdminUser[]);
  };

  const loadStats = async () => {
    const { count: packageCount } = await supabase
      .from('directem_packages')
      .select('*', { count: 'exact', head: true });
    const { count: employerCount } = await supabase
      .from('directem_employers')
      .select('*', { count: 'exact', head: true });
    const { count: purchaseCount } = await supabase
      .from('directem_purchases')
      .select('*', { count: 'exact', head: true });

    setStats({
      packages: packageCount || 0,
      employers: employerCount || 0,
      purchases: purchaseCount || 0,
    });
  };

  const updateAdmin = async (adminId: string, updates: Partial<Profile>) => {
    setMessage('');
    setError('');
    const { error: updateError } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', adminId)
      .eq('role', 'admin');

    if (updateError) {
      setError(updateError.message || 'Failed to update admin.');
      return;
    }

    setMessage(t('Admin settings updated.'));
    loadAdmins();
  };

  if (loading) {
    return (
      <div className="centered">
        <Loader2 className="spin" />
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <div className="header-title">
          <Crown size={26} />
          <div>
            <h1>{t('Directem Owner Console')}</h1>
            <p>{t('Approve admins and oversee marketplace activity.')}</p>
          </div>
        </div>
        <button className="ghost-button" onClick={loadAll}>
          {t('Refresh')}
        </button>
      </div>

      {error && <div className="alert error">{error}</div>}
      {message && <div className="alert success">{message}</div>}

      <div className="stats-grid">
        <div className="stat-card">
          <div>
            <p className="muted">{t('Packages')}</p>
            <h3>{stats.packages}</h3>
          </div>
          <Package size={20} />
        </div>
        <div className="stat-card">
          <div>
            <p className="muted">{t('Employers')}</p>
            <h3>{stats.employers}</h3>
          </div>
          <Users size={20} />
        </div>
        <div className="stat-card">
          <div>
            <p className="muted">{t('Purchases')}</p>
            <h3>{stats.purchases}</h3>
          </div>
          <ClipboardList size={20} />
        </div>
      </div>

      <section className="card">
        <div className="card-header">
          <h2>{t('Admin approvals')}</h2>
          <Shield size={18} />
        </div>
        {admins.length === 0 ? (
          <p className="muted">{t('No admin accounts found.')}</p>
        ) : (
          <div className="stack">
            {admins.map((admin) => {
              const approved = admin.admin_approved === true;
              const blocked = admin.admin_blocked === true;
              return (
                <div key={admin.id} className="history-row">
                  <div>
                    <p>{admin.full_name || admin.email || t('Admin')}</p>
                    <span className="muted">{admin.email}</span>
                  </div>
                  <div className="row-actions">
                    <span className={`status ${approved ? 'active' : 'pending'}`}>
                      {approved ? t('Approved') : t('Pending')}
                    </span>
                    {blocked && <span className="status rejected">{t('Blocked')}</span>}
                    {!approved && !blocked && (
                      <button
                        className="primary-button"
                        onClick={() => updateAdmin(admin.id, { admin_approved: true })}
                      >
                        <BadgeCheck size={14} />
                        {t('Approve')}
                      </button>
                    )}
                    {blocked ? (
                      <button
                        className="ghost-button"
                        onClick={() => updateAdmin(admin.id, { admin_blocked: false })}
                      >
                        {t('Unblock')}
                      </button>
                    ) : (
                      <button
                        className="ghost-button danger"
                        onClick={() => updateAdmin(admin.id, { admin_blocked: true })}
                      >
                        {t('Block')}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
