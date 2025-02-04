"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const taskSchema = new mongoose_1.Schema({
    time: { type: String, required: true },
    content: String,
    image: String
});
const TaskQueue = (0, mongoose_1.model)('TaskQueue', taskSchema);
exports.default = TaskQueue;
//# sourceMappingURL=task-queue.js.map