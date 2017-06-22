var taskService = require('../service/task.service.js');

exports.createTask = async (req,res) => {
    try{
        const data = {
            taskName: req.body.taskName,
            createdBy: req.body.createdBy,
            description: req.body.description,
        }
        const taskCreated = await taskService.createTask(data);
        res.status(200).send(taskCreated);
    } catch(err){
        res.status(400).send(err);
    }
}

exports.getAllTask = async (req,res) => {
    try{
        const allTask = await taskService.getAllTask();
        console.log('Get All: ', allTask);
        res.status(200).send(allTask);
    } catch(err){
        res.status(400).send(err);
    }
}

exports.updateTask = async (req,res) => {
    try {
        const updatedTaskObject = await taskService.updateTask(req.params.taskId, req.body);
        res.status(200).send(updatedTaskObject);
    } catch(err){
        res.status(400).send(err);
    }
}

exports.deleteTask = async (req,res) => {
    try{
        const taskId = req.params.taskId;
        const deletedTaskObject = await taskService.deleteTask(taskId);
        res.status(200).send(deletedTaskObject);
    } catch(err){
        res.status(400).send(err);
    }
}