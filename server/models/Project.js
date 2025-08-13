const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [100, 'Project title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true,
    maxlength: [1000, 'Project description cannot exceed 1000 characters']
  },
  status: {
    type: String,
    enum: ['planning', 'in-progress', 'review', 'completed', 'on-hold', 'cancelled'],
    default: 'planning'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  category: {
    type: String,
    required: [true, 'Project category is required'],
    trim: true
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  },
  actualEndDate: {
    type: Date
  },
  budget: {
    type: Number,
    min: [0, 'Budget cannot be negative']
  },
  actualCost: {
    type: Number,
    default: 0,
    min: [0, 'Actual cost cannot be negative']
  },
  progress: {
    type: Number,
    default: 0,
    min: [0, 'Progress cannot be negative'],
    max: [100, 'Progress cannot exceed 100']
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Project manager is required']
  },
  team: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    role: {
      type: String,
      enum: ['developer', 'designer', 'tester', 'analyst', 'lead'],
      required: true
    },
    assignedAt: {
      type: Date,
      default: Date.now
    }
  }],
  tasks: [{
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: ['todo', 'in-progress', 'review', 'completed'],
      default: 'todo'
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    dueDate: {
      type: Date
    },
    completedAt: {
      type: Date
    },
    estimatedHours: {
      type: Number,
      min: 0
    },
    actualHours: {
      type: Number,
      min: 0
    },
    tags: [String]
  }],
  tags: [{
    type: String,
    trim: true
  }],
  attachments: [{
    filename: {
      type: String,
      required: true
    },
    originalName: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: true
    },
    mimeType: {
      type: String,
      required: true
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  }],
  milestones: [{
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    dueDate: {
      type: Date,
      required: true
    },
    completedAt: {
      type: Date
    },
    isCompleted: {
      type: Boolean,
      default: false
    }
  }],
  risks: [{
    description: {
      type: String,
      required: true,
      trim: true
    },
    probability: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: true
    },
    impact: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: true
    },
    mitigation: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: ['open', 'mitigated', 'closed'],
      default: 'open'
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for project duration
projectSchema.virtual('duration').get(function() {
  if (!this.startDate || !this.endDate) return null;
  return Math.ceil((this.endDate - this.startDate) / (1000 * 60 * 60 * 24));
});

// Virtual for overdue status
projectSchema.virtual('isOverdue').get(function() {
  if (this.status === 'completed' || this.status === 'cancelled') return false;
  return this.endDate < new Date();
});

// Virtual for budget utilization
projectSchema.virtual('budgetUtilization').get(function() {
  if (!this.budget || this.budget === 0) return 0;
  return ((this.actualCost / this.budget) * 100).toFixed(2);
});

// Indexes for better query performance
projectSchema.index({ status: 1 });
projectSchema.index({ priority: 1 });
projectSchema.index({ manager: 1 });
projectSchema.index({ 'team.user': 1 });
projectSchema.index({ startDate: 1 });
projectSchema.index({ endDate: 1 });
projectSchema.index({ isActive: 1 });
projectSchema.index({ createdAt: -1 });

// Pre-save middleware to update progress based on completed tasks
projectSchema.pre('save', function(next) {
  if (this.tasks && this.tasks.length > 0) {
    const completedTasks = this.tasks.filter(task => task.status === 'completed').length;
    this.progress = Math.round((completedTasks / this.tasks.length) * 100);
  }
  next();
});

// Instance method to add team member
projectSchema.methods.addTeamMember = function(userId, role) {
  const existingMember = this.team.find(member => member.user.toString() === userId.toString());
  if (existingMember) {
    throw new Error('User is already a team member');
  }
  
  this.team.push({
    user: userId,
    role: role,
    assignedAt: new Date()
  });
  
  return this.save();
};

// Instance method to remove team member
projectSchema.methods.removeTeamMember = function(userId) {
  this.team = this.team.filter(member => member.user.toString() !== userId.toString());
  return this.save();
};

// Instance method to add task
projectSchema.methods.addTask = function(taskData) {
  this.tasks.push(taskData);
  return this.save();
};

// Instance method to update task
projectSchema.methods.updateTask = function(taskId, updates) {
  const task = this.tasks.id(taskId);
  if (!task) {
    throw new Error('Task not found');
  }
  
  Object.assign(task, updates);
  if (updates.status === 'completed' && !task.completedAt) {
    task.completedAt = new Date();
  }
  
  return this.save();
};

// Instance method to add comment
projectSchema.methods.addComment = function(userId, content) {
  this.comments.push({
    user: userId,
    content: content
  });
  return this.save();
};

// Static method to get projects by status
projectSchema.statics.getByStatus = function(status) {
  return this.find({ status: status, isActive: true })
    .populate('manager', 'firstName lastName email')
    .populate('team.user', 'firstName lastName email')
    .sort({ createdAt: -1 });
};

// Static method to get overdue projects
projectSchema.statics.getOverdue = function() {
  return this.find({
    endDate: { $lt: new Date() },
    status: { $nin: ['completed', 'cancelled'] },
    isActive: true
  })
  .populate('manager', 'firstName lastName email')
  .sort({ endDate: 1 });
};

// Static method to get projects by user
projectSchema.statics.getByUser = function(userId) {
  return this.find({
    $or: [
      { manager: userId },
      { 'team.user': userId }
    ],
    isActive: true
  })
  .populate('manager', 'firstName lastName email')
  .populate('team.user', 'firstName lastName email')
  .sort({ createdAt: -1 });
};

module.exports = mongoose.model('Project', projectSchema);
