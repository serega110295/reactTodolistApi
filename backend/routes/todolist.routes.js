module.exports = app => {
    const todoList = require('../controllers/todolist.controller')
    const router = require('express').Router()

    router.post('/', todoList.create);

    router.get('/tasks', todoList.getAll);

    router.delete('/:id', todoList.delete);

    router.delete('/tasks', todoList.deleteAll);

    router.put('/update-status/:id', todoList.changeStateTasks);

    router.put('/update-text/:id', todoList.changeTextTasks);

    app.use('/', router);
}