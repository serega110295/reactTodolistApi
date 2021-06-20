import React from 'react';
import style from './add-task.module.css';

class AddTasks extends React.Component {
    constructor(props) {
        super(props)
        this.state = { value: '' }
    }

    handleChange = (e) => {
        this.setState({ value: e.target.value })
    }

    addTask = () => {
        const { value } = this.state
        if (value) {
            this.props.addTasks(value)
            this.setState({ value: '' })
        }
    }
    
    render() {
        return (
            <div className={style.wrapper}>
                <input value={this.state.value} onChange={this.handleChange}></input>
                <button className={style.btn} onClick={this.addTask}>Добавить</button>
            </div>
        )
    }
}
export default AddTasks;