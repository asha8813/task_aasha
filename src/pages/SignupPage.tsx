import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { User, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';
import api from '../services/api.ts';
import { motion } from 'motion/react';
import { cn } from '../lib/utils.ts';

const schema = yup.object({
  name: yup.string().required('Full name is required'),
  role: yup.string().oneOf(['Admin', 'Member'], 'Please select a role').required('Role is required'),
}).required();

export default function SignupPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { role: 'Member' }
  });

  const selectedRole = watch('role');

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError('');
    try {
      // In this version, login also handles registration
      const response = await api.post('/auth/login', data);
      login(response.data.token, response.data.user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-row-reverse">
      {/* Right Decoration */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-slate-900 border-l border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(79,70,229,0.2),transparent)]"></div>
        <div className="relative z-10 p-16 flex flex-col justify-center max-w-xl">
           <ShieldCheck className="w-16 h-16 text-indigo-500 mb-10" />
           <h2 className="text-4xl font-bold text-white mb-6 leading-tight">Secure & Scalable Team Management</h2>
           <p className="text-slate-400 text-lg leading-relaxed mb-10">
             From startup to enterprise, TaskNova provides the tools you need to keep your projects on track and your team synchronized.
           </p>
           <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Cloud Storage', value: 'Unlimited' },
                { label: 'Uptime', value: '99.9%' },
                { label: 'Support', value: '24/7' },
                { label: 'Registry', value: 'Active' },
              ].map(item => (
                <div key={item.label} className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">{item.label}</p>
                  <p className="text-white font-bold">{item.value}</p>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Left Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-20 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md space-y-10 py-10"
        >
          <header>
            <h2 className="text-4xl font-bold text-white mb-3 tracking-tight">Join Network</h2>
            <p className="text-slate-400">Initialize your profile to begin operational tracking.</p>
          </header>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-4 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  {...register('name')}
                  type="text"
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 ring-indigo-500/50 transition-all outline-none"
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && <p className="text-red-400 text-xs ml-1">{errors.name.message}</p>}
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Your Role</label>
              <div className="grid grid-cols-2 gap-4">
                {['Admin', 'Member'].map(role => (
                  <label 
                    key={role}
                    className={cn(
                      "flex flex-col items-center justify-center p-5 rounded-2xl border-2 cursor-pointer transition-all gap-2",
                       selectedRole === role 
                        ? "bg-indigo-600/10 border-indigo-500 text-white" 
                        : "bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700"
                    )}
                  >
                    <input 
                      type="radio" 
                      value={role} 
                      {...register('role')} 
                      className="hidden"
                    />
                    <span className="text-sm font-black uppercase tracking-widest">{role}</span>
                    <span className="text-[10px] text-center opacity-70 font-medium">
                      {role === 'Admin' ? 'Management' : 'Execution'}
                    </span>
                  </label>
                ))}
              </div>
              {errors.role && <p className="text-red-400 text-xs ml-1">{errors.role.message}</p>}
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-widest py-4 rounded-2xl shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-slate-400 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-white hover:text-indigo-400 transition-colors">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
