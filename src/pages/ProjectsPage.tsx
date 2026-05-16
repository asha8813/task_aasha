import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Calendar, 
  Users, 
  MoreHorizontal, 
  FolderLock,
  Loader2,
  Trash2,
  Edit2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import api from '../services/api.ts';
import { useAuth } from '../context/AuthContext.tsx';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project, onDelete }: any) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.role === 'Admin';
  const isCreator = project.createdBy?._id === user?.id;

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="high-density-card group hover:border-indigo-500/50 transition-all cursor-pointer flex flex-col h-full"
      onClick={() => navigate(`/dashboard/projects/${project._id}`)}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400">
          <FolderLock className="w-5 h-5" />
        </div>
        <div className="flex gap-1">
           {(isAdmin || isCreator) && (
             <button 
                onClick={(e) => { e.stopPropagation(); onDelete(project._id); }}
                className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
             >
                <Trash2 className="w-4 h-4" />
             </button>
           )}
           <button className="p-1.5 text-slate-500 hover:text-white rounded-lg transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      <h3 className="text-lg font-bold text-white mb-1 tracking-tight">{project.title}</h3>
      <p className="text-slate-500 text-xs line-clamp-2 mb-6 flex-1">{project.description}</p>

      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <div className="flex -space-x-2">
          {project.teamMembers?.slice(0, 3).map((member: any) => (
            <div key={member._id} className="w-7 h-7 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[8px] font-bold overflow-hidden" title={member.name}>
               {member.avatar ? <img src={member.avatar} /> : member.name[0]}
            </div>
          ))}
          {project.teamMembers?.length > 3 && (
            <div className="w-7 h-7 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[8px] font-bold text-slate-500">
              +{project.teamMembers.length - 3}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
          <Calendar className="w-3 h-3" />
          {project.dueDate ? new Date(project.dueDate).toLocaleDateString() : 'TBD'}
        </div>
      </div>
    </motion.div>
  );
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();
  const [newProject, setNewProject] = useState({ title: '', description: '', dueDate: '' });

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/projects', newProject);
      setShowModal(false);
      setNewProject({ title: '', description: '', dueDate: '' });
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project? All associated tasks will be removed.')) {
      try {
        await api.delete(`/projects/${id}`);
        fetchProjects();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Project Portfolio</h2>
          <p className="text-slate-500 text-sm">Strategic initiatives and active team workspaces.</p>
        </div>
        {user?.role === 'Admin' && (
          <button 
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/20"
          >
            <Plus className="w-4 h-4" />
            New Project
          </button>
        )}
      </header>

      <div className="flex items-center gap-3 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 max-w-sm">
        <Search className="w-4 h-4 text-slate-500" />
        <input 
          type="text" 
          placeholder="Filter workspaces..." 
          className="bg-transparent border-none focus:ring-0 text-sm text-slate-300 w-full placeholder-slate-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {projects.map((project: any) => (
            <ProjectCard key={project._id} project={project} onDelete={handleDelete} />
          ))}
        </AnimatePresence>
      </div>

      {projects.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center text-slate-700">
            <FolderLock className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">No projects found</h3>
            <p className="text-slate-500">Get started by creating your first team project.</p>
          </div>
        </div>
      )}

      {/* Create Modal */}
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
              className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-[32px] p-8 shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Create New Project</h3>
              <form onSubmit={handleCreate} className="space-y-6">
                 <div>
                    <label className="text-sm font-medium text-slate-400 ml-1">Project Title</label>
                    <input 
                      required
                      value={newProject.title}
                      onChange={e => setNewProject({...newProject, title: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 mt-2 text-white focus:outline-none focus:ring-2 ring-indigo-500/50 transition-all"
                      placeholder="e.g. Website Redesign"
                    />
                 </div>
                 <div>
                    <label className="text-sm font-medium text-slate-400 ml-1">Description</label>
                    <textarea 
                      required
                      value={newProject.description}
                      onChange={e => setNewProject({...newProject, description: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 mt-2 text-white focus:outline-none focus:ring-2 ring-indigo-500/50 transition-all h-32"
                      placeholder="What is this project about?"
                    />
                 </div>
                 <div>
                    <label className="text-sm font-medium text-slate-400 ml-1">Due Date</label>
                    <input 
                      type="date"
                      value={newProject.dueDate}
                      onChange={e => setNewProject({...newProject, dueDate: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 mt-2 text-white focus:outline-none focus:ring-2 ring-indigo-500/50 transition-all"
                    />
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
                      className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-500/20"
                    >
                      Create Project
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
