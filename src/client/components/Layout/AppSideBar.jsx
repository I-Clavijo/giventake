// import { Icon } from "../assets/images";

import styles from "./AppSideBar.module.scss";
import { NavLink } from "react-router-dom";
import { TextInput, Tooltip } from "flowbite-react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { MdSearch } from "react-icons/md";


export default function AppSideBar({ children, icon, title, search, nav }) {

	const isSmallDevice = useMediaQuery("only screen and (max-width: 767px)");
	const isWideDevice = useMediaQuery("only screen and (min-width: 1264px)");

	//sidebar/ bottom buttons
	const navLinksMapped = nav.map((item, index) => {
		const topClass = item.showOnTop ? styles.showOnTop : "";

		const content = <><img src={item.icon} className={styles.icon} />
			<div className={styles.title}>{item.title}</div></>;

		let navlink = <NavLink to={item.link} className={styles.linkWrap}>
			{content}
		</NavLink>;

		navlink = isWideDevice ? navlink : <Tooltip content={item.title} style="light" placement={isSmallDevice ? "top" : "right"} className={styles.tooltipCard}>{navlink}</Tooltip>;
		navlink = item.popover?.(<div className={styles.linkWrap}>{content}</div>) || navlink;
		return <div className={topClass} key={index}>{navlink}</div>;
	});

	//top nav buttons
	const topNavLinksMapped = nav.map((item, index) => {
		if (item.showOnTop)
			return <NavLink to={item.link} className={styles.linkWrap} key={index}>
				<img src={item.icon} className={styles.icon} />
			</NavLink>;
	});

	return <>
		<div className={styles.baseCols}>
			<div className={styles.appSideBarWrap}>
				<div className={styles.logo}>{icon}</div>
				<nav className={styles.navWrap}>
					{navLinksMapped}
				</nav>
			</div>
			<div className={styles.pageWrap}>
				{!isSmallDevice && <div className={styles.secondaryNav}>
					<h1 className={styles.logo}>{title}</h1>
					<div className={styles.searchWrap}><TextInput icon={MdSearch} placeholder="Search..." color='light' /></div>
				</div>}
				<div className={styles.innerWrap}>{children}</div>
			</div>
			<div className={styles.topBar}>
				<div className={styles.logo}>{icon}<span>{title}</span></div>
				<div className={styles.searchWrap}>{search}</div>
				<div className={styles.topNavButtons}>{topNavLinksMapped}</div>
			</div>
		</div>
	</>;
}