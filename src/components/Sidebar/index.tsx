import styles from "./Sidebar.module.css"
import logo from "../../assets/images/logo.png"
import listIcon from "../../assets/images/list.png"
import groupIcon from "../../assets/images/group.png"
import settingsIcon from "../../assets/images/settings.png"
import logoutIcon from "../../assets/images/logout.png"
import { Link } from "react-router-dom"

const Sidebar = () => {
    //로그아웃 시 쿠키 해제 관련 함수 추가
    return (
        <div className={styles.Sidebar}>
            <Link to="/Home" className={styles.logoContainer}>
                <img src={logo} alt="PinBoard" className={styles.logo} />
            </Link>
            <Link to="/list" className={styles.menuLink}>
                <img src={listIcon} alt="List" className={styles.menuIcon} />
                <span>메모 리스트</span>
            </Link>
            <Link to="/group" className={styles.menuLink}>
                <img src={groupIcon} alt="Group" className={styles.menuIcon} />
                <span>그룹 관리</span>
            </Link>
            <Link to="/user" className={styles.menuLink}>
                <img src={settingsIcon} alt="User" className={styles.menuIcon} />
                <span>계정 설정</span>
            </Link>
            <Link to="/login" className={styles.logoutLink}>
                <img src={logoutIcon} alt="User" className={styles.logoutIcon} />
                <span>로그아웃</span>
            </Link>
        </div>
    ) 
}
  
export default Sidebar;