import { useEffect, useState } from 'react';
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

  const handleLangClick = (code: typeof languageOptions[number]['code']) => {
    try {
      window.localStorage.setItem('directem_lang', code);
      window.localStorage.setItem('directem_lang_manual', '1');
    } catch {
      // ignore storage errors
    }
    setLang(code);
    window.setTimeout(() => window.location.reload(), 50);
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
