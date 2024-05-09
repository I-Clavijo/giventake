import styles from './Explore.module.scss';
import FeaturedCategories from "../components/Posts/FeaturedCategories.jsx";
import Feed, { showAs } from "../components/Posts/Feed.jsx";
import { usePosts } from "../api/posts/usePosts.jsx";
import { Spinner } from "flowbite-react";
import FeedFilters from '../components/Posts/FeedFilters.jsx';
import { useUser } from '../api/users/useUser.jsx';
import { useState } from 'react';


export default function Explore() {
  const { data: user, isLoading: isLoadingUser, isError: isErrorUser } = useUser();
  const [filters, setFilters] = useState({
    location: user.location,
  });
  const { data: posts, isLoading } = usePosts({ filters });

  return <>
    <div className={styles.feedWrap}>
      <FeaturedCategories />
      <FeedFilters {...{ filters, setFilters }} />
      <hr />
      <h4 className='mb-0 font-normal'>Explore</h4>
      {posts && !isLoading
        ? <Feed {...{ posts }} styleOrder={showAs.MASONRY} />
        : <Spinner />
      }
    </div>
  </>;
}