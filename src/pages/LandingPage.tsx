import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckSquare, 
  ArrowRight, 
  Shield, 
  Zap, 
  Users, 
  BarChart3,
  Github,
  Twitter,
  Linkedin
} from 'lucide-react';
import { motion } from 'motion/react';

const FeatureCard = ({ icon: Icon, title, desc }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-8 bg-slate-900 border border-slate-800 rounded-3xl hover:border-indigo-500/50 transition-all group"
  >
    <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
      <Icon className="w-6 h-6 text-indigo-400 group-hover:text-white" />
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{desc}</p>
  </motion.div>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500 selection:text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
              <CheckSquare className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight">TaskNova</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="px-5 py-2.5 text-sm font-bold text-slate-300 hover:text-white transition-colors">Log in</Link>
            <Link to="/signup" className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/20 transition-all">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/20 blur-[120px] rounded-full -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-bold uppercase tracking-widest mb-8">
              New: Real-time collaboration v2.0
            </span>
            <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tight leading-[1.1]">
              Manage teams like <br />
              <span className="bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent">a pro professional.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-slate-400 mb-12 leading-relaxed">
              The all-in-one platform for team projects, task tracking, and data-driven insights. Build faster and smarter with TaskNova.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/signup" className="w-full sm:w-auto px-10 py-5 bg-indigo-600 hover:bg-indigo-500 rounded-2xl text-lg font-bold shadow-2xl shadow-indigo-500/40 transition-all flex items-center justify-center gap-3 group">
                Start for Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link to="/login" className="w-full sm:w-auto px-10 py-5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl text-lg font-bold transition-all">
                View Live Demo
              </Link>
            </div>
          </motion.div>

          {/* Hero Image Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-24 relative p-4 bg-slate-900/50 backdrop-blur-2xl border border-white/10 rounded-[40px] shadow-2xl"
          >
             <div className="rounded-[32px] overflow-hidden border border-slate-800 aspect-[16/9] bg-slate-950 flex items-center justify-center">
                <div className="text-slate-800 font-bold text-4xl italic">App Dashboard Mockup</div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">Powerful features for high-performance teams</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Everything you need to manage workloads, track progress, and hit your deadlines.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Zap} 
              title="Real-time Updates" 
              desc="Stay in sync with your team instantly. Every change is reflected across all devices in real-time."
            />
            <FeatureCard 
              icon={BarChart3} 
              title="Advanced Analytics" 
              desc="Deep dive into your team's productivity with interactive charts and comprehensive project reports."
            />
            <FeatureCard 
              icon={Users} 
              title="Team Management" 
              desc="Easily add members, assign roles, and manage permissions with our intuitive workspace controls."
            />
            <FeatureCard 
              icon={Shield} 
              title="Enterprise Security" 
              desc="Your data is protected with bank-grade encryption and secure access controls at every level."
            />
             <FeatureCard 
              icon={CheckSquare} 
              title="Task Management" 
              desc="Create tasks, set priorities, and assign deadlines. Track progress from todo to completed."
            />
             <FeatureCard 
              icon={ArrowRight} 
              title="Project Workflows" 
              desc="Customize your workflow to match your team's process. Agile, Kanban, or simple lists."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-slate-950 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <CheckSquare className="text-white w-5 h-5" />
              </div>
              <span className="text-lg font-bold tracking-tight">TaskNova</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              The world's most advanced team task manager. Built for speed, precision, and collaboration.
            </p>
            <div className="flex items-center gap-4 text-slate-500">
              <Github className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
              <Twitter className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
              <Linkedin className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li className="hover:text-white cursor-pointer transition-colors">Features</li>
              <li className="hover:text-white cursor-pointer transition-colors">Integrations</li>
              <li className="hover:text-white cursor-pointer transition-colors">Pricing</li>
              <li className="hover:text-white cursor-pointer transition-colors">Changelog</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-white cursor-pointer transition-colors">Blog</li>
              <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer transition-colors">Terms of Service</li>
              <li className="hover:text-white cursor-pointer transition-colors">Security</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-slate-900 text-center text-sm text-slate-600">
          © 2026 TaskNova Inc. All rights reserved. Built with ❤️ for productive teams.
        </div>
      </footer>
    </div>
  );
}
