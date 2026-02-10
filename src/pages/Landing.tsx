import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, Globe2, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { detectCountryCode, detectCountryCodeFromGps } from '../lib/geo';
import { formatCurrency, getExchangeRate, resolveCurrencyForCountry, roundAmount } from '../lib/currency';

interface DirectemPackage {
  id: string;
  name: string;
  employer_count: number;
  price_usd: number;
  is_active: boolean;
}

const metricCards = [
  { label: 'Bundles', value: '10 / 20 / 30', icon: Users },
  { label: 'Verification', value: 'Owner-approved admins', icon: ShieldCheck },
  { label: 'Coverage', value: 'UAE employers only', icon: Globe2 },
  { label: 'Updates', value: 'Fresh entries daily', icon: Sparkles },
];

const ledgerEntries = [
  { company: 'Harborline Logistics', contact: 'Hiring Desk', city: 'Dubai' },
  { company: 'Desert Bloom Hospitality', contact: 'HR Operations', city: 'Abu Dhabi' },
  { company: 'Gulfline Trading Group', contact: 'Talent Desk', city: 'Sharjah' },
];

export default function Landing() {
  const [packages, setPackages] = useState<DirectemPackage[]>([]);
  const [countryCode, setCountryCode] = useState<string | undefined>();
  const [displayCurrency, setDisplayCurrency] = useState('USD');
  const [fxRate, setFxRate] = useState<number | null>(null);
  const [currencyNote, setCurrencyNote] = useState('');
  const [gpsStatus, setGpsStatus] = useState<'idle' | 'loading' | 'ready' | 'denied'>('idle');

  useEffect(() => {
    let active = true;
    const loadPackages = async () => {
      const { data } = await supabase
        .from('directem_packages')
        .select('*')
        .eq('is_active', true)
        .order('employer_count', { ascending: true });
      if (active && data) setPackages(data as DirectemPackage[]);
    };
    loadPackages();
    return () => {
      active = false;
    };
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

  const pricingCards = useMemo(() => {
    return packages.map((pkg) => {
      const localAmount = fxRate
        ? roundAmount(pkg.price_usd * fxRate, displayCurrency)
        : null;
      return {
        ...pkg,
        localAmount,
      };
    });
  }, [packages, fxRate, displayCurrency]);

  return (
    <div className="page">
      <section className="signal-bar fade-in glass-panel">
        <div className="signal-track">
          <span>UAE-only employers</span>
          <span>Owner-approved admin access</span>
          <span>WhatsApp-ready contacts</span>
          <span>Local currency estimates</span>
          <span>Manual approval required</span>
        </div>
      </section>

      <section className="hero-variant hero-ambient">
        <div className="hero-left fade-in">
          <span className="eyebrow">
            <BadgeCheck size={14} />
            Directem Verified Ledger
          </span>
          <h1>Turn UAE employer data into an approval-gated hiring advantage.</h1>
          <p>
            Directem is a curated, owner-controlled employer ledger. Buyers request access packages,
            admins verify payment, and contacts unlock only after approval.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" to="/register">
              Request access
              <ArrowRight size={16} />
            </Link>
            <Link className="secondary-button" to="/login">
              Sign in
            </Link>
          </div>
          <div className="metrics-grid">
            {metricCards.map((metric) => (
              <div key={metric.label} className="metric-card">
                <metric.icon size={18} />
                <div>
                  <p className="label">{metric.label}</p>
                  <p className="metric-value">{metric.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-right">
          <div className="ledger-card fade-in delay-1 float-slow glow-card">
            <div className="card-header">
              <div>
                <p className="label">Directem ledger</p>
                <h3>Verified employer entries</h3>
              </div>
              <span className="tag">Protected</span>
            </div>
            <div className="ledger-body">
              {ledgerEntries.map((entry) => (
                <div key={entry.company} className="ledger-row">
                  <div>
                    <p className="ledger-title">{entry.company}</p>
                    <p className="muted">
                      {entry.contact} • {entry.city}
                    </p>
                  </div>
                  <div className="ledger-tags">
                    <span className="data-tag">WhatsApp</span>
                    <span className="data-tag">Verified</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="side-card fade-in delay-2 glass-panel">
            <h4>Approval gate</h4>
            <p>
              Admins only access the database after the owner approves them. Buyers unlock contacts
              after payment verification and approval.
            </p>
            <div className="side-grid">
              <div>
                <p className="label">Access control</p>
                <p className="metric-value">Owner & Admin</p>
              </div>
              <div>
                <p className="label">Buyer unlock</p>
                <p className="metric-value">After approval</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="pricing-variant">
        <div className="section-header">
          <div>
            <h2>Directem packages</h2>
            <p>Pick the employer bundle that fits your hiring target.</p>
          </div>
          <div className="pricing-actions">
            <span className="pill">Country: {countryCode || 'Unknown'}</span>
            <button className="ghost-button" onClick={handleUseGps}>
              {gpsStatus === 'loading' ? 'Locating...' : 'Use GPS'}
            </button>
          </div>
        </div>

        {currencyNote && <p className="note">{currencyNote}</p>}

        <div className="pricing-layout">
          <div className="pricing-table">
            <div className="pricing-row header">
              <span>Package</span>
              <span>Employers</span>
              <span>USD</span>
              <span>Local</span>
              <span></span>
            </div>
            {pricingCards.map((pkg) => (
              <div key={pkg.id} className="pricing-row">
                <div className="pricing-cell">
                  <p className="label">{pkg.name}</p>
                </div>
                <div className="pricing-cell">
                  <p className="metric-value">{pkg.employer_count}</p>
                </div>
                <div className="pricing-cell">
                  <p className="metric-value">{formatCurrency(pkg.price_usd, 'USD')}</p>
                </div>
                <div className="pricing-cell">
                  <p className="muted">
                    {pkg.localAmount !== null && displayCurrency !== 'USD'
                      ? `≈ ${formatCurrency(pkg.localAmount, displayCurrency)}`
                      : '—'}
                  </p>
                </div>
                <div className="pricing-cell">
                  <Link className="ghost-button small" to="/register">
                    Request
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="pricing-side">
            <div className="side-card">
              <h4>What you receive</h4>
              <p>
                Every package unlocks curated UAE employer contacts with WhatsApp numbers, phone
                lines, and verified company names.
              </p>
            </div>
            <div className="side-card">
              <h4>Approval workflow</h4>
              <p>
                Submit your package request, include a payment reference, and wait for admin
                approval. Contacts unlock instantly after approval.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="workflow">
        <div>
          <h2>How access works</h2>
          <p>Directem keeps employer data protected while giving you fast access.</p>
        </div>
        <div className="workflow-grid">
          {[
            {
              title: 'Request your bundle',
              body: 'Choose 10, 20, or 30 employer contacts and submit your request.',
            },
            {
              title: 'Owner-approved review',
              body: 'Admins verify payments and unlock access after approval.',
            },
            {
              title: 'Start outreach',
              body: 'Use the WhatsApp-ready contacts inside your Directem dashboard.',
            },
          ].map((step, index) => (
            <div key={step.title} className="workflow-step">
              <span className="step-index">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-variant glow-sweep">
        <div>
          <h2>Launch your Directem access today</h2>
          <p>Secure employer data, clear pricing, and fast approvals in one place.</p>
        </div>
        <Link className="primary-button" to="/register">
          Create your Directem account
          <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
