const db = require('../models');
const TodoList = db.todoList;

exports.create = (req, res) => {

    if (!req.body.todo) {
        res.status(400).send({ message: 'Задача не создана' })
        return
    }

    const todoList = new TodoList({
        todo: req.body.todo,
        isDone: req.body.isDone
    })
    todoList
        .save(todoList)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({ message: err.message || 'При создание задачи произошла ошибка' })
        })
    console.log(todoList)
}

exports.getAll = (req, res) => {

    const todo = req.body.todo
    let condition = todo ? { todo: { $regex: new RegExp(todo), $options: "i" } } : {}

    TodoList.find(condition)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({ message: 'При получение задачи произошла ошибка' })
        })
}

exports.delete = (req, res) => {
    const id = req.params._id
    TodoList.deleteOne(id)
        .then((data) => {
            if (!data) {
                res.status(404).send({ message: 'Задача не найдена' })
            }
            else {
                res.send({ message: 'Задача удалена' })
            }
        })
        .catch(err => {
            res.status(500).send({ message: 'Не удалось удалить задачу' })
        })
}

exports.deleteAll = (req, res) => {

    TodoList.deleteMany({})
        .then(data => {
            res.send({ message: `${data.deleteCounter} задач удалено` })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Не удалось удалить все задачи'
            })
        })
}

exports.changeStateTasks = (req, res) => {

    if (!req.body) {
        return res.status(400).send({ message: 'Статус выполнения не изменен' })
    }

    TodoList.findOneAndUpdate(req.params.id, { isDone: req.body.isDone }, (err, data) => {
        if (err) {
            res.status(500).send({ message: err.message || 'Ошибка обновления состояния задачи' })
        }

        if (!data) {
            res.status(404).send({ message: 'Задача не найдена' })
        }
        else res.send({ message: 'Статус задачи был изменен', data })
    })
    // .then(data => {
    //     console.log('=====', data)
    //     if (!data) {
    //         res.status(404).send({ message: 'Задача не найдена' })
    //     }
    //     else res.send({ message: 'Статус задачи был изменен' })
    // })
    // .catch(err => {
    //     res.status(500).send({ message: err.message || 'Ошибка обновления состояния задачи' })
    // })
}

exports.changeTextTasks = (req, res) => {

    if (!req.body) {
        return res.status(400).send({ message: 'Текст задачи не изменен' })
    }

    const id = req.params._id
    TodoList.findOneAndUpdate(id, { todo: req.body.todo })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: 'Задача не найдена' })
                return
            }
            res.send({ message: 'Текст задачи обновлен' })
        })
        .catch(err => {
            res.status(500).send({ message: err.message || 'Ошибка обновления текста' })
        })
}