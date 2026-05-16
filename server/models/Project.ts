import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  teamMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  status: { type: String, enum: ['Active', 'Completed', 'Archived'], default: 'Active' },
  dueDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export const Project = mongoose.model('Project', projectSchema);
