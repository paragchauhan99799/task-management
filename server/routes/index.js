var express = require('express');
var router = express.Router();

var taskController = require('../controller/task.controller');

router.post('/task/add', taskController.createTask);
router.get('/task/getall', taskController.getAllTask);
router.put('/task/update/:taskId', taskController.updateTask);
router.delete('/task/delete/:taskId', taskController.deleteTask);

module.exports = router;