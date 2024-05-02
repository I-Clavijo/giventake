import styles from './Explore.module.scss';
import FeaturedCategories from "../components/Posts/FeaturedCategories.jsx";
import Feed, { showAs } from "../components/Posts/Feed.jsx";
import { usePosts } from "../api/posts/usePosts.jsx";
import { Spinner } from "flowbite-react";


export default function Explore() {
  const { data: posts, isLoading } = usePosts();

  // only for test purposes
  // if (posts && !isLoading) {
  //   console.log('first', posts)
  //   const postExample = posts[0];
  //   for (let i = 0; i < 10; i++) {
  //     posts.push(postExample);
  //   }
  //   console.log(posts);
  // }

  return <>
    {posts && !isLoading ?
      <div className={styles.feedWrap}>
        <FeaturedCategories />
        <h4 className='mb-0'>Explore</h4>
        <Feed {...{ posts }} styleOrder={showAs.MASONRY} />
      </div>
      :
      <Spinner />
    }
  </>;
}