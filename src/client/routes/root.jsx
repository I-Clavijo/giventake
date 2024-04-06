import { Outlet } from "react-router-dom";

import AppSideBar from '../containers/AppSideBar';
import styles from "./root.module.scss";


export default function Root({children}) {

    return (
        <>  
            <div className={styles.baseCols}>
                <div className={styles.appSideBarWrap}>
                    <AppSideBar />
                </div>
                <div className={styles.pageWrap}>
                    {children}
                    <Outlet />
                </div>
            </div>            
        </>
    );
}