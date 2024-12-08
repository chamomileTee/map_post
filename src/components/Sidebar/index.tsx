import styles from "./Sidebar.module.css"
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className={styles.Sidebar}>Sidebar
            <div className={styles.loginLink}>
            <Link to="/Home">Home</Link>
            <div className={styles.loginLink}></div>
            <Link to="/Login">Login</Link>
            </div>
        </div>
    );
}
  
export default Sidebar;