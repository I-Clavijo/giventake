import { NavLink, Outlet } from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import AppSideBar from './AppSideBar';
import { useUser } from "../../api/users/useUser";
import styles from './Root.module.scss';
import ScrollToTop from '../../hooks/ScrollToTop';
import HomeIcon from "../../assets/images/home-icon.svg";
import NewsIcon from "../../assets/images/newspaper-icon.svg";
import SearchIcon from "../../assets/images/search-icon.svg";
import ExploreIcon from "../../assets/images/explore-icon.svg";
import MessagesIcon from "../../assets/images/messages-icon.svg";
import BookmarkIcon from "../../assets/images/bookmark-icon.svg";
import CreateIcon from "../../assets/images/create-icon.svg";
import ProfileIcon from "../../assets/images/profile-icon.svg";
import LockIcon from "../../assets/images/lock-icon.svg";
import { Button, Popover } from "flowbite-react";
import { MdOutlinePerson, MdOutlineLogout, MdLockOutline } from "react-icons/md";
import { TbHeartHandshake } from "react-icons/tb";
import useLogout from "../../api/auth/useLogout";
import { MdOutlineNewspaper } from "react-icons/md";
import { FaRegCompass } from "react-icons/fa";
import { LuMessagesSquare } from "react-icons/lu";
import { TbSquareRoundedPlus } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { HiOutlineLockClosed } from "react-icons/hi";
import { BiBookmark } from "react-icons/bi";



export default function Root({ children }) {
    const { isLoggedIn, data: user } = useUser();
    const { mutate: logout } = useLogout();

    const profilePopover = children => {
        const content = <div className={styles.popoverWrap}>
            <NavLink to='/profile'><MdOutlinePerson size="1.2em" />Profile</NavLink>
            <NavLink onClick={logout}><MdOutlineLogout size="1.2em" />Logout</NavLink>
        </div>
        return <Popover trigger="click" aria-labelledby="profile-popover" {...{ content, children }} />;
    }
    const navlinks = [
        { icon: MdOutlineNewspaper, title: "Feed", link: "/" },
        { icon: FaRegCompass, title: "Explore", link: "/explore" },
        { icon: LuMessagesSquare, title: "Messages", link: "/messages" },
        { icon: BiBookmark, title: "Saved", link: "/saved", showOnTop: true },
        { icon: TbSquareRoundedPlus, title: "Create", link: "/create", showOnTop: true },
        isLoggedIn
            ? { icon: CgProfile, title: `${user.firstName} ${user.lastName}`, popover: profilePopover }
            : { icon: HiOutlineLockClosed, title: "Sign in/up", link: "/auth?mode=login" }
    ];

    return (
        <>
            <ScrollToTop />
            <AppSideBar Icon={TbHeartHandshake} title="given'take" nav={navlinks}>
                {children}
                <SnackbarProvider autoHideDuration={5000} anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
                    <Outlet />
                </SnackbarProvider>
            </AppSideBar>
        </>
    );
}