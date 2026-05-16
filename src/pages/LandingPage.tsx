import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckSquare, 
  ArrowRight, 
  Shield, 
  Zap, 
  Users, 
  BarChart3,
  Layout,
  MessageSquare,
  Bell,
  Cpu,
  LineChart,
  Layers,
  Search,
  Plus,
  Filter,
  CheckCircle2,
  Clock,
  MoreVertical
} from 'lucide-react';
import { motion } from 'motion/react';
import MarketingNavbar from '../components/MarketingNavbar.tsx';
import MarketingFooter from '../components/MarketingFooter.tsx';
import { cn } from '../lib/utils.ts';

const FeatureCard = ({ icon: Icon, title, desc, color, bg }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-8 bg-slate-900 border border-slate-800 rounded-[32px] hover:border-slate-700 transition-all group relative overflow-hidden"
  >
    <div className={`w-12 h-12 ${bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
      <Icon className={`w-6 h-6 ${color}`} />
    </div>
    <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{title}</h3>
    <p className="text-slate-500 font-medium leading-relaxed text-sm">{desc}</p>
    
    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.div>
);

const StepCard = ({ number, title, desc }: any) => (
  <div className="flex flex-col items-center text-center px-4">
    <div className="w-16 h-16 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center mb-8 relative font-black text-2xl text-indigo-500">
      {number}
      <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden lg:block">
         <ArrowRight className="w-6 h-6 text-slate-800" />
      </div>
    </div>
    <h4 className="text-xl font-bold text-white mb-4 tracking-tight">{title}</h4>
    <p className="text-slate-500 font-medium text-sm leading-relaxed">{desc}</p>
  </div>
);

// Mock Dashboard Components for Preview
const PreviewStat = ({ label, value, trend, color }: any) => (
  <div className="p-4 bg-slate-950/50 border border-white/5 rounded-2xl">
    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{label}</p>
    <div className="flex items-baseline justify-between">
      <h5 className="text-xl font-black text-white">{value}</h5>
      <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded", color)}>{trend}</span>
    </div>
  </div>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500 selection:text-white">
      <MarketingNavbar />

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 overflow-hidden bg-slate-950">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-indigo-600/20 blur-[130px] rounded-full -z-10 animate-pulse"></div>
        
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
              <Zap className="w-3.5 h-3.5" />
              The Future of Operational Work
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[1.05]">
              Accelerate your <br />
              <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-indigo-400 bg-[length:200%_auto] animate-gradient text-transparent bg-clip-text">team's momentum.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-slate-400 mb-12 leading-relaxed font-medium bg-gradient-to-b from-slate-300 to-slate-500 bg-clip-text text-transparent">
              TaskNova is the high-density workspace that empowers high-performance teams to track, analyze, and execute complex workflows in real-time.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/signup" className="w-full sm:w-auto px-10 py-5 bg-indigo-600 hover:bg-slate-50 hover:text-indigo-600 rounded-2xl text-lg font-black uppercase tracking-widest shadow-2xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-3 group">
                Initialize TaskNova
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link to="/login" className="w-full sm:w-auto px-10 py-5 bg-slate-900/50 backdrop-blur-xl border border-slate-800 hover:border-slate-700 hover:bg-slate-900 rounded-2xl text-lg font-black uppercase tracking-widest transition-all">
                Access System
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Preview Section (Replacement of large empty placeholder) */}
      <section className="mb-48 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-1 lg:p-2 bg-gradient-to-br from-indigo-500/20 via-slate-800/20 to-sky-500/20 rounded-[48px] backdrop-blur-3xl border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]"
          >
             <div className="rounded-[40px] overflow-hidden bg-slate-950 border border-slate-800 shadow-inner flex flex-col lg:flex-row h-[700px]">
                {/* Sidebar Preview */}
                <div className="w-64 border-r border-slate-900 p-6 hidden lg:flex flex-col gap-8 bg-slate-950/50">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                         <CheckSquare className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm font-black uppercase tracking-widest">TaskNova</span>
                   </div>
                   <div className="space-y-4">
                      {['Projects', 'Global Tasks', 'Team Matrix', 'Analytics', 'System Settings'].map((item, i) => (
                        <div key={item} className={cn("flex items-center gap-3 p-2 rounded-lg transition-colors", i === 0 ? "bg-indigo-600/10 text-indigo-400" : "text-slate-600 hover:text-slate-400")}>
                           <div className="w-2 h-2 rounded-full bg-current opacity-40"></div>
                           <span className="text-xs font-bold uppercase tracking-wider">{item}</span>
                        </div>
                      ))}
                   </div>
                </div>

                {/* Main Content Preview */}
                <div className="flex-1 flex flex-col min-w-0 bg-slate-950">
                   {/* Top Bar */}
                   <div className="h-16 border-b border-slate-900 px-8 flex items-center justify-between">
                      <div className="flex items-center gap-4 text-slate-500">
                         <Search className="w-4 h-4" />
                         <span className="text-xs font-bold uppercase tracking-widest">Search global workspace...</span>
                      </div>
                      <div className="flex items-center gap-4">
                         <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
                            <Plus className="w-4 h-4 text-slate-500" />
                         </div>
                         <div className="w-8 h-8 rounded-lg bg-indigo-600 border border-indigo-500 text-white flex items-center justify-center overflow-hidden font-black text-xs">
                            AS
                         </div>
                      </div>
                   </div>

                   <div className="flex-1 p-8 overflow-y-auto scrollbar-hide">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                         <PreviewStat label="Active Velocity" value="84%" trend="+12%" color="bg-emerald-500/10 text-emerald-500" />
                         <PreviewStat label="Tasks Resolved" value="1,248" trend="+240" color="bg-indigo-500/10 text-indigo-500" />
                         <PreviewStat label="System Health" value="Stable" trend="Optimal" color="bg-sky-500/10 text-sky-500" />
                         <PreviewStat label="Resource Load" value="62/100" trend="-4%" color="bg-amber-500/10 text-amber-500" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                         <div className="md:col-span-2 bg-slate-950/50 border border-white/5 rounded-3xl p-6">
                            <div className="flex items-center justify-between mb-8">
                               <h4 className="text-sm font-black uppercase tracking-widest">Active Operations</h4>
                               <div className="flex gap-2">
                                  <div className="w-7 h-7 rounded bg-slate-900 border border-slate-800 flex items-center justify-center"><Filter className="w-3.5 h-3.5 text-slate-500" /></div>
                                  <div className="w-7 h-7 rounded bg-slate-900 border border-slate-800 flex items-center justify-center"><MoreVertical className="w-3.5 h-3.5 text-slate-500" /></div>
                               </div>
                            </div>
                            <div className="space-y-4">
                               {[
                                 { title: 'Implement Real-time Sync Engine', team: 'Infra', status: 'In Progress', progress: 65, color: 'bg-indigo-500' },
                                 { title: 'Global Authentication Redesign', team: 'Security', status: 'Critical', progress: 92, color: 'bg-rose-500' },
                                 { title: 'Dashboard High-Density UI v2', team: 'Design', status: 'Review', progress: 40, color: 'bg-emerald-500' }
                               ].map(task => (
                                 <div key={task.title} className="p-4 bg-slate-900/50 border border-white/5 rounded-xl flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                       <div className="w-10 h-10 rounded bg-slate-950 border border-slate-800 flex items-center justify-center font-black text-xs text-slate-500">{task.team[0]}</div>
                                       <div>
                                          <h5 className="text-xs font-bold text-white mb-1">{task.title}</h5>
                                          <div className="flex items-center gap-2">
                                             <span className="text-[9px] font-black uppercase tracking-widest text-slate-600">{task.team}</span>
                                             <span className="text-slate-800">•</span>
                                             <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{task.status}</span>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="w-32 flex flex-col gap-2">
                                       <div className="flex justify-between text-[8px] font-black text-slate-500 uppercase tracking-tighter">
                                          <span>Progress</span>
                                          <span>{task.progress}%</span>
                                       </div>
                                       <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                                          <div className={cn("h-full", task.color)} style={{ width: `${task.progress}%` }} />
                                       </div>
                                    </div>
                                 </div>
                               ))}
                            </div>
                         </div>
                         <div className="bg-slate-950/50 border border-white/5 rounded-3xl p-6 flex flex-col">
                            <h4 className="text-sm font-black uppercase tracking-widest mb-6">Velocity History</h4>
                            <div className="flex-1 flex items-end justify-between gap-2 px-2 pb-2">
                               {[40, 60, 35, 75, 45, 90, 55].map((h, i) => (
                                 <div key={i} className="flex-1 bg-indigo-500/20 border-t-2 border-indigo-500/40 rounded-t-lg transition-all hover:bg-indigo-500" style={{ height: `${h}%` }} />
                               ))}
                            </div>
                            <div className="flex justify-between mt-4 px-2 text-[8px] font-black text-slate-700 uppercase tracking-widest">
                               <span>Mon</span>
                               <span>Sun</span>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-slate-950 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">The ultimate arsenal for <br /> <span className="text-indigo-500">modern operations.</span></h2>
            <p className="text-slate-500 max-w-xl mx-auto font-medium leading-relaxed">Systematic tools designed specifically for teams that can't afford to slow down or second-guess.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Layers} 
              title="Project Management" 
              desc="Full-spectrum project tracking from initialization to delivery. Manage infinite nested sub-tasks and milestones."
              color="text-indigo-400"
              bg="bg-indigo-500/10"
            />
            <FeatureCard 
              icon={Users} 
              title="Team Collaboration" 
              desc="Synchronous data pipelines ensure every member is working on the absolute latest version of every asset."
              color="text-sky-400"
              bg="bg-sky-500/10"
            />
            <FeatureCard 
              icon={BarChart3} 
              title="Analytics Dashboard" 
              desc="High-density data visualizations that transform raw operational metrics into actionable strategic insights."
              color="text-emerald-400"
              bg="bg-emerald-500/10"
            />
            <FeatureCard 
              icon={Layout} 
              title="Task Tracking" 
              desc="Interactive Kanban boards and list views optimized for speed. Update task status with 10ms latency."
              color="text-amber-400"
              bg="bg-amber-500/10"
            />
            <FeatureCard 
              icon={Cpu} 
              title="AI Productivity" 
              desc="Machine learning models that automatically prioritize tasks and suggest optimized team workloads."
              color="text-purple-400"
              bg="bg-purple-500/10"
            />
            <FeatureCard 
              icon={Bell} 
              title="Smart Notifications" 
              desc="Zero-noise notification system that only alerts you to critical path changes that require immediate action."
              color="text-rose-400"
              bg="bg-rose-500/10"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-48 bg-slate-950 border-t border-slate-900 relative overflow-hidden">
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-indigo-600/5 blur-[120px] rounded-full"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Zero friction to <span className="text-indigo-500">velocity.</span></h2>
            <p className="text-slate-500 max-w-xl mx-auto font-medium leading-relaxed">Integrated deployment in under 2 minutes. Focus on results, not configuration.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <StepCard 
              number="01" 
              title="Create Workspace" 
              desc="Initialize your high-density workspace and import existing project data via our advanced migration engine." 
            />
            <StepCard 
              number="02" 
              title="Assign & Execute" 
              desc="Delegate tasks to your team matrix with precise priority levels and real-time status tracking." 
            />
            <StepCard 
              number="03" 
              title="Scale Output" 
              desc="Analyze operational velocity and use AI insights to remove bottlenecks and maximize team efficiency." 
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-48 bg-slate-950/50 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-black mb-6 tracking-tight">Trusted by global <span className="text-indigo-500">leaders.</span></h2>
            <p className="text-slate-500 max-w-xl mx-auto font-medium">TaskNova powers operations for the world's most aggressive startups and stable enterprises.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: "The first tool that actually keeps up with our engineering velocity. The real-time sync is absolutely flawless.", author: "Marcus Thorne", role: "VP of Eng @ Velocity" },
              { text: "TaskNova's high-density UI allows our team to see everything that matters without the typical dashboard bloat.", author: "Elena Vance", role: "Product Director @ Axiom" },
              { text: "The transition was seamless. We synchronized 500+ projects and 2k users in less than 30 minutes.", author: "David Sterling", role: "COO @ Prime" }
            ].map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="p-10 bg-slate-950 border border-slate-800 rounded-[32px] relative group hover:border-slate-700 transition-all"
              >
                <div className="flex gap-1 mb-8">
                   {[1, 2, 3, 4, 5].map(s => <div key={s} className="w-1 h-1 bg-indigo-500 rounded-full" />)}
                </div>
                <p className="text-lg font-bold text-white mb-8 italic leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-4 pt-8 border-t border-slate-900">
                   <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-black text-indigo-400 border border-slate-700 text-xs shadow-lg">
                      {t.author[0]}
                   </div>
                   <div>
                      <h4 className="text-sm font-black text-white">{t.author}</h4>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{t.role}</p>
                   </div>
                </div>
                <MessageSquare className="absolute top-8 right-8 w-12 h-12 text-slate-900 group-hover:text-indigo-500/10 transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-48 px-6 bg-slate-950">
        <div className="max-w-5xl mx-auto relative group">
          <div className="absolute inset-0 bg-indigo-600 blur-[100px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <div className="relative z-10 px-8 py-20 lg:p-32 bg-slate-900 border border-slate-800 rounded-[64px] text-center overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
             <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
             >
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-10 tracking-tight leading-tight">
                   Ready to increase <br />
                   <span className="text-indigo-500">team velocity?</span>
                </h2>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Link to="/signup" className="w-full sm:w-auto px-12 py-5 bg-indigo-600 hover:bg-slate-50 hover:text-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-2xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-3 group">
                    Deploy TaskNova
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </Link>
                  <Link to="/login" className="w-full sm:w-auto px-12 py-5 bg-slate-950 border border-slate-800 text-slate-400 rounded-2xl font-black uppercase tracking-widest text-sm hover:text-white transition-all">
                    System Access
                  </Link>
                </div>
                <p className="mt-12 text-slate-600 text-[10px] font-bold uppercase tracking-[0.3em]">
                   Secure • Encrypted • Production Ready
                </p>
             </motion.div>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
