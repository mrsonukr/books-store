import React, { useState, useEffect, useRef } from "react";
import "./css/UploadBook.css"; // Reusing the same CSS file
import { Button } from "@radix-ui/themes";
import { Upload } from "lucide-react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Notification from "../components/Notifiaction/Notification"; // Import the Notification component

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    imageurl: "",
    category: "",
    description: "",
    pdfurl: "",
    price: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const timeoutRefs = useRef([]);

  // Fetch book data when component mounts
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${id}`);
        const book = response.data.data;
        setFormData({
          title: book.book_name,
          author: book.author_name,
          imageurl: book.book_image || "",
          category: book.category,
          description: book.summary || "",
          pdfurl: book.pdf_link || "",
          price: book.price.toString()
        });
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch book details");
        setLoading(false);
        addNotification("error", "Failed to fetch book details");
        console.error("Error fetching book:", err);
      }
    };
    fetchBook();
  }, [id]);

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/books/${id}`, {
        book_name: formData.title,
        book_image: formData.imageurl,
        price: parseFloat(formData.price),
        author_name: formData.author,
        rating: null,
        summary: formData.description,
        category: formData.category,
        pdf_link: formData.pdfurl,
      });
      addNotification("success", "Book updated successfully!");
      setTimeout(() => navigate("/admin/managebook"), 1000); // Delay redirect to show notification
    } catch (err) {
      console.error("Error updating book:", err);
      addNotification("error", "Failed to update book. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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