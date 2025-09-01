import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending',
  },
  dueDate: {
    type: Date, 
  },
  dueTime: {
    type: String, 
    validate: {
      validator: function (v) {
        return /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(v); 
      },
      message: props => `${props.value} is not a valid time (HH:mm)`,
    },
  },
  priority:{
    type:String,
    enum: ['low', 'medium', 'high'],
    default:'low',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

export default Task;
