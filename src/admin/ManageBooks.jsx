import { Theme } from "@radix-ui/themes";
import React, { useState, useEffect, useRef } from "react";
import { Table, Button, AlertDialog, Flex } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import Notification from "../components/Notifiaction/Notification"; // Import the Notification component

// Hardcoded book data from SQL dump
const staticBooks = [
  {
    book_id: 2,
    book_name: "Mystery of the Lost Island",
    author_name: "Jane Smith",
    category: "Mystery",
    price: 14.99,
  },
  {
    book_id: 3,
    book_name: "Learning React",
    author_name: "Alex Johnson",
    category: "Technology",
    price: 29.99,
  },
  {
    book_id: 4,
    book_name: "Cooking Made Easy",
    author_name: "Emily Clark",
    category: "Cooking",
    price: 9.99,
  },
  {
    book_id: 5,
    book_name: "Echoes of the Past",
    author_name: "Michael Brown",
    category: "Historical Fiction",
    price: 17.50,
  },
  {
    book_id: 6,
    book_name: "Quantum Secrets",
    author_name: "Sarah Lee",
    category: "Biography",
    price: 24.99,
  },
  {
    book_id: 7,
    book_name: "The Silent Forest",
    author_name: "David Kim",
    category: "Thriller",
    price: 12.99,
  },
  {
    book_id: 8,
    book_name: "Python for Beginners",
    author_name: "Laura Evans",
    category: "Technology",
    price: 22.00,
  },
  {
    book_id: 9,
    book_name: "Taste of Italy",
    author_name: "Gina Rossi",
    category: "Cooking",
    price: 15.75,
  },
  {
    book_id: 10,
    book_name: "The Lost Expedition",
    author_name: "Tom Hardy",
    category: "Adventure",
    price: 18.25,
  },
  {
    book_id: 11,
    book_name: "Shadows of Doubt",
    author_name: "Emma Watson",
    category: "Mystery",
    price: 13.99,
  },
  {
    book_id: 12,
    book_name: "Beyond the Stars",
    author_name: "Neil Carter",
    category: "Science Fiction",
    price: 26.50,
  },
];

const ManageBook = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState(staticBooks); // Use static data directly
  const [notifications, setNotifications] = useState([]);
  const timeoutRefs = useRef([]);

  // Notification timeout management
  useEffect(() => {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];

    notifications.forEach((notification) => {
      const timeoutId = setTimeout(() => {
        removeNotification(notification.id);
      }, 5000);
      timeoutRefs.current.push(timeoutId);
    });

    return () => {
      timeoutRefs.current.forEach(clearTimeout);
      timeoutRefs.current = [];
    };
  }, [notifications]);

  const addNotification = (type, message) => {
    const newNotification = {
      id: Date.now(),
      type,
      message,
    };
    setNotifications((prev) => [...prev, newNotification]);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const handleEdit = (id) => {
    navigate(`/admin/managebook/edit/${id}`);
    console.log(`Edit book with ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Simulate deletion by filtering out the book
    setBooks((prevBooks) => prevBooks.filter((book) => book.book_id !== id));
    addNotification("success", "Book deleted successfully");
    console.log(`Deleted book with ID: ${id}`);
  };

  if (books.length === 0) return <div>No books available.</div>;

  return (
    <Theme>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Manage Books</h1>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>S.N.</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Book Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Author Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Category</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {books.map((book, index) => (
              <Table.Row key={book.book_id}>
                <Table.RowHeaderCell>{index + 1}</Table.RowHeaderCell>
                <Table.Cell>{book.book_name}</Table.Cell>
                <Table.Cell>{book.author_name}</Table.Cell>
                <Table.Cell>{book.category}</Table.Cell>
                <Table.Cell>₹{Number(book.price).toFixed(2)}</Table.Cell>
                <Table.Cell>
                  <div className="flex gap-2">
                    <Button
                      color="indigo"
                      size="1"
                      variant="soft"
                      onClick={() => handleEdit(book.book_id)}
                    >
                      Edit
                    </Button>
                    <AlertDialog.Root>
                      <AlertDialog.Trigger>
                        <Button color="red" size="1" variant="soft">
                          Delete
                        </Button>
                      </AlertDialog.Trigger>
                      <AlertDialog.Content maxWidth="450px">
                        <AlertDialog.Title>Delete Book</AlertDialog.Title>
                        <AlertDialog.Description size="2">
                          Are you sure? This book will be permanently deleted
                          and cannot be recovered.
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
                              onClick={() => handleDelete(book.book_id)}
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
        <Notification
          notifications={notifications}
          onClose={removeNotification}
        />
      </div>
    </Theme>
  );
};

export default ManageBook;