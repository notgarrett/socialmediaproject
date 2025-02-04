import { Schema, model, connect } from 'mongoose';

export interface ITaskQueue {
  content?: string;
  image?: string;
  time: string;
}

const taskSchema = new Schema<ITaskQueue>({
  time: { type: String, required: true },
  content: String,
  image: String
});

const TaskQueue = model<ITaskQueue>('TaskQueue', taskSchema);

export default TaskQueue;
