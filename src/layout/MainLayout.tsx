import { Outlet } from "react-router-dom";
import Sidebar from "~/components/Sidebar";
import styles from "./MainLayout.module.css"


const MainLayout = () => {
  return (
    <div className={styles.MainLayout}>
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default MainLayout;

