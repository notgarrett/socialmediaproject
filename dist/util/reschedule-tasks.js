"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_queue_1 = __importDefault(require("../models/task-queue"));
const scheduler_1 = require("./scheduler");
const rescheduleTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    task_queue_1.default.find({}, callback);
});
const callback = (err, result) => {
    result.forEach((doc) => __awaiter(void 0, void 0, void 0, function* () {
        let newTask = new task_queue_1.default(doc);
        const scheduledTask = new scheduler_1.ScheduledTask(doc.time, newTask);
    }));
};
//# sourceMappingURL=reschedule-tasks.js.map