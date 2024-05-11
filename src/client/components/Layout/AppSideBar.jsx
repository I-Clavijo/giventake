import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { TextInput, Tooltip } from "flowbite-react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { MdSearch } from "react-icons/md";
import profileImg from "../../assets/images/profile-img.jpeg";
import styles from "./AppSideBar.module.scss";

const AppSideBar = ({ children, icon, title, search, nav }) => {
    const isSmallDevice = useMediaQuery("only screen and (max-width: 767px)");
    const isWideDevice = useMediaQuery("only screen and (min-width: 1264px)");

    // State variables
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResult, setSearchResult] = useState(null);
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [matchingUsers, setMatchingUsers] = useState([]);
    const [typingTimeout, setTypingTimeout] = useState(null);

    // Refs
    const searchRef = useRef(null);
    const overlayRef = useRef(null);

    // Effects
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchResult(null);
                setSearchQuery('');
                setIsSearchFocused(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsOverlayVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Helper functions
    const findUsersByPartialName = (partialName) => {
        const users = [
            { name: "John Cena", profilePic: profileImg, id: 1 },
            { name: "Jane Austen", profilePic: profileImg, id: 2 },
            { name: "Jack Black", profilePic: profileImg, id: 3 }
        ];
        return users.filter(user => user.name.toLowerCase().includes(partialName.toLowerCase()));
    };

    // Event handlers
    const handleSearchFocus = () => {
        setIsSearchFocused(true);
    };

    const handleSearchBlur = () => {
        setIsSearchFocused(false);
        setMatchingUsers([]);
    };

    const handleInputChange = (e) => {
        const query = e.target.value.trim(); 
        setSearchQuery(query);
        
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        const newTypingTimeout = setTimeout(() => {
            if (query === "") {
                setMatchingUsers([]);
                setIsSearchFocused(false);
            } else {
                const filteredUsers = findUsersByPartialName(query);
                if (filteredUsers.length > 0) {
                    setMatchingUsers(filteredUsers);
                    setIsSearchFocused(true);
                } else {
                    setMatchingUsers([]);
                    setSearchResult({ name: "User Not Found" }); 
                    setIsSearchFocused(true);
                }
            }
        }, 300);

        setSearchResult(null);
        setTypingTimeout(newTypingTimeout);
    };

    const handleSearchClick = () => {
        setIsOverlayVisible(true);
        setSearchQuery('');
        setIsSearchFocused(true);
    };

    const handleOverlayClick = () => {
        setIsOverlayVisible(false);
        setSearchResult(null); 
        setSearchQuery('');
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setSearchResult(null);
    };

    // Rendering functions
    const renderNavLinks = () => {
        return nav.map((item, index) => {
            const topClass = item.showOnTop ? styles.showOnTop : "";
            const content = (
                <>
                    <img src={item.icon} className={styles.icon} />
                    <div className={styles.title}>{item.title}</div>
                </>
            );

            let navlink = (
                <NavLink to={item.link} className={styles.linkWrap}>
                    {content}
                </NavLink>
            );

            navlink = isWideDevice 
                ? navlink 
                : <Tooltip content={item.title} style="light" placement={isSmallDevice ? "top" : "right"} className={styles.tooltipCard}>{navlink}</Tooltip>;

            navlink = item.popover?.(<div className={styles.linkWrap}>{content}</div>) || navlink;

            return <div className={topClass} key={index}>{navlink}</div>;
        });
    };

    const renderTopNavLinks = () => {
        return nav.map((item, index) => {
            if (item.showOnTop) {
                return (
                    <NavLink to={item.link} className={styles.linkWrap} key={index}>
                        <img src={item.icon} className={styles.icon} />
                    </NavLink>
                );
            }
        });
    };

    return (
        <div className={styles.baseCols}>
            <div className={styles.appSideBarWrap}>
                <div className={styles.logo}>{icon}</div>
                <nav className={styles.navWrap}>
                    {renderNavLinks()}
                </nav>
            </div>
            <div className={styles.pageWrap}>
                {!isSmallDevice && (
                    <div className={styles.secondaryNav}>
                        <h1 className={styles.logo}>{title}</h1>
                        <div className={styles.searchWrap} onClick={handleClearSearch}>
                            <TextInput
                                icon={MdSearch}
                                onClick={handleSearchClick}
                                onChange={handleInputChange}
                                color="light"
                                value={searchQuery}
                                onFocus={handleSearchFocus}
                                onBlur={handleSearchBlur}
                                placeholder={
                                    isSearchFocused
                                        ? searchResult?.name || "Search..."
                                        : "Search..."
                                }
                            />
                            <div className={styles.searchResults} style={{ display: isSearchFocused && matchingUsers.length > 0 ? 'block' : 'none' }}>
                                {matchingUsers.map((user) => (
                                    <div className={styles.searchResult} key={user.id}>
                                        <NavLink to={`/profile/${user.id}`} className={styles.searchLink}>
                                            <div className={styles.userInfo}>
                                                <img src={user.profilePic} alt={user.name} className={styles.profilePic} />
                                                <span className={styles.userName}>{user.name}</span>
                                            </div>
                                        </NavLink>
                                    </div>
                                ))}
                                {isSearchFocused && searchQuery !== '' && matchingUsers.length === 0 && (
                                    <div className={styles.searchResult}>
                                        <span className={styles.userName}>User Not Found</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                <div className={styles.innerWrap}>{children}</div>
                <div className={`${styles.overlay} ${isOverlayVisible ? styles.visible : ""}`} onClick={handleOverlayClick} />
            </div>
            <div className={styles.topBar}>
                <div className={styles.logo}>
                    {icon}
                    <span>{title}</span>
                </div>
                <div className={styles.searchWrap}>{search}</div>
                <div className={styles.topNavButtons}>{renderTopNavLinks()}</div>
            </div>
        </div>
    );
};

export default AppSideBar;
