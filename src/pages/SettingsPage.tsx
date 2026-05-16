import React from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { User, Bell, Shield, Moon, Globe, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

const SettingsSection = ({ icon: Icon, title, desc, children }: any) => (
  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
    <div className="flex items-start gap-6 mb-8">
      <div className="w-12 h-12 bg-indigo-600/10 rounded-2xl flex items-center justify-center text-indigo-400 shrink-0">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-slate-500 text-sm">{desc}</p>
      </div>
    </div>
    <div className="space-y-6">
      {children}
    </div>
  </div>
);

const SettingItem = ({ label, desc, type = 'toggle', value }: any) => (
  <div className="flex items-center justify-between py-4 border-t border-slate-800 group first:border-none first:pt-0">
    <div className="max-w-md">
      <p className="text-sm font-bold text-white mb-1">{label}</p>
      <p className="text-xs text-slate-500">{desc}</p>
    </div>
    {type === 'toggle' ? (
      <button className={`w-12 h-6 rounded-full transition-all relative ${value ? 'bg-indigo-600' : 'bg-slate-700'}`}>
        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${value ? 'left-7' : 'left-1'}`}></div>
      </button>
    ) : (
      <button className="text-sm font-bold text-indigo-400 hover:text-white transition-colors">Edit</button>
    )}
  </div>
);

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <header>
        <h2 className="text-3xl font-bold text-white">Settings</h2>
        <p className="text-slate-400 mt-1">Manage your account preferences and workspace configuration.</p>
      </header>

      <SettingsSection 
        icon={User} 
        title="Profile Information" 
        desc="Update your personal details and workspace identity."
      >
        <div className="flex items-center gap-6 mb-8 p-6 bg-slate-950 rounded-2xl border border-slate-800">
           <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center text-3xl font-bold text-indigo-400 border-2 border-indigo-500/20">
              {user?.name[0]}
           </div>
           <div>
              <h4 className="text-lg font-bold text-white">{user?.name}</h4>
              <p className="text-sm text-slate-500">{user?.role} Account</p>
              <button className="mt-2 text-xs font-bold text-indigo-400 hover:text-indigo-300">Change Avatar</button>
           </div>
        </div>
        <SettingItem label="Display Name" desc="How you appear to other team members." type="button" />
        <SettingItem label="Profile Role" desc="Your assigned access level in the workspace." type="button" />
      </SettingsSection>

      <SettingsSection 
        icon={Bell} 
        title="Notifications" 
        desc="Control how and when you receive updates."
      >
        <SettingItem label="Email Notifications" desc="Receive daily digests of your assigned tasks." value={true} />
        <SettingItem label="Browser Push" desc="Real-time alerts for task mentions and deadlines." value={true} />
        <SettingItem label="Project Updates" desc="Get notified when team members create new projects." value={false} />
      </SettingsSection>

      <SettingsSection 
        icon={Shield} 
        title="Security" 
        desc="Keep your account safe and manage access."
      >
        <SettingItem label="Two-Factor Authentication" desc="Add an extra layer of security to your account." type="button" />
        <SettingItem label="Session Management" desc="Log out of all other devices currently active." type="button" />
      </SettingsSection>
    </div>
  );
}
