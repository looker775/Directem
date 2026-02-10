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
      <section className="hero">
        <div className="hero-copy fade-in">
          <span className="eyebrow">
            <BadgeCheck size={14} />
            UAE Employer Contacts
          </span>
          <h1>Directem unlocks verified employer contacts with WhatsApp-ready details.</h1>
          <p>
            Buy curated UAE employer lists, request access instantly, and receive approval from
            owner-approved admins. Built for recruiters, job seekers, and staffing teams.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" to="/register">
              Get started
              <ArrowRight size={16} />
            </Link>
            <Link className="secondary-button" to="/login">
              Sign in
            </Link>
          </div>
          <div className="hero-meta">
            <span>Verified contacts only</span>
            <span>Admin approvals required</span>
            <span>USD pricing with local estimates</span>
          </div>
        </div>
        <div className="hero-card fade-in delay-1">
          <div className="card-header">
            <div>
              <p className="label">Directem access</p>
              <h3>Trusted employer data</h3>
            </div>
            <span className="tag">Live</span>
          </div>
          <div className="feature-grid">
            {[
              {
                icon: ShieldCheck,
                title: 'Verified contacts',
                body: 'Admin-reviewed WhatsApp + phone numbers.',
              },
              {
                icon: Users,
                title: 'Buyer-only access',
                body: 'Contacts unlock after approval.',
              },
              {
                icon: Globe2,
                title: 'Local pricing view',
                body: 'USD with live currency estimates.',
              },
              {
                icon: Sparkles,
                title: 'Always refreshed',
                body: 'Admins update employers daily.',
              },
            ].map((item) => (
              <div key={item.title} className="mini-card">
                <item.icon size={20} />
                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="pricing">
        <div className="section-header fade-in">
          <div>
            <h2>Directem packages</h2>
            <p>Choose the employer bundle that matches your hiring goals.</p>
          </div>
          <div className="pricing-actions">
            <span className="pill">Country: {countryCode || 'Unknown'}</span>
            <button className="ghost-button" onClick={handleUseGps}>
              {gpsStatus === 'loading' ? 'Locating...' : 'Use GPS'}
            </button>
          </div>
        </div>

        {currencyNote && <p className="note">{currencyNote}</p>}

        <div className="pricing-grid">
          {pricingCards.map((pkg) => (
            <div key={pkg.id} className="pricing-card fade-in">
              <div>
                <p className="label">Package</p>
                <h3>{pkg.name}</h3>
                <p className="muted">
                  {pkg.employer_count} employer contacts with WhatsApp numbers.
                </p>
              </div>
              <div className="price-stack">
                <span className="price">{formatCurrency(pkg.price_usd, 'USD')}</span>
                {pkg.localAmount !== null && displayCurrency !== 'USD' && (
                  <span className="muted">≈ {formatCurrency(pkg.localAmount, displayCurrency)}</span>
                )}
              </div>
              <Link className="primary-button" to="/register">
                Request access
                <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="steps">
        <div className="step-card fade-in">
          <h3>1. Request a package</h3>
          <p>Pick 10, 20, or 30 employer contacts and submit your request.</p>
        </div>
        <div className="step-card fade-in delay-1">
          <h3>2. Admin approval</h3>
          <p>Owner-approved admins verify payment and unlock your access.</p>
        </div>
        <div className="step-card fade-in delay-2">
          <h3>3. Start outreach</h3>
          <p>Download your curated list with WhatsApp-ready contact details.</p>
        </div>
      </section>

      <section className="cta fade-in">
        <div>
          <h2>Ready to meet your next employer?</h2>
          <p>Directem keeps employer data protected while giving you instant outreach power.</p>
        </div>
        <Link className="primary-button" to="/register">
          Create your Directem account
          <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
