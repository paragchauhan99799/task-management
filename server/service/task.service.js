const Task = require('../model/task.model');

exports.createTask = async task => await Task.create(task);
exports.getAllTask = async () => await Task.find({});

exports.updateTask = async (taskId, data) => {
    const updatedTaskObject = await Task.findOneAndUpdate({ _id: taskId }, data, { new: true });
    console.log('Updated Task Object', updatedTaskObject);
    return updatedTaskObject;
}

exports.deleteTask = async (taskId) => {
    const deletedTaskObject = await Task.findOneAndRemove({ _id: taskId });
    console.log('Delete Object', deletedTaskObject);
    return deletedTaskObject;
}

exports.filterWithEndDate = async (date) => {
    const filterObject = await Task.find({
        $gte: {
          creationTimestamp: date,
        } 
    });
    console.log('filterWithEndDate', filterObject);
    return filterObject;
}

exports.filterWithCreatednDate = async (date) => {
    const filterObject = await Task.find({
        $gte: {
          creationTimestamp: date,
        } 
    });
    console.log('filterWithCreatednDate', filterObject);
    return filterObject;
}