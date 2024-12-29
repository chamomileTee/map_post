import styles from "./Sidebar.module.css"
import logo from "../../assets/images/logo.png"
import settingsIcon from "../../assets/images/settings.png"
import { Link } from "react-router-dom"

const Sidebar = () => {
    return (
        <div className={styles.Sidebar}>
            <Link to="/Home" className={styles.logoContainer}>
                <img src={logo} alt="PinBoard" className={styles.logo} />
            </Link>
            <Link to="/settings" className={styles.settingsLink}>
                <img src={settingsIcon} alt="Settings" className={styles.settingsIcon} />
                <span>계정설정</span>
            </Link>
        </div>
    )
}
  
export default Sidebar;