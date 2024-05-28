import { $Wrapper, $Tabs, $TabItem } from './Moderator.styled'
import React, { useState } from 'react'
import { Button, Modal, Table } from 'flowbite-react'
import styles from '../components/Posts/Post.module.scss'
import { GiConfirmed } from 'react-icons/gi'
import { FaRegTrashCan } from 'react-icons/fa6'
import { MdOutlineOpenInNew } from 'react-icons/md'
import { useReportedPosts } from '../api/editor/useReportedPosts'

const TABS = {
  Pending: 'Pending',
  Valid: 'Valid'
}

export default function Moderator() {
  const { data: reportedPosts } = useReportedPosts()

  const [openModal, setOpenModal] = useState(false)
  const [showRowIndex, setShowRowIndex] = useState(-1)
  const [selectedTab, setSelectedTab] = useState(TABS.Pending)

  const openRowHandler = rowIndex => {
    setShowRowIndex(prev => (prev !== rowIndex ? rowIndex : -1))
  }
  console.log(reportedPosts)

  const openPostHandler = e => {
    e.stopPropagation()

    console.log('SAV')
  }

  return (
    <$Wrapper>
      <div className="overflow-x-auto">
        <h2 className="pageTitle">Reported posts</h2>
        <Modal size="md" dismissible show={openModal} onClose={() => setOpenModal(false)} className={styles.modalWrap}>
          {/* <Post
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
        /> */}
        </Modal>

        <Table className="tblPostsReports">
          <Table.Head>
            <Table.HeadCell>Post title</Table.HeadCell>
            <Table.HeadCell>Report Reasons</Table.HeadCell>
            <Table.HeadCell>Total Reports</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            <Table.Row onClick={() => openRowHandler(0)} style={{ cursor: 'pointer', borderBottom: '1px #ddd solid' }}>
              <Table.Cell>
                <div className="flex gap-1 items-center">
                  <span>Borrow saw blades</span>
                  <Button color="light" style={{ padding: '.1em' }} size="xs" onClick={e => openPostHandler(e)}>
                    <MdOutlineOpenInNew className="mr-1" />
                    <span style={{ fontSize: '.9em' }}>View post</span>
                  </Button>
                </div>
              </Table.Cell>
              <Table.Cell>Spam, Bad language</Table.Cell>
              <Table.Cell>2</Table.Cell>
            </Table.Row>

            {/* opened accordion */}
            {showRowIndex === 0 && (
              <Table.Row>
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
          </Table.Body>
        </Table>
      </div>
    </$Wrapper>
  )
}
