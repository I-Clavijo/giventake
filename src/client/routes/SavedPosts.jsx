import styles from "./Home.module.scss";
import { usePosts } from "../api/posts/usePosts.jsx";
import { Spinner } from "flowbite-react";
import Feed, { showAs } from "../components/Posts/Feed.jsx";


export default function SavedPosts() {
  const { data: posts, isLoading } = usePosts();

  return <>
    {posts && !isLoading ?
      <div className={styles.feedWrap}>
        <h4 className='mb-0'>Saved for later</h4>
        <Feed {...{ posts }} styleOrder={showAs.MASONRY} noActions />
      </div>
      :
      <Spinner />
    }
  </>;
}