import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  Clock, 
  CheckCircle2, 
  Plus,
  MessageSquare,
  AlertCircle,
  MoreVertical
} from 'lucide-react';
import api from '../services/api.ts';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext.tsx';

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [project, setProject] = useState<any>(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes, tasksRes] = await Promise.all([
          api.get(`/projects/${id}`),
          api.get(`/tasks?project=${id}`)
        ]);
        setProject(projRes.data);
        setTasks(tasksRes.data);
      } catch (err) {
        console.error(err);
        navigate('/dashboard/projects');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  if (loading) return <div className="p-10 animate-pulse text-slate-500">Loading project details...</div>;

  const completedCount = tasks.filter((t: any) => t.status === 'Completed').length;
  const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  return (
    <div className="space-y-6 pb-20">
      <button 
        onClick={() => navigate('/dashboard/projects')}
        className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors group mb-2 text-xs font-bold uppercase tracking-widest"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Return to Portfolio
      </button>

      <div className="high-density-card p-6 !rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 blur-[100px] -z-10"></div>
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 text-[10px] font-black rounded uppercase tracking-widest border border-indigo-500/20">
                {project.status}
              </span>
              <span className="text-slate-700">•</span>
              <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5" />
                Due {project.dueDate ? new Date(project.dueDate).toLocaleDateString() : 'TBD'}
              </div>
            </div>
            <h1 className="text-3xl font-black text-white mb-3 tracking-tight">{project.title}</h1>
            <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">{project.description}</p>
          </div>

          <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-5 min-w-[220px]">
            <div className="flex justify-between items-end mb-3">
               <div>
                 <p className="text-[10px] uppercase font-black text-slate-600 tracking-widest mb-1 leading-none">Efficiency</p>
                 <h4 className="text-2xl font-black text-white leading-none">{Math.round(progress)}%</h4>
               </div>
               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none">{completedCount}/{tasks.length} Resolved</p>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(79,70,229,0.5)]"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-10 pt-8 border-t border-slate-800">
           <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {project.teamMembers?.map((member: any) => (
                   <div key={member._id} className="w-8 h-8 rounded-lg border-2 border-card-dark bg-slate-800 flex items-center justify-center text-[10px] font-bold overflow-hidden" title={member.name}>
                     {member.avatar ? <img src={member.avatar} /> : member.name[0]}
                   </div>
                ))}
              </div>
              <div>
                <p className="text-[10px] uppercase font-black text-slate-600 tracking-widest leading-none">Resources</p>
                <p className="text-xs text-white font-bold mt-1 leading-none">{project.teamMembers?.length} Delegates</p>
              </div>
           </div>

           <div className="h-8 w-[1px] bg-slate-800 hidden md:block"></div>

           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-indigo-400">
                 <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-black text-slate-600 tracking-widest leading-none">Authority</p>
                <p className="text-xs text-white font-bold mt-1 leading-none">{project.createdBy?.name}</p>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-10">
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-white flex items-center gap-2 uppercase tracking-widest">
              Task Matrix
              <span className="bg-slate-800 text-slate-500 text-[10px] px-2 py-0.5 rounded font-bold">{tasks.length}</span>
            </h3>
            {user?.role === 'Admin' && (
              <button 
                onClick={() => navigate('/dashboard/tasks')}
                className="text-indigo-400 hover:text-white text-xs font-black uppercase tracking-widest flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Configure Tasks
              </button>
            )}
          </div>

          <div className="space-y-2">
            {tasks.map((task: any) => (
              <motion.div 
                key={task._id}
                whileHover={{ x: 4 }}
                className="high-density-card p-4 flex items-center justify-between hover:border-slate-700 transition-all !rounded-xl"
              >
                <div className="flex items-center gap-3">
                   <div className={`w-1.5 h-1.5 rounded-full ${task.status === 'Completed' ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
                   <div>
                     <h4 className={`text-sm font-bold transition-all tracking-tight ${task.status === 'Completed' ? 'text-slate-600 line-through' : 'text-white'}`}>
                       {task.title}
                     </h4>
                     <p className="text-[10px] text-slate-500 font-medium">Assigned to {task.assignedTo?.name}</p>
                   </div>
                </div>
                <div className="flex items-center gap-4">
                   <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                     task.priority === 'Urgent' ? 'bg-red-500/10 text-red-500' :
                     task.priority === 'High' ? 'bg-orange-500/10 text-orange-500' :
                     'bg-slate-800 text-slate-500'
                   }`}>
                     {task.priority}
                   </span>
                   <button className="p-1.5 text-slate-600 hover:text-white transition-all">
                     <MoreVertical className="w-4 h-4" />
                   </button>
                </div>
              </motion.div>
            ))}
            {tasks.length === 0 && (
              <div className="py-10 border-2 border-dashed border-slate-800 rounded-2xl text-center text-slate-600 text-xs font-bold uppercase tracking-widest">
                 System Idle: No tasks available.
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
           <div className="high-density-card !rounded-2xl">
              <h3 className="text-sm font-black text-white mb-5 flex items-center gap-2 uppercase tracking-widest">
                <Clock className="w-4 h-4 text-indigo-400" />
                Timeline
              </h3>
              <div className="space-y-4">
                 <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                       <Calendar className="w-4 h-4 text-slate-600" />
                    </div>
                    <div>
                       <p className="text-[9px] uppercase font-black text-slate-600 tracking-widest leading-none">Initialization</p>
                       <p className="text-xs text-white font-bold mt-1 leading-none">{new Date(project.createdAt).toLocaleDateString()}</p>
                    </div>
                 </div>
                 <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                       <AlertCircle className="w-4 h-4 text-rose-500" />
                    </div>
                    <div>
                       <p className="text-[9px] uppercase font-black text-slate-600 tracking-widest leading-none">Target Resolution</p>
                       <p className="text-xs text-white font-bold mt-1 leading-none">{project.dueDate ? new Date(project.dueDate).toLocaleDateString() : 'Pending'}</p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="high-density-card !rounded-2xl">
              <h3 className="text-sm font-black text-white mb-5 flex items-center gap-2 uppercase tracking-widest">
                <MessageSquare className="w-4 h-4 text-indigo-400" />
                Registry
              </h3>
              <ul className="space-y-3 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                <li className="flex justify-between">
                  <span>Privacy</span>
                  <span className="text-white">Encrypted</span>
                </li>
                <li className="flex justify-between">
                  <span>Version</span>
                  <span className="text-white">v1.2.0-STABLE</span>
                </li>
                <li className="flex justify-between">
                  <span>Payload</span>
                  <span className="text-white">Active</span>
                </li>
              </ul>
           </div>
        </div>
      </div>
    </div>
  );
}
