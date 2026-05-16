import React from 'react';
import { Link } from 'react-router-dom';
import { CheckSquare, Github, Twitter, Linkedin } from 'lucide-react';

export default function MarketingFooter() {
  return (
    <footer className="py-20 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-slate-400">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <CheckSquare className="text-white w-5 h-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">TaskNova</span>
          </div>
          <p className="text-sm leading-relaxed">
            The world's most advanced team task manager. Built for speed, precision, and collaboration.
          </p>
          <div className="flex items-center gap-4">
            <Github className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
            <Twitter className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
            <Linkedin className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 text-white text-sm uppercase tracking-widest">Product</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/#features" className="hover:text-white transition-colors">Features</Link></li>
            <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
            <li className="hover:text-white cursor-pointer transition-colors">Integrations</li>
            <li className="hover:text-white cursor-pointer transition-colors">API Docs</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-white text-sm uppercase tracking-widest">Company</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
            <li className="hover:text-white cursor-pointer transition-colors">Blog</li>
            <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-white text-sm uppercase tracking-widest">Support</h4>
          <ul className="space-y-4 text-sm">
            <li className="hover:text-white cursor-pointer transition-colors">Help Center</li>
            <li className="hover:text-white cursor-pointer transition-colors">Community</li>
            <li className="hover:text-white cursor-pointer transition-colors">Terms</li>
            <li className="hover:text-white cursor-pointer transition-colors">Privacy</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600 font-medium">
        <p>© 2026 TaskNova Inc. All rights reserved.</p>
        <p>Built with ❤️ for productive teams worldwide.</p>
      </div>
    </footer>
  );
}
