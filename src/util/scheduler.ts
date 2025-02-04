import { CronJob } from 'cron';
import TaskQueue from '../models/task-queue';
import { ITaskQueue } from '../models/task-queue';
import { Document } from 'mongoose';

export class ScheduledTask {

  cronJob: CronJob;
  private task: Document & ITaskQueue;

  constructor(time: String, task: Document & ITaskQueue) {
    this.task = task;
    this.task.save();
    this.cronJob = new CronJob(`${time}`, async () => {
      try {
        await this.post();
      } catch (e) {
        console.error(e);
      }
    });
    
    // Start job
    if (!this.cronJob.running) {
      this.cronJob.start();
    }
  }

  async post(): Promise<void> {
    this.task.deleteOne();
    // Do some task
  }
}
