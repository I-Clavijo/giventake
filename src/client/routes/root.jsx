import { Outlet, Link } from "react-router-dom";

import { LeadhiveIconInverse } from "../assets/images";

import styles from "./root.module.scss";


export default function Root() {
    return (
        <>
            <AppBar />
            <div id="detail">
                <Outlet />
            </div>

            <footer className={styles.footer}>
                footer
            </footer>
        </>
    );
}