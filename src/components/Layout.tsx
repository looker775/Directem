import { useEffect, useMemo, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Menu, User, X } from 'lucide-react';
import { getUserProfile, signOut, type Profile } from '../lib/supabase';
import { useI18n } from '../context/I18nContext';

export default function Layout() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t, lang, setLang } = useI18n();

  const publicLinks = [
    { path: '/#pricing', label: t('Pricing') },
    { path: '/login', label: t('Sign in') },
    { path: '/register', label: t('Register') },
  ];

  useEffect(() => {
    let active = true;
    const load = async () => {
      const nextProfile = await getUserProfile();
      if (!active) return;
      setProfile(nextProfile);
    };
    load();
    return () => {
      active = false;
    };
  }, [location.pathname]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const roleLinks = () => {
    if (!profile) return [];
    if (profile.role === 'owner') {
      return [
        { path: '/owner', label: t('Owner') },
        { path: '/admin', label: t('Admin workspace') },
      ];
    }
    if (profile.role === 'admin') {
      return [{ path: '/admin', label: t('Admin workspace') }];
    }
    if (profile.role === 'buyer') {
      return [{ path: '/buyer', label: t('Marketplace') }];
    }
    return [];
  };

  const navLinks = profile ? roleLinks() : publicLinks;
  const languageOptions = [
    { code: 'en', label: 'EN' },
    { code: 'ru', label: 'RU' },
    { code: 'ar', label: 'AR' },
  ] as const;

  const showLangDebug = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('debugLang') === '1';
  }, [location.search]);

  const langDebug = useMemo(() => {
    if (!showLangDebug) return null;
    let storedLang = '-';
    let manual = '-';
    let country = '-';
    try {
      storedLang = window.localStorage.getItem('directem_lang') ?? '-';
      manual = window.localStorage.getItem('directem_lang_manual') ?? '-';
      country = window.localStorage.getItem('directem_country') ?? '-';
    } catch {
      // ignore storage errors
    }
    const urlLang = new URLSearchParams(location.search).get('lang') ?? '-';
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '-';
    return { storedLang, manual, country, urlLang, tz };
  }, [showLangDebug, location.search, lang]);

  const handleLangClick = (code: typeof languageOptions[number]['code']) => {
    try {
      window.localStorage.setItem('directem_lang', code);
      window.localStorage.setItem('directem_lang_manual', '1');
    } catch {
      // ignore storage errors
    }
    setLang(code);
    const url = new URL(window.location.href);
    url.searchParams.set('lang', code);
    window.location.href = url.toString();
  };

  return (
    <div className="app-shell">
      <nav className="app-nav">
        <div className="container nav-inner">
          <Link to="/" className="brand">
            <img src="/logo.png" alt="Directem logo" className="brand-logo" />
            <span className="brand-mark">Directem</span>
          </Link>

          {navLinks.length > 0 && (
            <div className="nav-links desktop-only">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          <div className="nav-actions desktop-only">
            <div className="lang-switch" role="group" aria-label={t('Language')}>
              {languageOptions.map((option) => (
                <button
                  key={option.code}
                  type="button"
                  className={`lang-button ${lang === option.code ? 'active' : ''}`}
                  onClick={() => handleLangClick(option.code)}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {langDebug && (
              <div className="lang-debug">
                <span>lang:</span> {lang} ? <span>url:</span> {langDebug.urlLang} ?{' '}
                <span>stored:</span> {langDebug.storedLang} ? <span>manual:</span> {langDebug.manual} ?{' '}
                <span>country:</span> {langDebug.country} ? <span>tz:</span> {langDebug.tz}
              </div>
            )}
            {profile && (
              <div className="profile-pill">
                <User size={16} />
                <span>{profile.full_name || profile.email || t('Account')}</span>
                <span className="tag">{t(profile.role === 'owner' ? 'Owner' : profile.role === 'admin' ? 'Admin' : 'Buyer')}</span>
              </div>
            )}
            {profile && (
              <button className="ghost-button" onClick={handleSignOut}>
                <LogOut size={16} />
                {t('Sign out')}
              </button>
            )}
          </div>

          {navLinks.length > 0 && (
            <button
              className="icon-button mobile-only"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
        </div>

        {menuOpen && navLinks.length > 0 && (
          <div className="mobile-menu">
            <div className="container">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="lang-switch mobile">
                {languageOptions.map((option) => (
                  <button
                    key={option.code}
                    type="button"
                    className={`lang-button ${lang === option.code ? 'active' : ''}`}
                    onClick={() => handleLangClick(option.code)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              {profile && (
                <button className="ghost-button" onClick={handleSignOut}>
                  <LogOut size={16} />
                  {t('Sign out')}
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
