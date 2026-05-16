import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  AlertTriangle 
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import api from '../services/api.ts';
import { motion } from 'motion/react';

const COLORS = ['#4F46E5', '#7C3AED', '#38BDF8', '#F43F5E'];

const StatCard = ({ icon: Icon, label, value, trend, color }: any) => (
  <div className="bg-card-dark border border-slate-800 rounded-2xl p-5 shadow-sm hover:border-slate-700 transition-all duration-300">
    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">{label}</p>
    <div className="flex items-end justify-between font-mono">
      <h3 className="text-3xl font-bold text-white leading-none">{value}</h3>
      {trend && (
        <span className={`text-${color === 'rose' ? 'rose' : 'emerald'}-400 text-[10px] bg-${color === 'rose' ? 'rose' : 'emerald'}-400/10 px-2 py-1 rounded font-bold`}>
          {trend}
        </span>
      )}
    </div>
  </div>
);

export default function DashboardHome() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/dashboard/stats')
      .then(res => setStats(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const chartData = [
    { name: 'Mon', tasks: 4 },
    { name: 'Tue', tasks: 7 },
    { name: 'Wed', tasks: 5 },
    { name: 'Thu', tasks: 12 },
    { name: 'Fri', tasks: 8 },
    { name: 'Sat', tasks: 3 },
    { name: 'Sun', tasks: 2 },
  ];

  const pieData = stats ? [
    { name: 'Todo', value: stats.taskStatus.find((s: any) => s._id === 'Todo')?.count || 0 },
    { name: 'In Progress', value: stats.taskStatus.find((s: any) => s._id === 'In Progress')?.count || 0 },
    { name: 'Review', value: stats.taskStatus.find((s: any) => s._id === 'Review')?.count || 0 },
    { name: 'Completed', value: stats.taskStatus.find((s: any) => s._id === 'Completed')?.count || 0 },
  ].filter(d => d.value > 0) : [];

  if (loading) return <div className="p-8 text-slate-500 animate-pulse">Loading analytics...</div>;

  return (
    <div className="space-y-6 pb-10">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">System Analytics</h2>
          <p className="text-slate-500 text-sm">Real-time performance and project health monitoring.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all">Export Report</button>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-lg shadow-indigo-600/20">Generate Insights</button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={Briefcase} 
          label="Active Projects" 
          value={stats?.totalProjects || 0} 
          trend="+2 new"
          color="emerald" 
        />
        <StatCard 
          icon={CheckCircle2} 
          label="Total Tasks" 
          value={stats?.totalTasks || 0} 
          trend="24 active" 
          color="indigo" 
        />
        <StatCard 
          icon={Clock} 
          label="Completion Rate" 
          value={`${Math.round(((stats?.completedTasks || 0) / (stats?.totalTasks || 1)) * 100)}%`} 
          trend="Target 90%"
          color="indigo" 
        />
        <StatCard 
          icon={AlertTriangle} 
          label="Overdue Actions" 
          value={stats?.overdueTasks || 0} 
          trend="Action Required"
          color="rose" 
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 high-density-card flex flex-col h-[400px]">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-bold text-lg text-white">Weekly Productivity</h4>
            <div className="flex gap-2">
              <span className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span> Tasks
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full bg-slate-600"></span> Goals
              </span>
            </div>
          </div>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#64748b" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  dy={10}
                />
                <YAxis 
                  stroke="#64748b" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="tasks" 
                  stroke="#6366f1" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorTasks)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="high-density-card flex flex-col h-[400px]">
          <h4 className="font-bold text-lg text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-400" />
            Task Distribution
          </h4>
          <div className="flex-1 flex flex-col justify-center items-center gap-8">
            <div className="h-[200px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData.length > 0 ? pieData : [{ name: 'No Data', value: 1 }]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {(pieData.length > 0 ? pieData : [{ name: 'No Data', value: 1 }]).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-white leading-none">{stats?.totalTasks || 0}</span>
                <span className="text-[10px] uppercase text-slate-500 font-bold tracking-widest mt-1">Total Tasks</span>
              </div>
            </div>
            <div className="w-full space-y-2">
              {pieData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-slate-400 font-medium">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    {item.name}
                  </span>
                  <span className="font-mono text-white font-bold">{Math.round((item.value / (stats?.totalTasks || 1)) * 100)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
