// import { Icon } from "../assets/images";

import styles from "./AppSideBar.module.scss";
import { NavLink } from "react-router-dom";
import { TextInput, Tooltip } from "flowbite-react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { MdSearch } from "react-icons/md";
import { useState } from "react";
import profileImg from "../../assets/images/profile-img.jpeg";


export default function AppSideBar({ children, icon, title, search, nav }) {

	const isSmallDevice = useMediaQuery("only screen and (max-width: 767px)");
	const isWideDevice = useMediaQuery("only screen and (min-width: 1264px)");

	const [searchQuery, setSearchQuery] = useState("");
    const [searchResult, setSearchResult] = useState(null);
	const handleSearch = () => {
        const user = findUserByName(searchQuery);
        if (user) {
            setSearchResult(user);
        } else {
            setSearchResult(null);
        }
    };
	const findUserByName = (name) => {
       
        // This function should return the user object if found, otherwise null
		const users = [
			{ name: "John", profilePic: profileImg },
			{ name: "Jane", profilePic: profileImg }
		];
        return users.find(user => user.name === name);
    };

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };
	//overlay varibels
	const [isOverlayVisible, setIsOverlayVisible] = useState(false);
	const handleSearchClick = () => {
		setIsOverlayVisible(true);
	  };
	const handleOverlayClick = () => {
	  setIsOverlayVisible(false);
	};

	//sidebar/ bottom buttons
	const navLinksMapped = nav.map((item, index) => {
		const topClass = item.showOnTop ? styles.showOnTop : "";

		const content = <><img src={item.icon} className={styles.icon} />
			<div className={styles.title}>{item.title}</div></>;

		let navlink = <NavLink to={item.link} className={styles.linkWrap}>
			{content}
		</NavLink>;

		// navlink = isWideDevice ? navlink : <Tooltip content={item.title} style="light" placement={isSmallDevice ? "top" : "right"} className={styles.tooltipCard}>{navlink}</Tooltip>;
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
					<div className={styles.searchWrap}>
						<TextInput
							icon={MdSearch}
							onClick={handleSearchClick}
							onChange={handleInputChange}
							placeholder="Search..."
							color='light'
							value={searchResult ? searchResult.name : (searchQuery && 'No user found')}
						/>
					</div>
					
					{searchResult && (
						<div>
							{/* Display search result */}
							<img src={searchResult.profilePic} alt={searchResult.name} />
							<span>{searchResult.name}</span>
						</div>
					)}
				</div>}
				<div className={styles.innerWrap}>{children}</div>
				<div className={`${styles.overlay} ${isOverlayVisible ? styles.visible : ''}`} onClick={handleOverlayClick} />
			</div>
			<div className={styles.topBar}>
				<div className={styles.logo}>{icon}<span>{title}</span></div>
				<div className={styles.searchWrap}>{search}</div>
				<div className={styles.topNavButtons}>{topNavLinksMapped}</div>
			</div>
		</div>
	</>;
}