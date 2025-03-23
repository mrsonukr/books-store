import React, { useState, useEffect, useRef } from "react";
import "./css/UploadBook.css"; // Reusing the same CSS file
import { Button } from "@radix-ui/themes";
import { Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Notification from "../components/Notifiaction/Notification"; // Import the Notification component

const EditBook = () => {
  const navigate = useNavigate();
  // Hardcoded single book data from SQL dump
  const initialBookData = {
    book_id: 2,
    title: "Mystery of the Lost Island",
    author: "Jane Smith",
    imageurl: "/assets/images/book2.png",
    category: "Mystery",
    description: "A gripping mystery novel that keeps you guessing till the end.",
    pdfurl: "",
    price: "14.99",
  };

  const [formData, setFormData] = useState(initialBookData);
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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate updating the book
    const updatedBook = {
      book_id: initialBookData.book_id, // Keep the same ID
      book_name: formData.title,
      book_image: formData.imageurl || "/assets/images/default-book.png",
      price: parseFloat(formData.price) || 0.0,
      author_name: formData.author,
      rating: null,
      summary: formData.description,
      category: formData.category,
      pdf_link: formData.pdfurl || null,
    };

    // Optionally update localStorage (simulating persistence)
    const storedBooks = JSON.parse(localStorage.getItem("uploadedBooks")) || [];
    const updatedBooks = storedBooks.map((book) =>
      book.book_id === updatedBook.book_id ? updatedBook : book
    );
    // If the book isn't in localStorage yet, add it
    if (!storedBooks.some((book) => book.book_id === updatedBook.book_id)) {
      updatedBooks.push(updatedBook);
    }
    localStorage.setItem("uploadedBooks", JSON.stringify(updatedBooks));

    // Show success notification and redirect
    addNotification("success", "Book updated successfully!");
    console.log("Book updated successfully:", updatedBook);
    setTimeout(() => navigate("/admin/managebook"), 1000); // Delay redirect to show notification
  };

  return (
    <div className="p-6">
      <form className="upbook-form" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-semibold mb-4">Edit Book Details</h1>

        {/* Title and Author */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Book Title</label>
            <input
              type="text"
              name="title"
              placeholder="Edit Book Name"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author Name</label>
            <input
              type="text"
              name="author"
              placeholder="Edit Author Name"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Image URL and Category */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="imageurl">Book Image URL</label>
            <input
              type="text"
              name="imageurl"
              placeholder="Edit Image URL"
              value={formData.imageurl}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Book Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Biography">Biography</option>
              <option value="Science">Science</option>
              <option value="History">History</option>
              <option value="Children">Children</option>
              <option value="Fantasy">Fantasy</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div className="form-group mb-4">
          <label htmlFor="description">Book Description</label>
          <textarea
            name="description"
            rows="4"
            placeholder="Edit Book Description…"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* PDF URL and Price */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="pdfurl">Book PDF URL</label>
            <input
              type="text"
              name="pdfurl"
              placeholder="Edit PDF URL"
              value={formData.pdfurl}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              placeholder="Edit Price (e.g., 19.99)"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              required
            />
          </div>
        </div>

        {/* Button */}
        <Button className="upload-button" type="submit">
          {<Upload size={18} />} Update Book
        </Button>
      </form>
      <Notification notifications={notifications} onClose={removeNotification} />
    </div>
  );
};

export default EditBook;