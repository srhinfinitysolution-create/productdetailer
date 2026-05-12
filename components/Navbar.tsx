import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap, Moon, Sun, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Init theme state
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  const isActive = (path: string) => 
    location.pathname === path 
      ? 'text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1.5 rounded-lg' 
      : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium px-3 py-1.5 transition-colors';

  // Article pages should always have a solid navbar for better readability/layout
  const isArticlePage = ['/seo-generator', '/pricing-psychology', '/amazon-aplus'].includes(location.pathname);
  const showSolidNav = scrolled || isArticlePage;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${showSolidNav ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800/60 shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-2 rounded-xl shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
                <Zap className="h-5 w-5 text-white" fill="currentColor" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">ProductDetailer</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className={isActive('/')}>Home</Link>
            <Link to="/features" className={isActive('/features')}>Features</Link>
            <Link to="/pricing" className={isActive('/pricing')}>Pricing</Link>
            <Link to="/about" className={isActive('/about')}>About</Link>
            <Link to="/blog" className={isActive('/blog')}>Blog</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <User className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200 max-w-[150px] truncate">
                    {user.email}
                  </span>
                </div>
                <button 
                  onClick={signOut} 
                  className="text-slate-700 dark:text-slate-200 font-medium hover:text-red-600 dark:hover:text-red-400 transition-colors text-sm flex items-center gap-1"
                >
                  <LogOut className="w-4 h-4" /> Sign out
                </button>
                <Link to="/dashboard" className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-indigo-500 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Dashboard
                </Link>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-slate-700 dark:text-slate-200 font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Log in</Link>
                <Link to="/signup" className="bg-slate-900 dark:bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-slate-800 dark:hover:bg-indigo-500 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Get Started
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center md:hidden gap-4">
             <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white focus:outline-none p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shadow-xl absolute w-full">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <Link to="/" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-medium text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl">Home</Link>
            <Link to="/features" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-medium text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl">Features</Link>
            <Link to="/pricing" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-medium text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl">Pricing</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-medium text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl">About</Link>
            <Link to="/blog" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-medium text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl">Blog</Link>
            
            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
               {user ? (
                 <div className="space-y-3">
                    <div className="px-4 text-sm text-slate-500 dark:text-slate-400">Signed in as <span className="font-semibold text-slate-900 dark:text-white">{user.email}</span></div>
                    <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block text-center px-4 py-3 bg-indigo-600 text-white font-medium rounded-xl shadow-lg shadow-indigo-500/30">Dashboard</Link>
                    <button onClick={() => { signOut(); setIsOpen(false); }} className="block w-full text-center px-4 py-3 text-base font-medium text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 rounded-xl">Sign Out</button>
                 </div>
               ) : (
                 <div className="grid grid-cols-2 gap-4">
                    <Link to="/login" onClick={() => setIsOpen(false)} className="block text-center px-4 py-3 text-base font-medium text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 rounded-xl">Log in</Link>
                    <Link to="/signup" onClick={() => setIsOpen(false)} className="block text-center px-4 py-3 bg-indigo-600 text-white font-medium rounded-xl shadow-lg shadow-indigo-500/30">
                     Get Started
                   </Link>
                 </div>
               )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;