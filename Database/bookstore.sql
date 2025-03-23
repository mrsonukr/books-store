-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 23, 2025 at 11:56 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bookstore`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `book_id` int(11) NOT NULL,
  `book_name` varchar(255) NOT NULL,
  `book_image` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `author_name` varchar(100) NOT NULL,
  `rating` decimal(2,1) DEFAULT NULL CHECK (`rating` >= 3 and `rating` <= 5),
  `summary` text DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `pdf_link` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`book_id`, `book_name`, `book_image`, `price`, `author_name`, `rating`, `summary`, `category`, `pdf_link`) VALUES
(2, 'Mystery of the Lost Island', '/assets/images/book2.png', 14.99, 'Jane Smith', 3.0, 'A gripping mystery novel that keeps you guessing till the end.', 'Mystery', NULL),
(3, 'Learning React', '/assets/images/book3.png', 29.99, 'Alex Johnson', 5.0, 'A comprehensive guide to mastering React.js and modern web development.', 'Technology', NULL),
(4, 'Cooking Made Easy', '/assets/images/book4.png', 9.99, 'Emily Clark', 4.0, 'Simple and delicious recipes for everyday cooking.', 'Cooking', NULL),
(5, 'Echoes of the Past', '/assets/images/book5.png', 17.50, 'Michael Brown', 5.0, 'A historical tale unraveling secrets buried in time.', 'Historical Fiction', NULL),
(6, 'Quantum Secrets', '/assets/images/book6.png', 24.99, 'Sarah Lee', NULL, 'A sci-fi thriller exploring the mysteries of quantum physics.', 'Biography', 'jshjhj'),
(7, 'The Silent Forest', '/assets/images/book7.png', 12.99, 'David Kim', 3.0, 'A chilling suspense story set in a haunted woodland.', 'Thriller', NULL),
(8, 'Python for Beginners', '/assets/images/book8.png', 22.00, 'Laura Evans', 5.0, 'A beginner-friendly guide to mastering Python programming.', 'Technology', NULL),
(9, 'Taste of Italy', '/assets/images/book9.png', 15.75, 'Gina Rossi', 4.0, 'Authentic Italian recipes to bring the flavors of Italy home.', 'Cooking', NULL),
(10, 'The Lost Expedition', '/assets/images/book10.png', 18.25, 'Tom Hardy', 4.0, 'An adventurer’s perilous quest in the Amazon jungle.', 'Adventure', NULL),
(11, 'Shadows of Doubt', '/assets/images/book11.png', 13.99, 'Emma Watson', 3.0, 'A detective novel filled with twists and unexpected turns.', 'Mystery', NULL),
(12, 'Beyond the Stars', '/assets/images/book12.png', 26.50, 'Neil Carter', 5.0, 'A futuristic saga of humanity’s journey across the galaxy.', 'Science Fiction', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`book_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `book_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10010;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
