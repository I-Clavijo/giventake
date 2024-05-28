import { $Wrapper, $Tabs, $TabItem } from './Moderator.styled'
import { useState } from 'react'
import { Button, Modal, Table } from 'flowbite-react'
import { GiConfirmed } from 'react-icons/gi'
import { FaRegTrashCan } from 'react-icons/fa6'
import { MdOutlineOpenInNew } from 'react-icons/md'
import { useReportedPosts } from '../api/editor/useReportedPosts'
import { REPORTS_REASONS } from '../utils/staticData'
import Post from '../components/Posts/Post'
import { usePostAction } from '../api/posts/usePostAction'

const TABS = {
  Pending: 'Pending',
  Valid: 'Valid'
}

export default function Moderator() {
  const { data: reportedPosts } = useReportedPosts()

  const [openModal, setOpenModal] = useState(false)
  const [showRowIndex, setShowRowIndex] = useState(-1)
  const [selectedTab, setSelectedTab] = useState(TABS.Pending)
  const [currReportedPost, setCurrReportedPost] = useState()

  const openRowHandler = rowIndex => {
    setShowRowIndex(prev => (prev !== rowIndex ? rowIndex : -1))
  }

  const openPostHandler = (e, reportedPost) => {
    e.stopPropagation()
    setCurrReportedPost(reportedPost)
    console.log('SAV')
  }

  let postParams = {}
  const post = currReportedPost

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
            showModal: !!currReportedPost,
            onModalClose: () => setCurrReportedPost(null)
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
              return page?.docs.map(reportedPost => {
                console.log(reportedPost)

                return (
                  <>
                    <Table.Row
                      key={reportedPost._id}
                      onClick={() => openRowHandler(reportedPost._id)}
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
                    {showRowIndex === reportedPost._id && (
                      <Table.Row key={reportedPost._id + '_accordion-box'} className="accordionOpenedBox">
                        <Table.Cell colSpan={3}>
                          <$Tabs>
                            {Object.keys(TABS).map(currTab => (
                              <$TabItem
                                key={currTab}
                                $isActive={selectedTab === currTab}
                                onClick={() => setSelectedTab(currTab)}>
                                {currTab}
                              </$TabItem>
                            ))}
                          </$Tabs>

                          <Table hoverable className="tblReports">
                            <Table.Head>
                              <Table.HeadCell>Report Reason</Table.HeadCell>
                              <Table.HeadCell>Description</Table.HeadCell>
                              <Table.HeadCell>Date</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y" style={{ cursor: 'pointer' }}>
                              <Table.Row>
                                <Table.Cell>Spam</Table.Cell>
                                <Table.Cell>Bad Bad Bad!</Table.Cell>
                                <Table.Cell>02/10/2024 10:31</Table.Cell>
                              </Table.Row>
                              <Table.Row>
                                <Table.Cell>Spam</Table.Cell>
                                <Table.Cell>Bad Bad Bad!</Table.Cell>
                                <Table.Cell>02/10/2024 10:31</Table.Cell>
                              </Table.Row>
                              <Table.Row>
                                <Table.Cell>Spam</Table.Cell>
                                <Table.Cell>Bad Bad Bad!</Table.Cell>
                                <Table.Cell>02/10/2024 10:31</Table.Cell>
                              </Table.Row>
                            </Table.Body>
                          </Table>

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
                  </>
                )
              })
            })}
          </Table.Body>
        </Table>
      </div>
    </$Wrapper>
  )
}
