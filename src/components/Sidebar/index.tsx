import styles from "./Sidebar.module.css"
import logo from "../../assets/images/logo.png"
import listIcon from "../../assets/images/list.png"
import groupIcon from "../../assets/images/group.png"
import settingsIcon from "../../assets/images/settings.png"
import { Link } from "react-router-dom"

const Sidebar = () => {
    return (
        <div className={styles.Sidebar}>
            <Link to="/Home" className={styles.logoContainer}>
                <img src={logo} alt="PinBoard" className={styles.logo} />
            </Link>
            <Link to="/list" className={styles.settingsLink}>
                <img src={listIcon} alt="List" className={styles.settingsIcon} />
                <span>글 리스트</span>
            </Link>
            <Link to="/group" className={styles.settingsLink}>
                <img src={groupIcon} alt="Group" className={styles.settingsIcon} />
                <span>그룹 관리</span>
            </Link>
            <Link to="/user" className={styles.settingsLink}>
                <img src={settingsIcon} alt="User" className={styles.settingsIcon} />
                <span>계정 설정</span>
            </Link>
        </div>
    )
}
  
export default Sidebar;