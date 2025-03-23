import React, { useState, useEffect, useRef } from "react";
import "./css/UploadBook.css";
import { Button } from "@radix-ui/themes";
import { Upload } from "lucide-react";
import axios from "axios";
import Notification from "../components/Notifiaction/Notification"; // Import the Notification component


const UploadBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    imageurl: "",
    category: "",
    description: "",
    pdfurl: "",
    price: "",
  });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/books", {
        book_name: formData.title,
        book_image: formData.imageurl,
        price: parseFloat(formData.price) || 0.00,
        author_name: formData.author,
        rating: null,
        summary: formData.description,
        category: formData.category,
        pdf_link: formData.pdfurl,
      });
      console.log("Book uploaded successfully:", response.data);
      addNotification("success", "Book uploaded successfully!");
      setFormData({
        title: "",
        author: "",
        imageurl: "",
        category: "",
        description: "",
        pdfurl: "",
        price: "",
      });
    } catch (error) {
      console.error("Error uploading book:", error);
      addNotification("error", "Failed to upload book. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <form className="upbook-form" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-semibold mb-4">Upload New Books</h1>
        
        {/* Title and Author */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Book Title</label>
            <input
              type="text"
              name="title"
              placeholder="Book Name"
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
              placeholder="Author Name"
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
              placeholder="Image URL"
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
            placeholder="Book Description…"
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
              placeholder="PDF URL"
              value={formData.pdfurl}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              placeholder="Price (e.g., 19.99)"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button className="upload-button" type="submit">
          {<Upload size={18} />} Publish Book
        </Button>
      </form>
      <Notification notifications={notifications} onClose={removeNotification} />
    </div>
  );
};

export default UploadBook;