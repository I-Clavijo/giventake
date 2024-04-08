import styles from "./Explore.module.scss";
import FeaturedCategories from "../components/FeaturedCategories.jsx";


export default function Explore() {
	return (
		<>	
			<div className={styles.block}>
				<FeaturedCategories />
            </div>
		</>
	);
}