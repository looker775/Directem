import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Menu, User, X } from 'lucide-react';
import { getUserProfile, signOut, type Profile } from '../lib/supabase';

const publicLinks = [
  { path: '/#pricing', label: 'Pricing' },
  { path: '/login', label: 'Sign in' },
  { path: '/register', label: 'Register' },
];

export default function Layout() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
        { path: '/owner', label: 'Owner' },
        { path: '/admin', label: 'Admin workspace' },
      ];
    }
    if (profile.role === 'admin') {
      return [{ path: '/admin', label: 'Admin workspace' }];
    }
    if (profile.role === 'buyer') {
      return [{ path: '/buyer', label: 'Marketplace' }];
    }
    return [];
  };

  const navLinks = profile ? roleLinks() : publicLinks;

  return (
    <div className="app-shell">
      <nav className="app-nav">
        <div className="container nav-inner">
          <Link to="/" className="brand">
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
            {profile && (
              <div className="profile-pill">
                <User size={16} />
                <span>{profile.full_name || profile.email || 'Account'}</span>
                <span className="tag">{profile.role}</span>
              </div>
            )}
            {profile && (
              <button className="ghost-button" onClick={handleSignOut}>
                <LogOut size={16} />
                Sign out
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
              {profile && (
                <button className="ghost-button" onClick={handleSignOut}>
                  <LogOut size={16} />
                  Sign out
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
