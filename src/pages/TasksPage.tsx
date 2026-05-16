import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertCircle,
  MoreVertical,
  Filter,
  CheckCircle,
  PlayCircle,
  Eye,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import api from '../services/api.ts';
import { useAuth } from '../context/AuthContext.tsx';
import { cn } from '../lib/utils.ts';

const PriorityBadge = ({ priority }: { priority: string }) => {
  const styles: any = {
    Low: 'bg-slate-800 text-slate-400',
    Medium: 'bg-blue-500/10 text-blue-400',
    High: 'bg-orange-500/10 text-orange-400',
    Urgent: 'bg-red-500/10 text-red-400'
  };
  return (
    <span className={cn("px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider", styles[priority])}>
      {priority}
    </span>
  );
};

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();
  const [newTask, setNewTask] = useState({ 
    title: '', 
    description: '', 
    project: '', 
    assignedTo: '', 
    priority: 'Medium',
    dueDate: '' 
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [tasksRes, projectsRes, teamRes] = await Promise.all([
        api.get('/tasks'),
        api.get('/projects'),
        api.get('/dashboard/team').catch(() => ({ data: { members: [] } }))
      ]);
      setTasks(tasksRes.data);
      setProjects(projectsRes.data);
      setTeam(teamRes.data.members);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/tasks', newTask);
      setShowModal(false);
      setNewTask({ title: '', description: '', project: '', assignedTo: '', priority: 'Medium', dueDate: '' });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateStatus = async (taskId: string, status: string) => {
    try {
      await api.put(`/tasks/${taskId}`, { status });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this task?')) {
      try {
        await api.delete(`/tasks/${id}`);
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Active Workload</h2>
          <p className="text-slate-500 text-sm">Real-time task tracking and operational execution.</p>
        </div>
        {user?.role === 'Admin' && (
          <button 
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/20"
          >
            <Plus className="w-4 h-4" />
            Add New Task
          </button>
        )}
      </header>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-3 items-center">
        <div className="flex-1 flex items-center gap-3 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 w-full">
          <Search className="w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search tasks or IDs..." 
            className="bg-transparent border-none focus:ring-0 text-sm text-slate-300 w-full placeholder-slate-500"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors w-full md:w-auto justify-center text-xs font-bold uppercase tracking-widest">
          <Filter className="w-4 h-4" />
          Quick Filters
        </button>
      </div>

      {/* Tasks Table */}
      <div className="bg-card-dark border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-800/10 text-slate-500 text-[10px] uppercase tracking-widest font-black">
                <th className="px-6 py-4">Task Definition</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Priority</th>
                <th className="px-6 py-4">Project Entity</th>
                <th className="px-6 py-4">Assignee</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {tasks.map((task: any) => (
                <tr key={task._id} className="group hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-3">
                    <div className="flex flex-col">
                      <span className="text-white font-bold text-sm tracking-tight">{task.title}</span>
                      <span className="text-slate-500 text-xs mt-0.5 truncate max-w-[300px] leading-none">{task.description}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center justify-center gap-2">
                       <span className={cn(
                         "text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded",
                         task.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' : 
                         task.status === 'In Progress' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-slate-800 text-slate-500'
                       )}>
                         {task.status}
                       </span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <PriorityBadge priority={task.priority} />
                  </td>
                  <td className="px-6 py-3">
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-1 rounded truncate inline-block max-w-[120px]">{task.project?.title}</span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-[10px] font-bold text-indigo-400 overflow-hidden">
                        {task.assignedTo?.avatar ? <img src={task.assignedTo.avatar} /> : task.assignedTo?.name?.[0]}
                      </div>
                      <span className="text-xs text-slate-300 font-medium">{task.assignedTo?.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                        {task.status !== 'Completed' && (
                          <button 
                            onClick={() => handleUpdateStatus(task._id, 'Completed')}
                            className="p-1.5 text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors"
                            title="Resolve"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}
                        {(user?.role === 'Admin' || task.assignedBy?._id === user?.id) && (
                          <button 
                            onClick={() => handleDelete(task._id)}
                            className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                        <button className="p-1.5 text-slate-500 hover:text-white rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {tasks.length === 0 && !loading && (
          <div className="py-20 text-center text-slate-500 text-sm font-medium">
             No active tasks in current view.
          </div>
        )}
      </div>

      {/* Create Task Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-[32px] p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Assign New Task</h3>
              <form onSubmit={handleCreate} className="space-y-4">
                 <div>
                    <label className="text-sm font-medium text-slate-400 ml-1">Task Title</label>
                    <input 
                      required
                      value={newTask.title}
                      onChange={e => setNewTask({...newTask, title: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 mt-2 text-white focus:outline-none focus:ring-2 ring-indigo-500/50 transition-all"
                      placeholder="e.g. Design Login UI"
                    />
                 </div>
                 <div>
                    <label className="text-sm font-medium text-slate-400 ml-1">Description</label>
                    <textarea 
                      required
                      value={newTask.description}
                      onChange={e => setNewTask({...newTask, description: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 mt-2 text-white focus:outline-none focus:ring-2 ring-indigo-500/50 transition-all h-24"
                      placeholder="Provide some details..."
                    />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-400 ml-1">Project</label>
                      <select 
                        required
                        value={newTask.project}
                        onChange={e => setNewTask({...newTask, project: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 mt-2 text-white focus:outline-none focus:ring-2 ring-indigo-500/50 transition-all"
                      >
                        <option value="">Select Project</option>
                        {projects.map((p: any) => <option key={p._id} value={p._id}>{p.title}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-400 ml-1">Assigned To</label>
                      <select 
                        required
                        value={newTask.assignedTo}
                        onChange={e => setNewTask({...newTask, assignedTo: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 mt-2 text-white focus:outline-none focus:ring-2 ring-indigo-500/50 transition-all"
                      >
                        <option value="">Select Member</option>
                        {team.map((m: any) => <option key={m._id} value={m._id}>{m.name}</option>)}
                      </select>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-400 ml-1">Priority</label>
                      <select 
                        value={newTask.priority}
                        onChange={e => setNewTask({...newTask, priority: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 mt-2 text-white focus:outline-none focus:ring-2 ring-indigo-500/50 transition-all"
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Urgent">Urgent</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-400 ml-1">Due Date</label>
                      <input 
                        type="date"
                        value={newTask.dueDate}
                        onChange={e => setNewTask({...newTask, dueDate: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 mt-2 text-white focus:outline-none focus:ring-2 ring-indigo-500/50 transition-all"
                      />
                    </div>
                 </div>
                 <div className="flex gap-4 pt-4">
                    <button 
                      type="button" 
                      onClick={() => setShowModal(false)}
                      className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 rounded-2xl transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl transition-all"
                    >
                      Add Task
                    </button>
                 </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
