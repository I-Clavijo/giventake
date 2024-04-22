import { Outlet } from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import AppSideBar from '../components/AppSideBar';
import { useUser } from "../api/hooks/useUser";

import HomeIcon from "../assets/images/home-icon.svg";
import SearchIcon from "../assets/images/search-icon.svg";
import ExploreIcon from "../assets/images/explore-icon.svg";
import MessagesIcon from "../assets/images/messages-icon.svg";
import LikedIcon from "../assets/images/liked-icon.svg";
import CreateIcon from "../assets/images/create-icon.svg";
import ProfileIcon from "../assets/images/profile-icon.svg";


export default function Root({ children }) {
    const { isLoggedIn } = useUser();

    const navlinks = [
        { icon: HomeIcon, title: "Home", link: "/" },
        { icon: SearchIcon, title: "Search", link: "/search" },
        { icon: ExploreIcon, title: "Explore", link: "/explore" },
        { icon: MessagesIcon, title: "Messages", link: "/messages" },
        { icon: LikedIcon, title: "Liked", link: "/liked", showOnTop: true },
        { icon: CreateIcon, title: "Create", link: "/create", showOnTop: true },
        isLoggedIn 
           ? { icon: ProfileIcon, title: "Profile", link: "/profile" } 
           : { icon: ProfileIcon, title: "Sign in/up", link: "/auth?mode=login" }
    ];

    return (
        <>
            <AppSideBar title="Given'take" nav={navlinks}>
                {children}
                <SnackbarProvider autoHideDuration={5000} anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
                    <Outlet />
                </SnackbarProvider>
            </AppSideBar>
        </>
    );
}