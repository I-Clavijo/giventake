import React, { useEffect, useState } from 'react'
import { usePosts } from '../api/posts/usePosts'
import { Modal, Table, Tooltip } from 'flowbite-react'
import styles from '../components/Posts/Post.module.scss'
import ReportModal from '../components/Posts/ReportModal'
import { calculateTimeAgo } from '../utils/lib'

// import { setShowReportModal } from '../components/Posts/Post'
import { GiConfirmed } from 'react-icons/gi'
import { FaRegTrashCan } from 'react-icons/fa6'
import { LeftArrow } from '../components/Posts/Arrows'
// import { usePosts } from '../api/posts/usePosts.jsx'

// import useDeletePost from '../../api/posts/useDeletePost'

export default function Moderator() {
  const { data: posts, isLoading: isLoadingPosts } = usePosts({})
  const [openModal, setOpenModal] = useState(false)
  const [postProps, setPostProps] = useState(null)
  const [showReportModal, setShowReportModal] = useState(false)
  // const { data: posts, isLoading, refetch: refetchPosts } = usePosts({ filters })

  const Post = ({
    post,
    userId,
    isLoggedIn,
    onPostAction: onPostActionHandler,
    postId,
    fullName,
    profilePic = '',
    createdAt,
    location = '',
    postPic = '',
    title = '',
    description = '',
    interested = 0,
    isSavedByUser,
    isUserInterested,
    isUserReported,
    postInModal = false,
    openModalHandler,
    isLoading,
    noTitle,
    noDescription,
    noActions,
    isSelf,
    onEdit,
    featuredPost
  }) => {
    // sets how long ago the post was posted
    // const displayDate = new Date(createdAt)
    const [timeAgo, setTimeAgo] = useState('')

    useEffect(() => {
      setTimeAgo(calculateTimeAgo(createdAt))

      // Update the time every minute
      const interval = setInterval(calculateTimeAgo, 60000)

      //interval cleanup
      return () => clearInterval(interval)
    }, [createdAt])

    const postTag = (
      <div className={`${styles.post} ${isUserReported ? styles.reportedPost : ''}`}>
        <div className={isUserReported ? styles.reportedPostInnerWrap : ''}>
          {(!noTitle || postInModal) && (
            <div className={styles.postHeader}>
              <div className="flex">
                {profilePic && <img src={profilePic} alt="Profile" className={styles.profilePic} />}
                <div>
                  <h6>{fullName}</h6>
                  <p>
                    {timeAgo} {location?.city && location?.country && `• ${location.city}, ${location.country}`}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className={styles.postBody}>
            <div
              {...{
                style: { cursor: 'pointer' }
              }}>
              {postPic && (
                <div className={styles.imgCrop}>
                  <img src={postPic} alt="Post" />
                </div>
              )}
              <p>{description}</p>
            </div>
          </div>
        </div>
      </div>
    )

    return (
      <>
        <ReportModal show={showReportModal} onClose={() => setShowReportModal(false)} {...{ postId, isUserReported }} />
        {isLoading ? <PostSkeleton /> : postTag}
      </>
    )
  }

  return (
    <div className="overflow-x-auto">
      <Modal size="md" dismissible show={openModal} onClose={() => setOpenModal(false)} className={styles.modalWrap}>
        <Post
          postId={postProps?._id}
          fullName={`${postProps?.user.firstName} ${postProps?.user.lastName}`}
          profilePic={postProps?.user?.imgUrl}
          helpDate={postProps?.helpDate}
          createdAt={postProps?.createdAt}
          location={postProps?.location}
          postPic={postProps?.imgUrl}
          description={postProps?.description}
          isUserInterested={postProps?.isUserInterested}
          isUserReported={postProps?.isUserReported}
        />
      </Modal>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Report Reason</Table.HeadCell>
          <Table.HeadCell>Total Reports</Table.HeadCell>
          <Table.HeadCell>Post Title</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y" style={{ cursor: 'pointer' }}>
          {posts &&
            !isLoadingPosts &&
            posts.map(post => {
              return (
                <>
                  <Table.Row
                    key={post?._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    onClick={() => {
                      setPostProps(post)
                      setOpenModal(true)
                    }}>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {post?.reportedPost}
                    </Table.Cell>
                    <Table.Cell>{post?.userReported}</Table.Cell>
                    <Table.Cell>{post?.title}</Table.Cell>

                    <Table.Cell>
                      <button style={{ width: 'fit-content', color: 'blue', display: 'flex', alignItems: 'center' }}>
                        <FaRegTrashCan /> delete
                      </button>
                    </Table.Cell>
                    <Table.Cell>
                      <button
                        style={{ width: 'fit-content', color: 'blue', display: 'flex', alignItems: 'center' }}
                        onClick={event => {
                          setShowReportModal(false)
                        }}>
                        <GiConfirmed /> approve
                      </button>
                    </Table.Cell>
                  </Table.Row>
                </>
              )
            })}
        </Table.Body>
      </Table>
    </div>
  )
}
