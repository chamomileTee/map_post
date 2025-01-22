import styles from "./Sidebar.module.css"
import logo from "../../assets/images/logo.png"
import listIcon from "../../assets/images/list.png"
import groupIcon from "../../assets/images/group.png"
import settingsIcon from "../../assets/images/settings.png"
import logoutIcon from "../../assets/images/logout.png"
import { Link } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { logout } from "../../api/services/auth/auth"
import { clearAuth } from '../../store/slices/authSlice';
import { redirectToLogin } from '../../utils/navigation';

const Sidebar = () => {
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            console.log()
            await logout();
            dispatch(clearAuth());
            redirectToLogin();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };
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
            <button onClick={handleLogout} className={styles.logoutLink}>
                <img src={logoutIcon} alt="Logout" className={styles.logoutIcon} />
                <span>로그아웃</span>
            </button>
        </div>
    ) 
}
  
export default Sidebar;