import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckSquare, Menu, X, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils.ts';
import { useAuth } from '../context/AuthContext.tsx';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Features', path: '/#features' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'About', path: '/about' },
];

export default function MarketingNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle hash scrolling
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  const isActive = (path: string) => {
    if (path.includes('#')) {
      const base = path.split('#')[0] || '/';
      const hash = path.split('#')[1];
      return location.pathname === base && location.hash === `#${hash}`;
    }
    return location.pathname === path && !location.hash;
  };

  return (
    <nav 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b",
        scrolled 
          ? "bg-slate-950/80 backdrop-blur-xl border-slate-800/50 py-4" 
          : "bg-transparent border-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform">
            <CheckSquare className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">TaskNova</span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-white",
                isActive(link.path) ? "text-white" : "text-slate-400"
              )}
            >
              {link.name}
              {isActive(link.path) && (
                <motion.div 
                  layoutId="nav-underline"
                  className="h-0.5 bg-indigo-500 mt-1 rounded-full"
                />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <Link 
              to="/dashboard" 
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm font-bold text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="px-5 py-2.5 text-sm font-bold text-slate-300 hover:text-white transition-colors">Log in</Link>
              <Link 
                to="/signup" 
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm font-bold text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900 border-b border-slate-800 overflow-hidden"
          >
            <div className="px-6 py-8 space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block text-lg font-medium",
                    isActive(link.path) ? "text-white" : "text-slate-400"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-6 space-y-4 border-t border-slate-800">
                {user ? (
                  <Link 
                    to="/dashboard" 
                    className="block w-full py-4 text-center font-bold text-white rounded-xl bg-indigo-600 shadow-lg shadow-indigo-500/20"
                    onClick={() => setIsOpen(false)}
                  >
                    Go to Dashboard
                  </Link>
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      className="block w-full py-4 text-center font-bold text-slate-300 rounded-xl bg-slate-800"
                      onClick={() => setIsOpen(false)}
                    >
                      Log in
                    </Link>
                    <Link 
                      to="/signup" 
                      className="block w-full py-4 text-center font-bold text-white rounded-xl bg-indigo-600 shadow-lg shadow-indigo-500/20"
                      onClick={() => setIsOpen(false)}
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
