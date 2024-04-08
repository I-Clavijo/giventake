import styles from "./Explore.module.scss";
import FeaturedCategories from "../components/FeaturedCategories.jsx";
import FeaturedPosts from "../components/FeaturedPosts.jsx";


export default function Explore() {
	return (
		<>	
			<div className={styles.block}>
				<FeaturedCategories />
				<FeaturedPosts />
            </div>
		</>
	);
}