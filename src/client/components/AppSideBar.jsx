// import { Icon } from "../assets/images";

import styles from "./AppSideBar.module.scss";
import { NavLink } from "react-router-dom";


export default function AppSideBar({ children, title, search, nav }) {

	//sidebar/ bottom buttons
	const navLinksMapped = nav.map((item,index) => {
		const topClass = item.showOnTop ? styles.showOnTop : "";
		return <NavLink to={item.link} className={`${styles.linkWrap} ${topClass}`} key={index}>
			<img src={item.icon} className={styles.icon} />
			<div className={styles.title}>{item.title}</div>
		</NavLink>	
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