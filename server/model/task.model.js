const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  taskName: String,
  createdBy: String,
  description: String,
  endDate: { type: String, default: new Date() },
  creationTimestamp: { type: String, default: new Date() },
});

module.exports = mongoose.model('Task', TaskSchema);