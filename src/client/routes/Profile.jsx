import { useState } from 'react';
import { Link, useLocation, useNavigate, useParams, useSearchParams, json } from 'react-router-dom';
import { Card, Button, Tabs } from "flowbite-react";
import Stars from '../components/Stars';
import { useUser } from '../api/user/useUser';
import { HiChartSquareBar, HiClipboardList, HiUserCircle } from "react-icons/hi";
import styles from './Profile.module.scss';
import ProfileImg from '../assets/images/profile-img.jpeg';
import { HiOutlinePencilSquare } from "react-icons/hi2";
import Feed, { showAs } from "../components/Posts/Feed.jsx";
import ReviewsFeed from "../components/Profile/Reviews.jsx";
import { FriendsTable } from '../components/Profile/ListOfFriends.jsx';
import { EditProfileModal } from '../components/Profile/EditProfileModal.jsx';
import { Rate } from "../components/Profile/Rate.jsx";
import { usePosts } from '../api/posts/usePosts.jsx';
import PageError from '../utils/PageError.js';


const Profile = () => {
  let { id: userId } = useParams();
  const isMyProfile = !userId;

  const { data: user, isLoading: isLoadingUser, isError: isErrorUser } = useUser({ userId });
  if (isErrorUser) throw new PageError('Profile page not found.', 'Are you sure you are in the right page?');

  const { data: posts, isLoading: isLoadingPosts } = usePosts({ userId });

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);


  const interestsSepByDots = user?.interests?.map((interest, index) => (
    <span key={index}>
      {interest} {index < user.interests.length - 1 ? '•' : ''}
    </span>
  ));

  let txtLocation = '';
  if (user.location.city) {
    txtLocation = user.location.city;
    if (user.location.country) txtLocation += `, ${user.location.country}`;
  }
  

  return <>
    {user && <>

      <div className={styles.profileInfo}>
        <div className={styles.profileLeft}>
          <img className="w-28 h-28 mb-2  rounded-full shadow-lg" src={user.imgUrl ? user.imgUrl : ProfileImg} alt="Profile image" />
          <h5 className="ml-2 text-xxl font-large text-gray-900 dark:text-white">{user.firstName} {user.lastName}</h5>
          <span className="text-sm ml-2 text-gray-500 dark:text-gray-400">{txtLocation}</span>
          <div className="pb-1 ml-2 extra">
            <Stars grade={user.rating || 0} />
            <p className={styles.interests}>{interestsSepByDots}</p>
            <p className={styles.info}>{user.bio}</p>
          </div>
        </div>

        <div className={styles.profileRight}>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <p className={styles.statNumber}>3</p>
              <p className={styles.statText}>Posts</p>
            </div>
            <div className={styles.stat}>
              <p className={styles.statNumber}>10</p>
              <p className={styles.statText}>Followers</p>
            </div>
            <div className={styles.stat}>
              <p className={styles.statNumber}>20</p>
              <p className={styles.statText}>Following</p>
            </div>
          </div>

          {isMyProfile && (
            <div className={styles.actions}>
              <Button color="light" className={styles.btnEdit} onClick={() => setShowEditModal(true)}>
                <HiOutlinePencilSquare className="mr-2 h-5 w-5" />
                Edit Profile
              </Button>
              <EditProfileModal show={showEditModal} onClose={() => setShowEditModal(false)} />

              <Button onClick={() => setShowReviewModal(true)} className='button'>Review Latest Activity</Button>
              <Rate show={showReviewModal} onClose={() => setShowReviewModal(false)} />
            </div>
          )}
          {!isMyProfile && (
            <div className={styles.actions}>
              <Link to="/messages">
                <Button color="light">Message</Button>
              </Link>
              <Button>Follow Me</Button>
            </div>
          )}
        </div>
      </div>


      <Tabs aria-label="Default tabs" style="default" className="flex justify-center mt-2">

        <Tabs.Item active title="Posts" icon={HiUserCircle} className="tabItem">
          {posts &&
            // FIXME: add property to Feed 'showTitle={false}'
            <Feed posts={posts} styleOrder={showAs.MASONRY} isLoading={isLoadingPosts} />
          }

        </Tabs.Item>

        <Tabs.Item title="Reviews" icon={HiChartSquareBar} className="tabItem">
          This is <span className="font-medium text-gray-800 dark:text-white">Dashboard tab's associated content</span>.
          {/*<ReviewsFeed reviews={reviews}/>*/}
        </Tabs.Item>
        <Tabs.Item title="Following" icon={HiClipboardList} className="tabItem">
          <FriendsTable />
        </Tabs.Item>
      </Tabs>
    </>
    }
  </>;
};

export default Profile;