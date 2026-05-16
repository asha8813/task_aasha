import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Mail, 
  Shield, 
  MoreVertical, 
  UserPlus,
  ArrowUpRight,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import api from '../services/api.ts';
import { useAuth } from '../context/AuthContext.tsx';

const MemberCard = ({ member }: any) => (
  <motion.div 
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-slate-900 border border-slate-800 rounded-3xl p-6 group hover:border-slate-700 transition-all"
  >
    <div className="flex items-center justify-between mb-6">
      <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-400 overflow-hidden border border-indigo-500/20">
         {member.avatar ? (
           <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
         ) : (
           <span className="text-2xl font-bold">{member.name[0]}</span>
         )}
      </div>
      <div className="flex gap-2">
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${member.role === 'Admin' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'bg-slate-800 text-slate-500 border border-slate-700'}`}>
          {member.role}
        </span>
        <button className="p-2 text-slate-500 hover:text-white transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </div>

    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
    <div className="flex items-center gap-2 text-slate-400 text-sm mb-6">
      <Mail className="w-4 h-4" />
      {member.email}
    </div>

    <div className="flex items-center justify-between pt-6 border-t border-slate-800">
      <div className="flex flex-col">
        <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Joined</span>
        <span className="text-xs text-slate-300 font-medium">{new Date(member.createdAt).toLocaleDateString()}</span>
      </div>
      <button className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-indigo-400 transition-all">
        <ArrowUpRight className="w-5 h-5" />
      </button>
    </div>
  </motion.div>
);

export default function TeamPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    api.get('/dashboard/team')
      .then(res => setMembers(res.data.members))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Team Members</h2>
          <p className="text-slate-400 mt-1">Manage workspace roles and collaborate with your team.</p>
        </div>
        {user?.role === 'Admin' && (
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20">
            <UserPlus className="w-5 h-5" />
            Invite Member
          </button>
        )}
      </header>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 flex items-center gap-4 bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 w-full">
          <Users className="w-5 h-5 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            className="bg-transparent border-none focus:outline-none text-slate-300 w-full"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 hover:text-white transition-colors w-full md:w-auto justify-center">
          <Filter className="w-5 h-5" />
          Sort
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {members.map((member: any) => (
            <MemberCard key={member._id} member={member} />
          ))}
        </AnimatePresence>
      </div>

      {members.length === 0 && !loading && (
        <div className="py-20 text-center text-slate-500">
          No team members found.
        </div>
      )}
    </div>
  );
}
