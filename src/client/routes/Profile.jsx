import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Tabs } from 'flowbite-react'
import Stars from '../components/Reviews/Stars'
import { useUser } from '../api/users/useUser.jsx'
import { HiChartSquareBar, HiUserCircle } from 'react-icons/hi'
import styles from './Profile.module.scss'
import ProfileImg from '../assets/images/profile-img.jpeg'
import { HiOutlinePencilSquare } from 'react-icons/hi2'
import Feed, { showAs } from '../components/Posts/Feed.jsx'
import ReviewsFeed from '../components/Reviews/ReviewsFeed.jsx'
import { EditProfileModal } from '../components/Profile/EditProfileModal.jsx'
import { usePosts } from '../api/posts/usePosts.jsx'
import PageError from '../utils/PageError.js'
import { ReviewAskModal } from '../components/Reviews/ReviewAskModal.jsx'
import { useReviews } from '../api/reviews/useReviews.jsx'
import { FriendsListModal, modes } from '../components/Profile/FriendsListModal.jsx'
import { useFriendAction } from '../api/friends/useFriendAction.jsx'
import { useFriends } from '../api/friends/useFriends.jsx'
import { usePostAction } from '../api/posts/usePostAction.jsx'

const Profile = ({ isMyProfile }) => {
  let { id: userId } = useParams()
  const navigate = useNavigate()

  const { data: authUser, isLoggedIn } = useUser()
  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isErrorUser,
    isSuccess: isSuccessUser
  } = useUser({ userId, enabled: isMyProfile ? true : !!userId })
  if (!isMyProfile && isErrorUser && !user)
    throw new PageError('Profile page not found.', 'Are you sure you are in the right page?')

  // navigate the user to his own profile page if he visit it as a guest.
  useEffect(() => {
    if (userId !== undefined && userId === authUser?._id) navigate('/profile')
  }, [userId, user?._id])

  const { mutate: friendAction } = useFriendAction()

  const filters = {
    userId: isMyProfile && user?._id ? user._id : userId
  }
  const { data: posts, isLoading: isLoadingPosts } = usePosts({
    filters,
    enabled: isMyProfile ? true : !!userId && isSuccessUser
  })

  const { data: reviews } = useReviews({
    filters,
    enabled: isMyProfile ? true : !!userId && isSuccessUser
  })

  const { data: friends, isLoading: friendsIsLoading } = useFriends({
    userId: isMyProfile && user?._id ? user._id : userId,
    enabled: isMyProfile ? true : !!userId && isSuccessUser
  })

  const [showEditModal, setShowEditModal] = useState(false)

  const [showFriendsModal, setShowFriendsModal] = useState(false)
  const [friendsListMode, setFriendsListMode] = useState()
  const { mutate: postAction } = usePostAction({ filters })

  const interestsSepByDots = user?.interests?.map((interest, index) => (
    <span key={index}>
      {' '}
      {interest} {index < user.interests.length - 1 ? '•' : ''}
    </span>
  ))

  let txtLocation = ''
  if (user?.location?.city) {
    txtLocation = user.location.city
    if (user.location.country) txtLocation += `, ${user.location.country}`
  }

  const onFollowersClickHandler = () => {
    setShowFriendsModal(true)
    setFriendsListMode(modes.FOLLOWERS)
  }
  const onFollowingClickHandler = () => {
    setShowFriendsModal(true)
    setFriendsListMode(modes.FOLLOWING)
  }

  const onMessageHandler = () => {
    if (userId) {
      navigate('/messages', { state: { selectedContactDirect: { user } } })
    }
  }

  const onFriendHandler = () => {
    if (friends) {
      let actions
      if (friends.isAuthUserIsFollowing) actions = { unfollow: 1 }
      else actions = { follow: 1 }

      friendAction({ toUser: userId, actions })
    }
  }

  return (
    <>
      {user && (
        <>
          <div className={styles.profileInfo}>
            <div className={styles.profileLeft}>
              <img
                className="w-28 h-28 mb-2  rounded-full shadow-lg"
                src={user.imgUrl ? user.imgUrl : ProfileImg}
                alt="Profile image"
              />
            </div>
            <div className={styles.profileLeft}>
              <h5 className="ml-2 text-xxl font-large text-gray-900 dark:text-white">
                {user.firstName} {user.lastName}
              </h5>
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
                  <p className={styles.statNumber}>{posts?.length || '-'}</p>
                  <p className={styles.statText}>Posts</p>
                </div>
                <div className={styles.stat} onClick={onFollowersClickHandler} style={{ cursor: 'pointer' }}>
                  <p className={styles.statNumber}>{friends?.followers?.length ?? '-'}</p>
                  <p className={styles.statText}>Followers</p>
                </div>
                <div className={styles.stat} onClick={onFollowingClickHandler} style={{ cursor: 'pointer' }}>
                  <p className={styles.statNumber}>{friends?.following?.length ?? '-'}</p>
                  <p className={styles.statText}>Following</p>
                </div>
                <FriendsListModal
                  show={showFriendsModal}
                  onClose={() => setShowFriendsModal(false)}
                  mode={friendsListMode}
                  isLoading={friendsIsLoading}
                  {...{ friends, isMyProfile }}
                />
              </div>

              {isMyProfile && (
                <div className={styles.actions}>
                  <Button size="sm" color="light" onClick={() => setShowEditModal(true)}>
                    <HiOutlinePencilSquare className="mr-2 h-5 w-5" />
                    Edit Profile
                  </Button>
                  <EditProfileModal show={showEditModal} onClose={() => setShowEditModal(false)} />
                </div>
              )}
              {!isMyProfile && (
                <div className={styles.actions}>
                  {/* <Link to="/messages"> */}
                  <Button size="xs" color="gray" style={{ padding: '5px' }} onClick={onMessageHandler}>
                    Message
                  </Button>
                  {/* </Link> */}
                  {friends && (
                    <Button
                      size="xs"
                      {...(friends.isAuthUserIsFollowing ? { color: 'gray' } : { className: 'button' })}
                      style={{ padding: '5px' }}
                      onClick={onFriendHandler}>
                      {friends.isAuthUserIsFollowing ? 'Unfollow' : 'Follow'}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>

          <Tabs aria-label="Default tabs" style="default" className="flex justify-center mt-2">
            <Tabs.Item active title="Posts" icon={HiUserCircle} className="tabItem">
              {posts && (
                <Feed
                  posts={posts}
                  styleOrder={showAs.MASONRY}
                  isLoading={isLoadingPosts}
                  noTitle
                  {...(isMyProfile && { noActions: true })}
                  onPostAction={postAction}
                  {...{ isLoggedIn }}
                />
              )}
            </Tabs.Item>

            <Tabs.Item title="Reviews" icon={HiChartSquareBar} className="tabItem">
              <ReviewsFeed reviews={reviews} />
            </Tabs.Item>
            {/* <Tabs.Item title="Following" icon={HiClipboardList} className="tabItem">
          <FriendsTable />
        </Tabs.Item> */}
          </Tabs>
        </>
      )}
    </>
  )
}

export default Profile
