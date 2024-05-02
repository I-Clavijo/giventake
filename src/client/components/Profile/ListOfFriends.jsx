import { Table } from "flowbite-react";
import { useState } from "react";

export function FriendsTable() {
  const [mode, setMode] = useState('myOwnContacts');
  const renderActionLink = () => {
    if (mode === "myOwnContacts") {
      return <a href="#" className="font-medium text-red-600 hover:underline dark:text-red-500">Remove</a>;
    } else {
      return <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">Add</a>;
    }
  };
  return (
    <div className="overflow-x-auto">
      <Table striped>
        <Table.Head>
          <Table.HeadCell>ProfilePicture</Table.HeadCell>
          <Table.HeadCell>Friends</Table.HeadCell>
          <Table.HeadCell>Mutual</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Add</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell>$</Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                yahav nir
            </Table.Cell>
            <Table.Cell>10</Table.Cell>
            <Table.Cell>
            {renderActionLink()}
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell>$#</Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Yohai
            </Table.Cell>
            <Table.Cell>30</Table.Cell>
            <Table.Cell>
            {renderActionLink()}
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell>$#@</Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Ori Ben Ezra
            </Table.Cell>
            <Table.Cell>50</Table.Cell>
            <Table.Cell>
            {renderActionLink()}
            </Table.Cell>
          </Table.Row>
          
        </Table.Body>
        {/**
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell>{user.profilePic}</Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {user.firstName}{user.lastName}
            </Table.Cell>
            <Table.Cell>10</Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Add
              </a>
            </Table.Cell>
          </Table.Row>
          
        </Table.Body>
         */}
      </Table>
    </div>
  );
}
