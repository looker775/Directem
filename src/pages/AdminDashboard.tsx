import { useEffect, useMemo, useState } from 'react';
import {
  BadgeCheck,
  ClipboardList,
  Loader2,
  Package,
  RefreshCw,
  Save,
  Users,
  XCircle,
  CheckCircle,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useI18n } from '../context/I18nContext';

interface DirectemPackage {
  id: string;
  name: string;
  employer_count: number;
  price_usd: number;
  is_active: boolean;
}

interface DirectemEmployer {
  id: string;
  company_name: string;
  contact_name?: string | null;
  job_title?: string | null;
  whatsapp?: string | null;
  phone?: string | null;
  email?: string | null;
  city?: string | null;
  country?: string | null;
  created_at: string;
}

interface DirectemPurchase {
  id: string;
  status: 'pending' | 'active' | 'rejected' | 'expired';
  created_at: string;
  payment_reference?: string | null;
  preferred_job?: string | null;
  preferred_city?: string | null;
  salary_expectation?: string | null;
  request_notes?: string | null;
  buyer?: { full_name?: string | null; email?: string | null; phone?: string | null };
  package?: { name?: string | null; employer_count?: number | null; price_usd?: number | null };
}

export default function AdminDashboard() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<'purchases' | 'packages' | 'employers'>('purchases');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [packages, setPackages] = useState<DirectemPackage[]>([]);
  const [packageEdits, setPackageEdits] = useState<Record<string, Partial<DirectemPackage>>>({});
  const [newPackage, setNewPackage] = useState({ name: '', employer_count: '', price_usd: '' });

  const [employers, setEmployers] = useState<DirectemEmployer[]>([]);
  const [newEmployer, setNewEmployer] = useState({
    company_name: '',
    contact_name: '',
    job_title: '',
    whatsapp: '',
    phone: '',
    email: '',
    city: '',
    country: 'UAE',
  });

  const [purchases, setPurchases] = useState<DirectemPurchase[]>([]);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setLoading(true);
    setError('');
    try {
      await Promise.all([loadPackages(), loadEmployers(), loadPurchases()]);
    } catch (err: any) {
      console.error('Failed to load Directem admin data:', err);
      setError(t('Unable to load Directem admin data.'));
    } finally {
      setLoading(false);
    }
  };

  const loadPackages = async () => {
    const { data } = await supabase
      .from('directem_packages')
      .select('*')
      .order('employer_count', { ascending: true });
    if (data) setPackages(data as DirectemPackage[]);
  };

  const loadEmployers = async () => {
    const { data } = await supabase
      .from('directem_employers')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200);
    if (data) setEmployers(data as DirectemEmployer[]);
  };

  const loadPurchases = async () => {
    const { data } = await supabase
      .from('directem_purchases')
      .select('*, payment_reference, preferred_job, preferred_city, salary_expectation, request_notes, buyer:profiles(full_name, email, phone), package:directem_packages(name, employer_count, price_usd)')
      .order('created_at', { ascending: false })
      .limit(200);
    if (data) setPurchases(data as DirectemPurchase[]);
  };

  const updatePackageDraft = (id: string, key: keyof DirectemPackage, value: string | number | boolean) => {
    setPackageEdits((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [key]: value,
      },
    }));
  };

  const savePackage = async (pkg: DirectemPackage) => {
    setActionLoading(pkg.id);
    setMessage('');
    setError('');
    try {
      const updates = packageEdits[pkg.id] || {};
      if (Object.keys(updates).length === 0) {
        setActionLoading(null);
        return;
      }

      const payload = {
        ...updates,
        employer_count: Number(updates.employer_count ?? pkg.employer_count),
        price_usd: Number(updates.price_usd ?? pkg.price_usd),
      };

      const { error: updateError } = await supabase
        .from('directem_packages')
        .update(payload)
        .eq('id', pkg.id);

      if (updateError) throw updateError;
      setMessage(t('Package updated.'));
      setPackageEdits((prev) => {
        const next = { ...prev };
        delete next[pkg.id];
        return next;
      });
      loadPackages();
    } catch (err: any) {
      setError(err.message || t('Failed to update package.'));
    } finally {
      setActionLoading(null);
    }
  };

  const addPackage = async () => {
    setActionLoading('new-package');
    setMessage('');
    setError('');
    try {
      const payload = {
        name: newPackage.name.trim(),
        employer_count: Number(newPackage.employer_count),
        price_usd: Number(newPackage.price_usd),
        is_active: true,
      };

      const { error: insertError } = await supabase
        .from('directem_packages')
        .insert(payload);

      if (insertError) throw insertError;
      setMessage(t('New package added.'));
      setNewPackage({ name: '', employer_count: '', price_usd: '' });
      loadPackages();
    } catch (err: any) {
      setError(err.message || t('Failed to add package.'));
    } finally {
      setActionLoading(null);
    }
  };

  const addEmployer = async () => {
    setActionLoading('new-employer');
    setMessage('');
    setError('');
    try {
      if (!newEmployer.company_name.trim()) {
        setError(t('Company name is required.'));
        setActionLoading(null);
        return;
      }

      const payload = {
        company_name: newEmployer.company_name.trim(),
        contact_name: newEmployer.contact_name.trim() || null,
        job_title: newEmployer.job_title.trim() || null,
        whatsapp: newEmployer.whatsapp.trim() || null,
        phone: newEmployer.phone.trim() || null,
        email: newEmployer.email.trim() || null,
        city: newEmployer.city.trim() || null,
        country: newEmployer.country.trim() || 'UAE',
      };

      const { error: insertError } = await supabase
        .from('directem_employers')
        .insert(payload);

      if (insertError) throw insertError;
      setMessage(t('Employer contact added.'));
      setNewEmployer({
        company_name: '',
        contact_name: '',
        job_title: '',
        whatsapp: '',
        phone: '',
        email: '',
        city: '',
        country: 'UAE',
      });
      loadEmployers();
    } catch (err: any) {
      setError(err.message || t('Failed to add employer.'));
    } finally {
      setActionLoading(null);
    }
  };

  const approvePurchase = async (purchaseId: string) => {
    setActionLoading(purchaseId);
    setMessage('');
    setError('');
    try {
      const { data, error: rpcError } = await supabase
        .rpc('directem_approve_purchase', { p_purchase_id: purchaseId });

      if (rpcError) throw rpcError;
      setMessage(t('Purchase approved. {count} contacts assigned.', { count: data ?? 0 }));
      loadPurchases();
    } catch (err: any) {
      setError(err.message || t('Failed to approve purchase.'));
    } finally {
      setActionLoading(null);
    }
  };

  const rejectPurchase = async (purchaseId: string) => {
    setActionLoading(purchaseId);
    setMessage('');
    setError('');
    try {
      const { error: updateError } = await supabase
        .from('directem_purchases')
        .update({ status: 'rejected', approved_at: new Date().toISOString() })
        .eq('id', purchaseId);

      if (updateError) throw updateError;
      setMessage(t('Purchase rejected.'));
      loadPurchases();
    } catch (err: any) {
      setError(err.message || t('Failed to reject purchase.'));
    } finally {
      setActionLoading(null);
    }
  };

  const stats = useMemo(() => {
    return {
      packages: packages.length,
      employers: employers.length,
      pending: purchases.filter((p) => p.status === 'pending').length,
    };
  }, [packages.length, employers.length, purchases]);

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
        <div>
          <h1>{t('Directem Admin Workspace')}</h1>
          <p>{t('Manage packages, employer contacts, and purchase approvals.')}</p>
        </div>
        <button className="ghost-button" onClick={loadAll}>
          <RefreshCw size={16} />
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
            <p className="muted">{t('Pending approvals')}</p>
            <h3>{stats.pending}</h3>
          </div>
          <ClipboardList size={20} />
        </div>
      </div>

      <div className="tab-row">
        {[
          { id: 'purchases', label: t('Purchase requests'), icon: ClipboardList },
          { id: 'packages', label: t('Packages'), icon: Package },
          { id: 'employers', label: t('Employers'), icon: Users },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'purchases' && (
        <section className="card">
          <h2>{t('Purchase approvals')}</h2>
          {purchases.length === 0 ? (
            <p className="muted">{t('No purchases yet.')}</p>
          ) : (
            <div className="stack">
              {purchases.map((purchase) => (
                <div key={purchase.id} className="history-row">
                  <div>
                    <p>{purchase.buyer?.full_name || purchase.buyer?.email || t('Buyer')}</p>
                    <span className="muted">
                      {purchase.package?.name || t('Package')} • {purchase.package?.employer_count || 0} {t('Employers')}
                    </span>
                    {purchase.payment_reference && (
                      <p className="muted">{t('Payment ref:')} {purchase.payment_reference}</p>
                    )}
                    {purchase.preferred_job && (
                      <p className="muted">{t('Preferred position:')} {purchase.preferred_job}</p>
                    )}
                    {purchase.preferred_city && (
                      <p className="muted">{t('Preferred city:')} {purchase.preferred_city}</p>
                    )}
                    {purchase.salary_expectation && (
                      <p className="muted">{t('Salary:')} {purchase.salary_expectation}</p>
                    )}
                    {purchase.request_notes && (
                      <p className="muted">{t('Notes:')} {purchase.request_notes}</p>
                    )}
                  </div>
                  <div className="row-actions">
                    <span className={`status ${purchase.status}`}>
                      {t(
                        purchase.status === 'active'
                          ? 'Active'
                          : purchase.status === 'pending'
                            ? 'Pending'
                            : purchase.status === 'rejected'
                              ? 'Rejected'
                              : 'Expired'
                      )}
                    </span>
                    {purchase.status === 'pending' && (
                      <div className="action-buttons">
                        <button
                          className="primary-button"
                          onClick={() => approvePurchase(purchase.id)}
                          disabled={actionLoading === purchase.id}
                        >
                          {actionLoading === purchase.id ? <Loader2 size={14} className="spin" /> : <CheckCircle size={14} />}
                          {t('Approve & assign')}
                        </button>
                        <button
                          className="ghost-button danger"
                          onClick={() => rejectPurchase(purchase.id)}
                          disabled={actionLoading === purchase.id}
                        >
                          <XCircle size={14} />
                          {t('Reject')}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {activeTab === 'packages' && (
        <section className="card">
          <h2>{t('Packages')}</h2>
          <div className="stack">
            {packages.map((pkg) => {
              const draft = packageEdits[pkg.id] || {};
              return (
                <div key={pkg.id} className="package-row">
                  <input
                    className="input"
                    value={String(draft.name ?? pkg.name)}
                    onChange={(e) => updatePackageDraft(pkg.id, 'name', e.target.value)}
                  />
                  <input
                    className="input"
                    value={String(draft.employer_count ?? pkg.employer_count)}
                    onChange={(e) => updatePackageDraft(pkg.id, 'employer_count', e.target.value)}
                  />
                  <input
                    className="input"
                    value={String(draft.price_usd ?? pkg.price_usd)}
                    onChange={(e) => updatePackageDraft(pkg.id, 'price_usd', e.target.value)}
                  />
                  <label className="muted">
                    <input
                      type="checkbox"
                      checked={Boolean(draft.is_active ?? pkg.is_active)}
                      onChange={(e) => updatePackageDraft(pkg.id, 'is_active', e.target.checked)}
                    />
                    {t('Active')}
                  </label>
                  <button
                    className="primary-button"
                    onClick={() => savePackage(pkg)}
                    disabled={actionLoading === pkg.id}
                  >
                    {actionLoading === pkg.id ? <Loader2 size={14} className="spin" /> : <Save size={14} />}
                    {t('Save')}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="divider" />
          <h3>{t('Add new package')}</h3>
          <div className="package-row">
            <input
              className="input"
              value={newPackage.name}
              onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
              placeholder={t('Package name')}
            />
            <input
              className="input"
              value={newPackage.employer_count}
              onChange={(e) => setNewPackage({ ...newPackage, employer_count: e.target.value })}
              placeholder={t('Employers')}
            />
            <input
              className="input"
              value={newPackage.price_usd}
              onChange={(e) => setNewPackage({ ...newPackage, price_usd: e.target.value })}
              placeholder={t('USD price')}
            />
            <button
              className="primary-button"
              onClick={addPackage}
              disabled={actionLoading === 'new-package'}
            >
              {actionLoading === 'new-package' ? <Loader2 size={14} className="spin" /> : <BadgeCheck size={14} />}
              {t('Add')}
            </button>
          </div>
        </section>
      )}

      {activeTab === 'employers' && (
        <section className="card">
          <h2>{t('Employer contacts')}</h2>
          <div className="employer-grid">
            <input
              className="input"
              value={newEmployer.company_name}
              onChange={(e) => setNewEmployer({ ...newEmployer, company_name: e.target.value })}
              placeholder={t('Company name')}
            />
            <input
              className="input"
              value={newEmployer.contact_name}
              onChange={(e) => setNewEmployer({ ...newEmployer, contact_name: e.target.value })}
              placeholder={t('Contact name')}
            />
            <input
              className="input"
              value={newEmployer.job_title}
              onChange={(e) => setNewEmployer({ ...newEmployer, job_title: e.target.value })}
              placeholder={t('Job title')}
            />
            <input
              className="input"
              value={newEmployer.whatsapp}
              onChange={(e) => setNewEmployer({ ...newEmployer, whatsapp: e.target.value })}
              placeholder={t('WhatsApp')}
            />
            <input
              className="input"
              value={newEmployer.phone}
              onChange={(e) => setNewEmployer({ ...newEmployer, phone: e.target.value })}
              placeholder={t('Phone')}
            />
            <input
              className="input"
              value={newEmployer.email}
              onChange={(e) => setNewEmployer({ ...newEmployer, email: e.target.value })}
              placeholder={t('Email')}
            />
            <input
              className="input"
              value={newEmployer.city}
              onChange={(e) => setNewEmployer({ ...newEmployer, city: e.target.value })}
              placeholder={t('City')}
            />
            <input
              className="input"
              value={newEmployer.country}
              onChange={(e) => setNewEmployer({ ...newEmployer, country: e.target.value })}
              placeholder={t('Country')}
            />
            <button
              className="primary-button"
              onClick={addEmployer}
              disabled={actionLoading === 'new-employer'}
            >
              {actionLoading === 'new-employer' ? <Loader2 size={14} className="spin" /> : <BadgeCheck size={14} />}
              {t('Add employer')}
            </button>
          </div>

          <div className="stack">
            {employers.map((employer) => (
              <div key={employer.id} className="contact-card">
                <div>
                  <h3>{employer.company_name}</h3>
                  <p className="muted">
                    {employer.contact_name || 'Contact'}
                    {employer.job_title ? ` • ${employer.job_title}` : ''}
                    {employer.city ? ` • ${employer.city}` : ''}
                  </p>
                </div>
                <div className="contact-actions">
                  {employer.whatsapp && <span className="pill">WA: {employer.whatsapp}</span>}
                  {employer.phone && <span className="pill">Phone: {employer.phone}</span>}
                  {employer.email && <span className="pill">{employer.email}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
