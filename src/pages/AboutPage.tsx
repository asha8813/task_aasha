import React from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Target, 
  Lightbulb, 
  ShieldCheck, 
  CheckCircle2, 
  Twitter, 
  Linkedin, 
  Github,
  Zap,
  Globe,
  BarChart3,
  MessageSquare
} from 'lucide-react';
import MarketingNavbar from '../components/MarketingNavbar.tsx';
import MarketingFooter from '../components/MarketingFooter.tsx';

const stats = [
  { label: 'Active Users', value: '10K+', icon: Users },
  { label: 'Tasks Managed', value: '25K+', icon: Zap },
  { label: 'Global Teams', value: '2K+', icon: Globe },
  { label: 'Uptime', value: '99.9%', icon: ShieldCheck }
];

const team = [
  { 
    name: 'Sarah Jenkins', 
    role: 'CEO & Founder', 
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    bio: 'Former Engineering VP at TopTech, obsessed with operational efficiency.'
  },
  { 
    name: 'David Chen', 
    role: 'Head of Product', 
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    bio: 'Design system advocate and product veteran with 15 years experience.'
  },
  { 
    name: 'Elena Rodriguez', 
    role: 'Lead Architect', 
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop',
    bio: 'Infrastructure specialist focusing on real-time data sync and security.'
  },
  { 
    name: 'Marcus Thorne', 
    role: 'Chief Analytics Officer', 
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    bio: 'Data scientist turned builder, creating insights that teams actually use.'
  }
];

