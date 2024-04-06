import { Outlet } from "react-router-dom";

import AppSideBar from '../containers/AppSideBar';
import styles from "./root.module.scss";


export default function Root() {
    const navlinks = [
        { icon: HomeIcon, title: "Home", link: "/"},
        { icon: SearchIcon, title: "Search", link: "/search"},
        { icon: ExploreIcon, title: "Explore", link: "/explore"},
        { icon: MessagesIcon, title: "Messages", link: "/messages"},
        { icon: LikedIcon, title: "Liked", link: "/liked", showOnTop: true},
        { icon: CreateIcon, title: "Create", link: "/create", showOnTop: true},
        { icon: ProfileIcon, title: "Profile", link: "/userProfile"}
    ];

    return (
        <>  
            <div className={styles.baseCols}>
                <div className={styles.appSideBarWrap}>
                    <AppSideBar />
                </div>
                <div className={styles.pageWrap}>
                    <Outlet />
                </div>
            </div>            
        </>
    );
}