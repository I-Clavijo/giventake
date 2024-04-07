// import { Icon } from "../assets/images";

import styles from "./AppSideBar.module.scss";
import { NavLink } from "react-router-dom";
import { Tooltip } from "flowbite-react";
import { useMediaQuery } from "@uidotdev/usehooks";

export default function AppSideBar({ children, title, search, nav }) {

	const isSmallDevice = useMediaQuery("only screen and (max-width: 767px)");
	const isWideDevice = useMediaQuery("only screen and (min-width: 1264px)");

	//sidebar/ bottom buttons
	const navLinksMapped = nav.map((item,index) => {
		const topClass = item.showOnTop ? styles.showOnTop : "";

		const navlink = <NavLink to={item.link} className={`${styles.linkWrap}`}>
			<img src={item.icon} className={styles.icon} />
			<div className={styles.title}>{item.title}</div>
		</NavLink>;
		
		return <div className={topClass} key={index}>
			{isWideDevice ? 
				navlink : 
				<Tooltip content={item.title} style="light" placement={isSmallDevice? "top":"right"} className={styles.tooltipCard}> {navlink}</Tooltip>}
		</div>;
	});
	
	//top nav buttons
	const topNavLinksMapped = nav.map((item,index) => {
		if (item.showOnTop)
			return <NavLink to={item.link} className={styles.linkWrap} key={index}>
				<img src={item.icon} className={styles.icon} />
			</NavLink>;
	});

	return <>
		 <div className={styles.baseCols}>
			<div className={styles.appSideBarWrap}>
				<div className={styles.logo}>
					{title}
				</div>
				<nav className={styles.navWrap}>
					{navLinksMapped}
				</nav>
			</div>
			<div className={styles.pageWrap}>
				{children}
			</div>
			<div className={styles.topBar}>
				<div className={styles.logo}>{title}</div>
				<div className={styles.searchWrap}>{search}</div>
				<div className={styles.topNavButtons}>{topNavLinksMapped}</div>
			</div>
		</div>            
	</>;
}