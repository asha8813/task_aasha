import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';
import api from '../services/api.ts';
import { motion } from 'motion/react';

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
}).required();

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError('');
    try {
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
    <div className="min-h-screen bg-slate-950 flex">
      {/* Left Decoration */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-indigo-600">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(124,58,237,0.5),transparent)]"></div>
        <div className="relative z-10 p-16 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-8">
              <div className="w-6 h-6 bg-white rounded-lg"></div>
            </div>
            <h1 className="text-5xl font-bold text-white leading-tight">
              Manage your team <br /> with precision.
            </h1>
          </div>
          <div className="space-y-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-indigo-600 bg-slate-800 flex items-center justify-center overflow-hidden">
                  <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Avatar" />
                </div>
              ))}
              <div className="w-12 h-12 rounded-full border-4 border-indigo-600 bg-indigo-400 flex items-center justify-center font-bold text-white text-xs">
                +2k
              </div>
            </div>
            <p className="text-indigo-100 font-medium">Join over 2,000 teams already using TeamFlow.</p>
          </div>
        </div>
        {/* Animated Background Elements */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.2, duration: 1 }}
            className="absolute bg-white/5 rounded-full blur-3xl"
            style={{
              width: Math.random() * 400 + 200,
              height: Math.random() * 400 + 200,
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>

      {/* Right Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-20">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md space-y-10"
        >
          <header>
            <h2 className="text-4xl font-bold text-white mb-3">Welcome back</h2>
            <p className="text-slate-400">Please enter your details to sign in to your account.</p>
          </header>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Email address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-4 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  {...register('email')}
                  type="email"
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 ring-indigo-500/50 transition-all outline-none"
                  placeholder="name@company.com"
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs ml-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-medium text-slate-300">Password</label>
                <Link to="#" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">Forgot password?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-4 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  {...register('password')}
                  type="password"
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 ring-indigo-500/50 transition-all outline-none"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="text-red-400 text-xs ml-1">{errors.password.message}</p>}
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  Sign in to Dashboard
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-slate-400 text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="font-bold text-white hover:text-indigo-400 transition-colors">Create account</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
