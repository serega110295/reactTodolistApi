import React from 'react';
import Tasks from './component/tasks/tasks'
import Header from './component/header/header'
import style from './App.module.css'
import AddTasks from './component/addTasks/add-tasks'
import TaskOptions from './component/taskOptions/task-options'
import { changeStateApi, createTaskApi, deleteAllTaskApi, deleteTaskApi } from './api/api';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
      filtredTasks: [],
      filterSlate: false,
      active: ''
    }
  }

  componentDidMount() {

    fetch('/tasks')
      .then(res => res.json())
      .then(response => {
        this.setState(prevState => {
          return {
            ...prevState,
            tasks: response
          }
        })
      });
  }

  allTasksBtn = () => {
    this.setState({
      filterSlate: false,
      active: 'all'
    })
  }

  doneTasksBtn = () => {
    this.setState({
      filterSlate: true,
      active: 'done'
    })

    this.setState(prevState => {
      let filterArr = prevState.tasks.filter(item => {
        return (item.isDone)
      })
      return {
        ...prevState,
        filtredTasks: filterArr
      }
    })
  }

  notDoneTasksBtn = () => {
    this.setState({
      filterSlate: true,
      active: 'notDone'
    })
    this.setState(prevState => {
      const filterArr = prevState.tasks.filter(item => {
        return (!item.isDone)
      })
      return {
        ...prevState,
        filtredTasks: filterArr
      }
    })
  }

  addTasks = (task) => {
    this.setState(prevState => {
      const newTask = {
        todo: task,
        isDone: false
      }
      createTaskApi(newTask)
      return {
        ...prevState,
        tasks: prevState.tasks.concat(newTask)
      }
    })
  }

  doneTask = id => {
    this.setState((prevState) => {
      return {
        tasks: prevState.tasks.map(tasks => {
          if (tasks._id === id) {
            const stateTask = !tasks.isDone
            changeStateApi(id, stateTask)
            return {
              ...tasks,
              isDone: stateTask
            }
          }
          return tasks
        })
      }
    })
  }

  deleteTask = id => {
    deleteTaskApi(id)
    this.setState(prevState => {
      return {
        tasks: prevState.tasks.filter(item => item._id !== id)
      }
    })
  }

  getFilteredTasks = () => {
    if (this.state.filterSlate === false) {
      return this.state.tasks
    }
    return this.state.filtredTasks
  }

  changeText = (id) => {
    let taskText = prompt('Введите новое название')
    this.setState(prevState => {
      const prevStateMap = prevState.tasks.map(item => {
        if (item._id === id) {
          return {
            ...item,
            todo: taskText
          }
        }
        return item
      })
      return {
        ...prevState,
        tasks: prevStateMap
      }
    })
  }

  clearAllTasks = () =>{
    this.setState(prevState => {
      deleteAllTaskApi()
      return {
        ...prevState,
        tasks: []
      }
    })
  }



  render() {
    const { tasks } = this.state
    return (
      <div className={style.wrapper}>
        <Header tasks={tasks.length} />
        <AddTasks addTasks={this.addTasks} />
        {this.getFilteredTasks().map(tasks => {
          return (
            <Tasks
              key={tasks._id}
              tasks={tasks}
              deleteTask={() => this.deleteTask(tasks._id)}
              doneTask={() => this.doneTask(tasks._id)}
              changeText={() => this.changeText(tasks._id)}
            />
          )
        })}
        <TaskOptions
          state={this.state.active}
          doneTasksBtn={this.doneTasksBtn}
          notDoneTasksBtn={this.notDoneTasksBtn}
          allTasksBtn={this.allTasksBtn}
        />
        <div>
          <button onClick={this.clearAllTasks}>Удалить все задачи</button>
        </div>
      </div>
    )
  }
}

export default App;
