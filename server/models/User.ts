import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String },
  password: { type: String },
  role: { type: String, enum: ['Admin', 'Member'], default: 'Member' },
  avatar: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Hash password before saving (only if password exists)
userSchema.pre('save', async function() {
  if (!this.password || !this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare password (no-op if no password)
userSchema.methods.comparePassword = async function(candidatePassword: string) {
  if (!this.password) return true; // Special mode: no password required
  return await bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model('User', userSchema);
