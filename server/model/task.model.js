const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  taskName: String,
  createdBy: String,
  description: String,
  endDate: Object,
  creationTimestamp: Object,
});

module.exports = mongoose.model('Task', TaskSchema);