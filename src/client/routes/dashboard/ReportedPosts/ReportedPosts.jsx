import { $Wrapper } from './ReportedPosts.styled'
import { useEffect, useState, Fragment } from 'react'
import { Button, Modal, Table } from 'flowbite-react'
import { GiConfirmed } from 'react-icons/gi'
import { FaRegTrashCan } from 'react-icons/fa6'
import { MdOutlineOpenInNew } from 'react-icons/md'
import { useReportedPosts } from '../../../api/editor/useReportedPosts'
import { REPORTS_REASONS } from '../../../utils/staticData'
import Post from '../../../components/Posts/Post'
import { useInView, InView } from 'react-intersection-observer'
import { usePostReports } from '../../../api/editor/usePostReports'
import PostReports from './PostReports'

export default function ReportedPosts() {
  const {
    data: reportedPosts,
    fetchNextPage: fetchNextPageReportedPosts,
    hasNextPage: hasNextPageReportedPosts
  } = useReportedPosts()
  const { ref: refReportedPosts, inView: inViewReportedPosts } = useInView() // infintie scrolling

  const [currPostModal, setCurrPostModal] = useState()
  const [currRowAccordion, setCurrRowAccordion] = useState()

  const {
    data: postReports,
    fetchNextPage: fetchNextPagePostReports,
    hasNextPage: hasNextPagePostReports
  } = usePostReports({ postId: currRowAccordion?.post._id, enabled: !!currRowAccordion })
  console.log(postReports)

  const openRowHandler = reportedPost => {
    setCurrRowAccordion(prev => (prev !== reportedPost ? reportedPost : -1))
  }

  const openPostHandler = (e, reportedPost) => {
    e.stopPropagation()

    setCurrPostModal(reportedPost)
  }

  // on InView auto fetch next page
  useEffect(() => {
    if (inViewReportedPosts) {
      fetchNextPageReportedPosts()
    }
  }, [inViewReportedPosts])

  // prepare post params for post modal
  let postParams = {}
  const post = currPostModal
  if (post) {
    postParams = {
      postId: post._id,
      userId: post.user._id,
      fullName: `${post.user.firstName} ${post.user.lastName}`,
      profilePic: post.user?.imgUrl,
      helpDate: post.helpDate,
      createdAt: post.createdAt,
      location: post?.location,
      postPic: post.imgUrl,
      title: post?.title,
      description: post.description,
      likes: post.usersSaved?.length || 0,
      interested: post.usersInterested?.length || 0,
      isSavedByUser: post.isSavedByUser,
      isUserInterested: post.isUserInterested,
      isUserReported: post.isUserReported,
      isSelf: post.isSelf
    }
  }

  return (
    <$Wrapper>
      <div className="overflow-x-auto">
        <h2 className="pageTitle">Reported posts</h2>

        <Post
          {...postParams}
          noActions
          {...{ post }}
          onlyModal={{
            showModal: !!currPostModal,
            onModalClose: () => setCurrPostModal(null)
          }}
        />

        <Table className="tblPostsReports">
          <Table.Head>
            <Table.HeadCell>Post title</Table.HeadCell>
            <Table.HeadCell>Report Reasons</Table.HeadCell>
            <Table.HeadCell>Total Reports</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {reportedPosts?.pages.map(page => {
              return page?.docs.map(reportedPost => (
                <Fragment key={reportedPost._id}>
                  <Table.Row
                    onClick={() => openRowHandler(reportedPost)}
                    style={{ cursor: 'pointer', borderBottom: '1px #ddd solid' }}>
                    <Table.Cell>
                      <div className="flex gap-1 items-center">
                        <span>{reportedPost.post.title}</span>
                        <Button
                          color="light"
                          style={{ padding: '.1em' }}
                          size="xs"
                          onClick={e => openPostHandler(e, reportedPost.post)}>
                          <MdOutlineOpenInNew className="mr-1" />
                          <span style={{ fontSize: '.9em' }}>View post</span>
                        </Button>
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      {reportedPost.reportReasons.map(reportReason => REPORTS_REASONS[reportReason]).join(', ')}
                    </Table.Cell>
                    <Table.Cell>{reportedPost.totalReports}</Table.Cell>
                  </Table.Row>

                  {/* opened accordion */}
                  {currRowAccordion?._id === reportedPost._id && (
                    <Table.Row className="accordionOpenedBox">
                      <Table.Cell colSpan={3}>
                        <PostReports {...{ postReports }} />

                        <div className="flex gap-1 mt-4 justify-center">
                          <Button color="failure" size="xs">
                            <FaRegTrashCan size="1.2em" className="mr-2" /> Delete post
                          </Button>
                          <Button color="blue" size="xs">
                            <GiConfirmed size="1.2em" className="mr-2" />
                            Set all reports as OK
                          </Button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  )}
                </Fragment>
              ))
            })}
            <Table.Row>
              <Table.Cell colSpan={3}>
                <InView as="div" className="flex justify-center">
                  {hasNextPageReportedPosts ? (
                    <Button ref={refReportedPosts} size="xs" color="light" onClick={fetchNextPageReportedPosts}>
                      Load more...
                    </Button>
                  ) : (
                    <>No more results.</>
                  )}
                </InView>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </$Wrapper>
  )
}
