import { Theme } from "@radix-ui/themes";
import React from "react";
import { Table, Button, AlertDialog, Flex } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

const ManageUsers = () => {
  const navigate = useNavigate();

  // JSON-like data for users with only Buyer and Seller roles
  const users = [
    {
      id: 1,
      name: "Amit Patel",
      email: "amit.patel@example.com",
      role: "Buyer",
      joinedDate: "2025-01-15",
    },
    {
      id: 2,
      name: "Neha Singh",
      email: "neha.singh@example.com",
      role: "Seller",
      joinedDate: "2025-02-10",
    },
    {
      id: 3,
      name: "Rahul Verma",
      email: "rahul.verma@example.com",
      role: "Buyer",
      joinedDate: "2025-03-01",
    },
  ];

  const handleEdit = (id) => {
    navigate(`/admin/manageusers/edit/${id}`);
    console.log(`Edit user with ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete user with ID: ${id}`);
    // Add delete logic here (e.g., API call or state update)
  };

  return (
    <Theme>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Manage Users</h1>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>S.N.</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Joined Date</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {users.map((user, index) => (
              <Table.Row key={user.id}>
                <Table.RowHeaderCell>{index + 1}</Table.RowHeaderCell>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.role}</Table.Cell>
                <Table.Cell>{user.joinedDate}</Table.Cell>
                <Table.Cell>
                  <div className="flex gap-2">
                    <Button
                      color="cyan"
                      size="1"
                      variant="soft"
                      onClick={() => handleEdit(user.id)}
                    >
                      Contact
                    </Button>
                    <AlertDialog.Root>
                      <AlertDialog.Trigger>
                        <Button color="red" size="1" variant="soft">
                          Delete
                        </Button>
                      </AlertDialog.Trigger>
                      <AlertDialog.Content maxWidth="450px">
                        <AlertDialog.Title>Delete User</AlertDialog.Title>
                        <AlertDialog.Description size="2">
                          Are you sure? This user will be permanently deleted and cannot be recovered.
                        </AlertDialog.Description>
                        <Flex gap="3" mt="4" justify="end">
                          <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">
                              Cancel
                            </Button>
                          </AlertDialog.Cancel>
                          <AlertDialog.Action>
                            <Button
                              variant="solid"
                              color="red"
                              onClick={() => handleDelete(user.id)}
                            >
                              Delete
                            </Button>
                          </AlertDialog.Action>
                        </Flex>
                      </AlertDialog.Content>
                    </AlertDialog.Root>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>
    </Theme>
  );
};

export default ManageUsers;