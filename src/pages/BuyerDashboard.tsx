import { useEffect, useMemo, useState } from 'react';
import { CheckCircle, Clock, Globe2, Loader2, MessageCircle, PhoneCall, ShieldCheck } from 'lucide-react';
import { supabase, getUserProfile, type Profile } from '../lib/supabase';
import { detectCountryCode, detectCountryCodeFromGps } from '../lib/geo';
import { formatCurrency, getExchangeRate, resolveCurrencyForCountry, roundAmount } from '../lib/currency';
import PayPalCheckout from '../components/PayPalCheckout';

interface DirectemPackage {
  id: string;
  name: string;
  employer_count: number;
  price_usd: number;
  is_active: boolean;
}

interface DirectemPurchase {
  id: string;
  package_id: string;
  status: 'pending' | 'active' | 'rejected' | 'expired';
  created_at: string;
  package?: { name: string; employer_count: number; price_usd: number };
}

interface DirectemAccessRow {
  id: string;
  created_at: string;
  employer?: {
    id: string;
    company_name: string;
    contact_name?: string | null;
    job_title?: string | null;
    whatsapp?: string | null;
    phone?: string | null;
    email?: string | null;
    city?: string | null;
    country?: string | null;
  };
}

interface RequestDetails {
  preferredJob: string;
  salaryExpectation: string;
  notes: string;
  paymentReference: string;
}

