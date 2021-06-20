import style from './header.module.css'

const Header = ({ tasks }) => {
    return (
        <header className={style.header}>
            <h3>Список задач: {tasks}</h3>
        </header>
    )
}
export default Header;