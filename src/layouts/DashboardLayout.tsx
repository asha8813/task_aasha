import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  CheckSquare, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Search,
  User as UserIcon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils.ts';

const SidebarItem = ({ icon: Icon, label, path, active }: any) => (
  <Link 
    to={path}
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
      active 
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" 
        : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
    )}
  >
    <Icon className={cn("w-5 h-5", active ? "text-white" : "group-hover:text-indigo-400")} />
    <span className="font-medium text-sm">{label}</span>
  </Link>
);

export default function DashboardLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
    { icon: Briefcase, label: 'Projects', path: '/dashboard/projects' },
    { icon: CheckSquare, label: 'Tasks', path: '/dashboard/tasks' },
    { icon: Users, label: 'Team', path: '/dashboard/team' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex transition-all duration-300">
      {/* Mobile Backdrop */}
      {!isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden" 
          onClick={() => setSidebarOpen(true)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 bg-card-dark border-r border-slate-800 transition-transform duration-300 lg:relative lg:translate-x-0 flex flex-col",
          !isSidebarOpen ? "-translate-x-full" : "translate-x-0"
        )}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <CheckSquare className="text-white w-6 h-6" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">TaskNova</span>
        </div>

        <nav className="mt-4 flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium",
                location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path))
                  ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-6 mt-auto">
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 shrink-0 border-2 border-slate-700 flex items-center justify-center font-bold text-white text-xs uppercase">
                {user?.name?.[0]}
             </div>
             <div className="min-w-0">
               <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
               <p className="text-[10px] text-slate-500 uppercase tracking-widest leading-none mt-1">{user?.role}</p>
             </div>
          </div>
          <button 
            onClick={handleLogout}
            className="mt-4 flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-red-400 transition-colors w-full text-xs font-bold uppercase tracking-widest"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="h-16 bg-background-dark/80 backdrop-blur-md border-b border-slate-800 px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-800 rounded-lg lg:hidden"
            >
              {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            
            <div className="hidden md:flex items-center gap-3 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 w-80">
              <Search className="w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search projects or tasks..." 
                className="bg-transparent border-none focus:ring-0 text-sm text-slate-300 w-full placeholder-slate-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-background-dark"></span>
            </button>
            
            <Link 
              to="/dashboard/settings"
              className="p-2 text-slate-400 hover:text-white transition-colors"
            >
              <Settings className="w-5 h-5" />
            </Link>

            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" />
              Quick Action
            </button>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-7xl mx-auto h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