export default function BuyerDashboard() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [packages, setPackages] = useState<DirectemPackage[]>([]);
  const [purchases, setPurchases] = useState<DirectemPurchase[]>([]);
  const [accessRows, setAccessRows] = useState<DirectemAccessRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [countryCode, setCountryCode] = useState<string | undefined>();
  const [displayCurrency, setDisplayCurrency] = useState('USD');
  const [fxRate, setFxRate] = useState<number | null>(null);
  const [currencyNote, setCurrencyNote] = useState('');
  const [gpsStatus, setGpsStatus] = useState<'idle' | 'loading' | 'ready' | 'denied'>('idle');
  const [submittingPackage, setSubmittingPackage] = useState<string | null>(null);
  const paypalEnabled = Boolean(import.meta.env.VITE_PAYPAL_CLIENT_ID);
  const [requestDetails, setRequestDetails] = useState<Record<string, RequestDetails>>({});
  const [paidPackages, setPaidPackages] = useState<Record<string, string>>({});

  useEffect(() => {
    loadAll();
  }, []);

  useEffect(() => {
    let active = true;
    const loadCountry = async () => {
      const code = await detectCountryCode();
      if (!active) return;
      setCountryCode(code);
    };
    loadCountry();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!countryCode) return;
    let active = true;
    const loadCurrency = async () => {
      try {
        const resolved = await resolveCurrencyForCountry(countryCode, 'USD');
        const rate = await getExchangeRate('USD', resolved.currency);
        if (!active) return;
        if (!rate) {
          setDisplayCurrency('USD');
          setFxRate(null);
          setCurrencyNote('Showing USD because exchange rates are unavailable.');
          return;
        }
        setDisplayCurrency(resolved.currency);
        setFxRate(rate);
        setCurrencyNote(
          resolved.isFallback
            ? `Local currency unsupported. Showing ${resolved.currency}.`
            : ''
        );
      } catch {
        if (!active) return;
        setDisplayCurrency('USD');
        setFxRate(null);
        setCurrencyNote('Showing USD because exchange rates are unavailable.');
      }
    };

    loadCurrency();
    return () => {
      active = false;
    };
  }, [countryCode]);

  const loadAll = async () => {
    setLoading(true);
    setError('');
    try {
      const userProfile = await getUserProfile();
      if (!userProfile) {
        setError('Unable to load your profile.');
        return;
      }
      setProfile(userProfile);

      const { data: pkgData } = await supabase
        .from('directem_packages')
        .select('*')
        .eq('is_active', true)
        .order('employer_count', { ascending: true });
      if (pkgData) setPackages(pkgData as DirectemPackage[]);

      const { data: purchaseData } = await supabase
        .from('directem_purchases')
        .select('*, package:directem_packages(name, employer_count, price_usd)')
        .eq('buyer_id', userProfile.id)
        .order('created_at', { ascending: false });
      if (purchaseData) setPurchases(purchaseData as DirectemPurchase[]);

      const { data: accessData } = await supabase
        .from('directem_employer_access')
        .select('id, created_at, employer:directem_employers(id, company_name, contact_name, job_title, whatsapp, phone, email, city, country)')
        .eq('buyer_id', userProfile.id)
        .order('created_at', { ascending: false });
      if (accessData) {
        const normalized = accessData.map((row: any) => ({
          ...row,
          employer: Array.isArray(row.employer) ? row.employer[0] : row.employer,
        }));
        setAccessRows(normalized as DirectemAccessRow[]);
      }
    } catch (err: any) {
      console.error('Failed to load Directem data:', err);
      setError('Something went wrong while loading your dashboard.');
    } finally {
      setLoading(false);
    }
  };

  const handleUseGps = async () => {
    setGpsStatus('loading');
    const code = await detectCountryCodeFromGps();
    if (code) {
      setCountryCode(code);
      setGpsStatus('ready');
      return;
    }
    setGpsStatus('denied');
  };

  const packageCards = useMemo(() => {
    return packages.map((pkg) => {
      const localAmount = fxRate
        ? roundAmount(pkg.price_usd * fxRate, displayCurrency)
        : null;
      return { ...pkg, localAmount };
    });
  }, [packages, fxRate, displayCurrency]);

  const pendingPackages = useMemo(() => {
    return new Set(
      purchases.filter((purchase) => purchase.status === 'pending').map((purchase) => purchase.package_id)
    );
  }, [purchases]);

  const requestAccess = async (
    pkg: DirectemPackage,
    localAmount?: number | null,
    details?: RequestDetails
  ) => {
    if (!profile) return;
    setSubmittingPackage(pkg.id);
    setMessage('');
    setError('');

    const payloadDetails = details ?? {
      preferredJob: '',
      salaryExpectation: '',
      notes: '',
      paymentReference: '',
    };

    const payload = {
      buyer_id: profile.id,
      package_id: pkg.id,
      local_currency: displayCurrency,
      local_amount: localAmount ?? null,
      payment_reference: payloadDetails.paymentReference.trim() || null,
      preferred_job: payloadDetails.preferredJob.trim() || null,
      salary_expectation: payloadDetails.salaryExpectation.trim() || null,
      request_notes: payloadDetails.notes.trim() || null,
    };

    const { error: insertError } = await supabase
      .from('directem_purchases')
      .insert(payload);

    if (insertError) {
      setError(insertError.message || 'Failed to request access.');
      setSubmittingPackage(null);
      return;
    }

    setMessage('Access request submitted. Admin approval is required before contacts unlock.');
    setSubmittingPackage(null);
    loadAll();
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
        <div>
          <h1>Directem Marketplace</h1>
          <p>Welcome, {profile?.full_name || 'buyer'}. Unlock verified UAE employer contacts.</p>
        </div>
        <div className="page-actions">
          <span className="pill">Country: {countryCode || 'Unknown'}</span>
          <button className="ghost-button" onClick={handleUseGps}>
            {gpsStatus === 'loading' ? 'Locating...' : 'Use GPS'}
          </button>
        </div>
      </div>

      {currencyNote && <p className="note">{currencyNote}</p>}
      {error && <div className="alert error">{error}</div>}
      {message && <div className="alert success">{message}</div>}

      <div className="grid-two">
        <div className="stack">
          <section className="card">
            <div className="card-header">
              <h2>Choose your package</h2>
              <ShieldCheck size={18} />
            </div>
            <div className="package-grid">
              {packageCards.map((pkg) => (
                <div key={pkg.id} className="mini-card">
                  <div>
                    <p className="label">{pkg.name}</p>
                    <h3>{pkg.employer_count} employers</h3>
                  </div>
                  <div>
                    <p className="price">{formatCurrency(pkg.price_usd, 'USD')}</p>
                    {pkg.localAmount !== null && displayCurrency !== 'USD' && (
                      <p className="muted">≈ {formatCurrency(pkg.localAmount, displayCurrency)}</p>
                    )}
                  </div>
                  {pendingPackages.has(pkg.id) ? (
                    <div className="note">Pending approval. You can submit a new request once this is resolved.</div>
                  ) : (
                    <>
                      {paypalEnabled ? (
                        paidPackages[pkg.id] ? (
                          <div className="alert success">
                            Payment received. Reference: {paidPackages[pkg.id]}
                          </div>
                        ) : (
                          <PayPalCheckout
                            amount={pkg.price_usd}
                            currency="USD"
                            disabled={submittingPackage === pkg.id}
                            onApproved={(details) => {
                              const captureId =
                                details.capture?.purchase_units?.[0]?.payments?.captures?.[0]?.id;
                              const reference = captureId
                                ? `paypal_capture:${captureId}`
                                : `paypal_order:${details.orderId}`;
                              setPaidPackages((prev) => ({ ...prev, [pkg.id]: reference }));
                              setRequestDetails((prev) => ({
                                ...prev,
                                [pkg.id]: {
                                  ...(prev[pkg.id] ?? {
                                    preferredJob: '',
                                    salaryExpectation: '',
                                    notes: '',
                                    paymentReference: '',
                                  }),
                                  paymentReference: reference,
                                },
                              }));
                            }}
                          />
                        )
                      ) : (
                        <label className="muted">
                          Payment reference (required)
                          <input
                            className="input"
                            value={(requestDetails[pkg.id]?.paymentReference ?? '')}
                            onChange={(e) =>
                              setRequestDetails((prev) => ({
                                ...prev,
                                [pkg.id]: {
                                  ...(prev[pkg.id] ?? {
                                    preferredJob: '',
                                    salaryExpectation: '',
                                    notes: '',
                                    paymentReference: '',
                                  }),
                                  paymentReference: e.target.value,
                                },
                              }))
                            }
                            placeholder="Bank transfer ID or receipt"
                          />
                        </label>
                      )}

                      <div className="stack">
                        <label className="muted">
                          Preferred job
                          <input
                            className="input"
                            value={(requestDetails[pkg.id]?.preferredJob ?? '')}
                            onChange={(e) =>
                              setRequestDetails((prev) => ({
                                ...prev,
                                [pkg.id]: {
                                  ...(prev[pkg.id] ?? {
                                    preferredJob: '',
                                    salaryExpectation: '',
                                    notes: '',
                                    paymentReference: '',
                                  }),
                                  preferredJob: e.target.value,
                                },
                              }))
                            }
                            placeholder="e.g. Sales manager"
                          />
                        </label>
                        <label className="muted">
                          Salary expectation
                          <input
                            className="input"
                            value={(requestDetails[pkg.id]?.salaryExpectation ?? '')}
                            onChange={(e) =>
                              setRequestDetails((prev) => ({
                                ...prev,
                                [pkg.id]: {
                                  ...(prev[pkg.id] ?? {
                                    preferredJob: '',
                                    salaryExpectation: '',
                                    notes: '',
                                    paymentReference: '',
                                  }),
                                  salaryExpectation: e.target.value,
                                },
                              }))
                            }
                            placeholder="e.g. 5000 AED / month"
                          />
                        </label>
                        <label className="muted">
                          Notes for admin
                          <textarea
                            className="input input-textarea"
                            value={(requestDetails[pkg.id]?.notes ?? '')}
                            onChange={(e) =>
                              setRequestDetails((prev) => ({
                                ...prev,
                                [pkg.id]: {
                                  ...(prev[pkg.id] ?? {
                                    preferredJob: '',
                                    salaryExpectation: '',
                                    notes: '',
                                    paymentReference: '',
                                  }),
                                  notes: e.target.value,
                                },
                              }))
                            }
                            placeholder="Preferred cities, industries, or extra notes"
                          />
                        </label>
                      </div>

                      <button
                        className="primary-button"
                        onClick={() => requestAccess(pkg, pkg.localAmount, requestDetails[pkg.id])}
                        disabled={
                          submittingPackage === pkg.id ||
                          (paypalEnabled
                            ? !paidPackages[pkg.id]
                            : !(requestDetails[pkg.id]?.paymentReference ?? '').trim())
                        }
                      >
                        {submittingPackage === pkg.id ? 'Submitting...' : 'Submit request'}
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="card">
            <h2>Purchase history</h2>
            {purchases.length === 0 ? (
              <p className="muted">No purchases yet. Select a package to get started.</p>
            ) : (
              <div className="stack">
                {purchases.map((purchase) => (
                  <div key={purchase.id} className="history-row">
                    <div>
                      <p>{purchase.package?.name || 'Package'}</p>
                      <span className="muted">
                        Requested {new Date(purchase.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <span
                      className={`status ${purchase.status}`}
                    >
                      {purchase.status === 'active' && <CheckCircle size={14} />}
                      {purchase.status === 'pending' && <Clock size={14} />}
                      {purchase.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <section className="card">
          <div className="card-header">
            <h2>Your unlocked contacts</h2>
            <Globe2 size={18} />
          </div>
          {accessRows.length === 0 ? (
            <p className="muted">
              No unlocked contacts yet. Once an admin approves your purchase, contacts will appear here.
            </p>
          ) : (
            <div className="stack">
              {accessRows.map((row) => (
                <div key={row.id} className="contact-card">
                  <div>
                    <h3>{row.employer?.company_name || 'Employer'}</h3>
                    <p className="muted">
                      {row.employer?.contact_name || 'Contact'}
                      {row.employer?.job_title ? ` • ${row.employer.job_title}` : ''}
                      {row.employer?.city ? ` • ${row.employer.city}` : ''}
                    </p>
                  </div>
                  <div className="contact-actions">
                    {row.employer?.whatsapp && (
                      <a
                        href={`https://wa.me/${encodeURIComponent(row.employer.whatsapp)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="pill-link"
                      >
                        <MessageCircle size={14} />
                        WhatsApp
                      </a>
                    )}
                    {row.employer?.phone && (
                      <a href={`tel:${row.employer.phone}`} className="pill-link">
                        <PhoneCall size={14} />
                        Call
                      </a>
                    )}
                    {row.employer?.email && (
                      <span className="pill">{row.employer.email}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
