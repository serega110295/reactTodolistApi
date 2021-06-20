import style from './tasks.module.css'

const Tasks = ({ tasks, changeText, deleteTask, doneTask }) => {

    const className = tasks.isDone ? style.done : style.wrapper
    const pStyle = tasks.isDone ? style.doneP : style.p

    return (
        <div>
            <div className={className}>
                <p className={pStyle} onDoubleClick={changeText} onClick={doneTask}>{tasks.todo}</p>
                <button className={style.deleteBtn} onClick={deleteTask}>❌</button>
            </div>
        </div>
    )
}
export default Tasks;