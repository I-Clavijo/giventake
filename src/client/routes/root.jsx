import { Outlet, Link } from "react-router-dom";

import AppBar from '../containers/AppBar';
import styles from "./root.module.scss";
import ReactLogo from "../assets/images/leadhive-icon.svg";


export default function Root() {
    return (
        <>
            <AppBar />
            <div id="detail">
                <Outlet />
            </div>
            <div>          
                <img src={ReactLogo} className="logo react" alt="React logo" />
                {/* <ReactLogo /> */}
            </div>
            

            <footer className={styles.footer}>
                footer
            </footer>
        </>
    );
}