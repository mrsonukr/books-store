const db = require("../config/db");

// Helper function to execute database queries
const executeQuery = (
  res,
  query,
  values = [],
  successMessage,
  notFoundMessage
) => {
  db.query(query, values, (err, result) => {
    if (err) {
      console.error(`Database error: ${err.message}`, err);
      return res
        .status(500)
        .json({ error: "Database query failed", details: err.message });
    }
    if (Array.isArray(result) && result.length === 0) {
      return res
        .status(404)
        .json({ error: notFoundMessage || "Resource not found" });
    }
    if (!Array.isArray(result) && result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: notFoundMessage || "Resource not found" });
    }
    res.status(200).json({
      status: "success",
      message: successMessage,
      ...(Array.isArray(result)
        ? { data: result.length === 1 ? result[0] : result }
        : { book_id: result.insertId }),
    });
  });
};

// Validate required fields
const validateBookData = ({ book_name, author_name, category, price }) => {
  if (!book_name || !author_name || !category || price === undefined) {
    return "Missing required fields: book_name, author_name, category, and price are required";
  }
  if (isNaN(price) || price < 0) {
    return "Price must be a non-negative number";
  }
  return null;
};

// Get all books
exports.getAllBooks = (req, res) => {
  console.log("GET /api/books hit");
  executeQuery(res, "SELECT * FROM books", [], "Books retrieved successfully");
};

// Get a single book by ID
exports.getBookById = (req, res) => {
  console.log(`GET /api/books/${req.params.id} hit`);
  executeQuery(
    res,
    "SELECT * FROM books WHERE book_id = ?",
    [req.params.id],
    "Book retrieved successfully",
    "Book not found"
  );
};

// Create a new book
exports.createBook = (req, res) => {
  console.log("POST /api/books hit", req.body);
  const {
    book_name,
    book_image,
    price,
    author_name,
    rating,
    summary,
    category,
    pdf_link,
  } = req.body;

  const validationError = validateBookData({
    book_name,
    author_name,
    category,
    price,
  });
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const finalRating = rating ?? [3.0, 4.0, 5.0][Math.floor(Math.random() * 3)];
  const values = [
    book_name,
    book_image || null,
    price,
    author_name,
    finalRating,
    summary || null,
    category,
    pdf_link || null,
  ];
  const query = `
        INSERT INTO books (book_name, book_image, price, author_name, rating, summary, category, pdf_link)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

  executeQuery(res, query, values, "Book uploaded successfully");
};

// Update a book by ID
exports.updateBook = (req, res) => {
  console.log(`PUT /api/books/${req.params.id} hit`, req.body);
  const {
    book_name,
    book_image,
    price,
    author_name,
    rating,
    summary,
    category,
    pdf_link,
  } = req.body;

  const validationError = validateBookData({
    book_name,
    author_name,
    category,
    price,
  });
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const values = [
    book_name,
    book_image || null,
    price,
    author_name,
    rating || null,
    summary || null,
    category,
    pdf_link || null,
    req.params.id,
  ];
  const query = `
        UPDATE books 
        SET book_name = ?, book_image = ?, price = ?, author_name = ?, rating = ?, summary = ?, category = ?, pdf_link = ?
        WHERE book_id = ?
    `;

  executeQuery(
    res,
    query,
    values,
    "Book updated successfully",
    "Book not found"
  );
};

// Delete a book by ID
exports.deleteBook = (req, res) => {
  console.log(`DELETE /api/books/${req.params.id} hit`);
  executeQuery(
    res,
    "DELETE FROM books WHERE book_id = ?",
    [req.params.id],
    "Book deleted successfully",
    "Book not found"
  );
};

module.exports = {
  getAllBooks: exports.getAllBooks,
  getBookById: exports.getBookById,
  createBook: exports.createBook,
  updateBook: exports.updateBook,
  deleteBook: exports.deleteBook,
  getBestsellers: exports.getBestsellers, // Add the new function here
};