const features = [
  { title: 'Team Collaboration', desc: 'Work synchronously with your team across multiple projects and timezones.', icon: Users, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
  { title: 'Smart Task Management', desc: 'Context-aware task prioritization that learns from your team habits.', icon: Target, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { title: 'Productivity Analytics', desc: 'Real-time dashboards that highlight bottlenecks before they stall progress.', icon: BarChart3, color: 'text-sky-400', bg: 'bg-sky-500/10' },
  { title: 'Real-Time Updates', desc: 'No more refreshing. Changes are reflected instantly for everyone on the team.', icon: Zap, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { title: 'Secure Workspace', desc: 'Bank-grade encryption protecting every message, file, and project detail.', icon: ShieldCheck, color: 'text-rose-400', bg: 'bg-rose-500/10' },
  { title: 'AI Assistant', desc: 'AI-powered task generation and summary tools to save hours every single day.', icon: Lightbulb, color: 'text-purple-400', bg: 'bg-purple-500/10' }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <MarketingNavbar />

      <main>
        {/* Hero Section */}
        <section className="relative pt-40 pb-20 overflow-hidden bg-slate-950">
           <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-600/10 blur-[120px] rounded-full -translate-y-1/2" />
           <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-black uppercase tracking-widest mb-8">
                  <CheckCircle2 className="w-4 h-4" />
                  Our Mission
                </div>
                <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight leading-tight">
                  Empowering Teams To <br />
                  <span className="text-indigo-500">Work Smarter.</span>
                </h1>
                <p className="max-w-2xl mx-auto text-slate-400 text-xl font-medium leading-relaxed mb-10">
                  TaskNova was built with a simple goal: to remove the friction from collaborative work so teams can focus on innovation.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button className="w-full sm:w-auto px-10 py-5 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-indigo-600/20 transition-all">Join the Revolution</button>
                  <button className="w-full sm:w-auto px-10 py-5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl font-black uppercase tracking-widest text-sm transition-all">Read Documentation</button>
                </div>
              </motion.div>
           </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 border-y border-slate-900 bg-slate-950/50">
           <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, idx) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center group"
                >
                  <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-all">
                     <stat.icon className="w-6 h-6 text-indigo-400 group-hover:text-white" />
                  </div>
                  <h4 className="text-4xl font-black text-white mb-2">{stat.value}</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{stat.label}</p>
                </motion.div>
              ))}
           </div>
        </section>

        {/* Story Section */}
        <section className="py-32 bg-slate-950">
           <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col lg:flex-row gap-20 items-center">
                 <div className="lg:w-1/2">
                    <h2 className="text-4xl font-bold mb-8 tracking-tight">The Story behind <span className="text-indigo-500">TaskNova</span></h2>
                    <div className="space-y-6 text-slate-400 text-lg leading-relaxed font-medium">
                       <p>
                         In 2024, our founders noticed that the "top" project management tools had become bloated, slow, and distracting. Teams were spending more time managing their tools than their actual projects.
                       </p>
                       <p>
                         We set out to build TaskNova—a high-density operational workspace that prioritizes speed, clarity, and automation. We believe that a professional tool should be powerful enough to handle complexity but invisible enough to let people work.
                       </p>
                       <div className="pt-6 grid grid-cols-2 gap-8">
                          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
                             <h4 className="text-white font-bold text-xl mb-2">Our Goal</h4>
                             <p className="text-sm text-slate-500">Automate 50% of manual task management by 2027.</p>
                          </div>
                          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
                             <h4 className="text-white font-bold text-xl mb-2">Our Focus</h4>
                             <p className="text-sm text-slate-500">Real-time performance at scale, always.</p>
                          </div>
                       </div>
                    </div>
                 </div>
                 <div className="lg:w-1/2 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 blur-[100px] rounded-full" />
                    <div className="grid grid-cols-2 gap-4 relative z-10">
                       <div className="space-y-4 pt-12">
                          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400" className="w-full h-64 object-cover rounded-3xl border border-white/5 shadow-2xl" alt="Team" />
                          <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400" className="w-full h-48 object-cover rounded-3xl border border-white/5 shadow-2xl" alt="Workshop" />
                       </div>
                       <div className="space-y-4">
                          <img src="https://images.unsplash.com/photo-1542744173-8e0ee26df199?w=400" className="w-full h-48 object-cover rounded-3xl border border-white/5 shadow-2xl" alt="Office" />
                          <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400" className="w-full h-64 object-cover rounded-3xl border border-white/5 shadow-2xl" alt="Meeting" />
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Features Overview */}
        <section className="py-32 border-t border-slate-900 bg-slate-950">
           <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-20">
                 <h2 className="text-4xl font-bold mb-4">The core of productivity</h2>
                 <p className="text-slate-500 max-w-xl mx-auto font-medium">We've spent thousands of hours refining the features that actually make a difference in day-to-day operations.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {features.map((feature, idx) => (
                    <motion.div 
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-8 bg-slate-900 border border-slate-800 rounded-[32px] hover:border-slate-700 transition-all group"
                    >
                       <div className={`w-12 h-12 ${feature.bg} rounded-2xl flex items-center justify-center mb-6`}>
                          <feature.icon className={`w-6 h-6 ${feature.color}`} />
                       </div>
                       <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                       <p className="text-slate-500 text-sm leading-relaxed font-bold">{feature.desc}</p>
                    </motion.div>
                 ))}
              </div>
           </div>
        </section>

        {/* Team Section */}
        <section className="py-32 bg-slate-950/50">
           <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-20">
                 <h2 className="text-4xl font-bold mb-4 tracking-tight">Meet the Architects</h2>
                 <p className="text-slate-500 max-w-xl mx-auto font-medium leading-relaxed">A specialized team of engineers, designers, and data scientists building the future of work.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                 {team.map((member, idx) => (
                    <motion.div 
                      key={member.name}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group"
                    >
                       <div className="relative mb-6 overflow-hidden aspect-square rounded-[32px]">
                          <img src={member.avatar} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={member.name} />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                             <div className="flex gap-4">
                                <Twitter className="w-5 h-5 text-white/50 hover:text-white transition-colors cursor-pointer" />
                                <Linkedin className="w-5 h-5 text-white/50 hover:text-white transition-colors cursor-pointer" />
                             </div>
                          </div>
                       </div>
                       <h4 className="text-xl font-bold text-white mb-1">{member.name}</h4>
                       <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-3">{member.role}</p>
                       <p className="text-sm text-slate-500 font-medium leading-relaxed">{member.bio}</p>
                    </motion.div>
                 ))}
              </div>
           </div>
        </section>

        {/* Testimonials */}
        <section className="py-32 bg-slate-950">
           <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 {[
                   { quote: "TaskNova transformed our coordination. We moved from 3 separate tools to one unified workspace.", author: "James Wilson", role: "CTO @ Flux" },
                   { quote: "The speed is unmatched. In-memory data sync means we never wait for load states.", author: "Sarah Li", role: "Product Mgr @ Neotech" },
                   { quote: "Best operational tool we've used. It's clean, fast, and does exactly what it says.", author: "Mike Ross", role: "COO @ Apex" }
                 ].map((t, idx) => (
                    <motion.div 
                       key={idx}
                       initial={{ opacity: 0, scale: 0.95 }}
                       whileInView={{ opacity: 1, scale: 1 }}
                       className="p-10 bg-slate-900 border border-slate-800 rounded-3xl relative"
                    >
                       <MessageSquare className="w-8 h-8 text-indigo-500/20 absolute top-8 right-8" />
                       <p className="text-xl font-bold text-white mb-8 italic leading-relaxed">"{t.quote}"</p>
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-indigo-400">
                             {t.author[0]}
                          </div>
                          <div>
                             <h4 className="text-sm font-bold text-white">{t.author}</h4>
                             <p className="text-xs text-slate-500 font-medium">{t.role}</p>
                          </div>
                       </div>
                    </motion.div>
                 ))}
              </div>
           </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6">
           <div className="max-w-5xl mx-auto text-center px-8 py-20 bg-gradient-to-b from-indigo-600 to-indigo-900 rounded-[64px] border border-white/10 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
               <div className="relative z-10">
                 <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">Ready to build your <br /> future workspace?</h2>
                 <p className="text-indigo-100 text-lg mb-12 max-w-xl mx-auto font-medium">Join thousands of teams who have already switched to TaskNova and never look back.</p>
                 <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <button className="w-full sm:w-auto px-12 py-5 bg-white text-indigo-700 rounded-2xl font-black hover:bg-slate-50 transition-all uppercase tracking-widest text-sm shadow-xl shadow-indigo-950/20">Get Started Now</button>
                    <button className="w-full sm:w-auto px-12 py-5 bg-indigo-500/30 border-2 border-white/20 text-white rounded-2xl font-black hover:bg-indigo-500/40 transition-all uppercase tracking-widest text-sm">Join our Community</button>
                 </div>
               </div>
           </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
