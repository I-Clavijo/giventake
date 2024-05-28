import { useState } from 'react'
import { $Wrapper, $Tabs, $TabItem } from './PostReports.styled'
import { Table } from 'flowbite-react'

const TABS = {
  Pending: 'Pending',
  Valid: 'Valid'
}

const PostReports = () => {
  const [selectedTab, setSelectedTab] = useState(TABS.Pending)

  return (
    <$Wrapper>
      <$Tabs>
        {Object.keys(TABS).map(currTab => (
          <$TabItem key={currTab} $isActive={selectedTab === currTab} onClick={() => setSelectedTab(currTab)}>
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
    </$Wrapper>
  )
}

export default PostReports
