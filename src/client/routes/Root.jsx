import { NavLink, Outlet } from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import AppSideBar from '../components/AppSideBar';
import { useUser } from "../api/user/useUser";
import styles from './Root.module.scss';

import HomeIcon from "../assets/images/home-icon.svg";
import SearchIcon from "../assets/images/search-icon.svg";
import ExploreIcon from "../assets/images/explore-icon.svg";
import MessagesIcon from "../assets/images/messages-icon.svg";
import LikedIcon from "../assets/images/liked-icon.svg";
import CreateIcon from "../assets/images/create-icon.svg";
import ProfileIcon from "../assets/images/profile-icon.svg";
import LockIcon from "../assets/images/lock-icon.svg";
import { Button, Popover } from "flowbite-react";
import { MdOutlinePerson, MdOutlineLogout, MdLockOutline } from "react-icons/md";
import { TbHeartHandshake } from "react-icons/tb";
import useLogout from "../api/user/useLogout";


export default function Root({ children }) {
    const { isLoggedIn, data: user } = useUser();
    const { mutate: logout } = useLogout();

    const profilePopover = children =>{
        const content =  <div className={styles.popoverWrap}>
                <NavLink to='/profile'><MdOutlinePerson size="1.2em" />Profile</NavLink>
                <NavLink onClick={logout}><MdOutlineLogout size="1.2em" />Logout</NavLink>
        </div>
        return <Popover trigger="click" aria-labelledby="profile-popover" {...{content, children}} />;
    } 
    const navlinks = [
        { icon: HomeIcon, title: "Home", link: "/" },
        { icon: ExploreIcon, title: "Explore", link: "/explore" },
        { icon: MessagesIcon, title: "Messages", link: "/messages" },
        { icon: LikedIcon, title: "Liked", link: "/liked", showOnTop: true },
        { icon: CreateIcon, title: "Create", link: "/create", showOnTop: true },
        isLoggedIn 
           ? { icon: ProfileIcon, title: `${user.firstName} ${user.lastName}`, popover: profilePopover } 
           : { icon: LockIcon , title: "Sign in/up", link: "/auth?mode=login" }
    ];

    return (
        <>
            <AppSideBar icon={<TbHeartHandshake size={70} stroke="#fff" />} title="given'take" nav={navlinks}>
                {children}
                <SnackbarProvider autoHideDuration={5000} anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
                    <Outlet />
                </SnackbarProvider>
            </AppSideBar>
        </>
    );
}