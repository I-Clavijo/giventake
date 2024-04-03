// import { Icon } from "../assets/images";

import styles from "./AppSideBar.module.scss";
import { NavLink } from "react-router-dom";

import HomeIcon from "../assets/images/home-icon.svg";
import SearchIcon from "../assets/images/search-icon.svg";
import ExploreIcon from "../assets/images/explore-icon.svg";
import MessagesIcon from "../assets/images/messages-icon.svg";
import LikedIcon from "../assets/images/liked-icon.svg";
import CreateIcon from "../assets/images/create-icon.svg";

const navlinks = [
	{ icon: HomeIcon, title: "Home", link: "/"},
	{ icon: SearchIcon, title: "Search", link: "/search"},
	{ icon: ExploreIcon, title: "Explore", link: "/explore"},
	{ icon: MessagesIcon, title: "Messages", link: "/messages"},
	{ icon: LikedIcon, title: "Liked", link: "/liked"},
	{ icon: CreateIcon, title: "Create", link: "/create"},
	{ icon: CreateIcon, title: "Profile", link: "/profile"}
];
export default function AppSideBar() {

	const navLinksMapped = navlinks.map((item,index) => 
		<NavLink to={item.link} className={styles.linkWrap} key={index}>
			<div><img src={item.icon} /></div>
			<div>{item.title}</div>
		</NavLink>		
	);
	
	return (
		<div className={styles.appSideBarWrap}>
			<div className={styles.logo}>
				Given'take
			</div>
			<nav className={styles.navWrap}>
				{navLinksMapped}
			</nav>
		</div>
	);
}