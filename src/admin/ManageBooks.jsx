import { Theme } from "@radix-ui/themes";
import React, { useState, useEffect, useRef } from "react";
import { Table, Button, AlertDialog, Flex } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Notification from "../components/Notifiaction/Notification"; // Import the Notification component

const ManageBook = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const timeoutRefs = useRef([]);

  // Fetch books from API on component mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/books");
        setBooks(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch books");
        setLoading(false);
        addNotification("error", "Failed to fetch books");
        console.error("Error fetching books:", err);
      }
    };
    fetchBooks();
  }, []);

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      setBooks(books.filter((book) => book.book_id !== id));
      addNotification("success", "Book deleted successfully");
      console.log(`Deleted book with ID: ${id}`);
    } catch (err) {
      console.error("Error deleting book:", err);
      addNotification("error", "Failed to delete book");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
                          Are you sure? This book will be permanently deleted and cannot be recovered.
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
        <Notification notifications={notifications} onClose={removeNotification} />
      </div>
    </Theme>
  );
};

export default ManageBook;