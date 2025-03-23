import React from "react";
import "./UpBook.css";
import { Button } from "@radix-ui/themes";
import { Upload } from "lucide-react";
const UpBook = () => {
  return (
    <form className="upbook-form">
      {/* Title and Author */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="title">Book Title</label>
          <input type="text" name="title" placeholder="Book Name" />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author Name</label>
          <input type="text" name="author" placeholder="Author Name" />
        </div>
      </div>

      {/* Image URL and Category */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="imageurl">Book Image URL</label>
          <input type="text" name="imageurl" placeholder="Image URL" />
        </div>
        <div className="form-group">
          <label htmlFor="category">Book Category</label>
          <select name="category">
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
        ></textarea>
      </div>

      {/* PDF URL */}
      <div className="form-group mb-4">
        <label htmlFor="pdfurl">Book PDF URL</label>
        <input type="text" name="pdfurl" placeholder="PDF URL" />
      </div>

      {/* Button */}
      <Button className="upload-button" type="submit">
        {<Upload size={18} />} Publish Book
      </Button>
    </form>
  );
};

export default UpBook;
