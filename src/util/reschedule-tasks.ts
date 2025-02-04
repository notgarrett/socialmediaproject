import { CallbackError } from "mongoose";
import TaskQueue, {ITaskQueue} from "../models/task-queue";
import { ScheduledTask } from "./scheduler";

const rescheduleTasks = async () => {
  TaskQueue.find({}, callback)
}


const callback = (err: CallbackError, result: ITaskQueue[]) => {
  result.forEach(async (doc: ITaskQueue) => {
    let newTask = new TaskQueue(doc);
    const scheduledTask = new ScheduledTask(doc.time, newTask);
  })
}

