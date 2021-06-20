import style from './task-options.module.css'

const TaskOptions = ({ allTasksBtn, doneTasksBtn, notDoneTasksBtn, active }) => {
    return (
        <div className={style.wrapper}>
            <button className={active === 'all' ? style.btnActive : style.btn} onClick={allTasksBtn}>Все задачи</button>
            <button className={active === 'done' ? style.btnActive : style.btn} onClick={doneTasksBtn}>Выполненные</button>
            <button className={active === 'notDone' ? style.btnActive : style.btn} onClick={notDoneTasksBtn}>Не выполненные</button>
        </div>
    )
}
export default TaskOptions;