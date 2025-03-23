# Books Store Design

![Books Store Design Preview](/Introduction/Thumbnail.png)

This repository contains the **UI/UX design** for a modern online bookstore application. The design includes both **User** and **Admin** panels, focusing on a clean, intuitive, and responsive interface for browsing, buying, and managing books. The design is created using React with modern libraries and frameworks to ensure a seamless user experience.

## Visit Demo Website

[View Demo](https://d09a7310.books-2fb.pages.dev)

## Figma Design

Explore the full UI/UX design on Figma Community:  
[Books Store Design](https://www.figma.com/community/file/1485592484087100188/books-store-design)

## Table of Contents

- [Overview](#overview)
- [Design Features](#design-features)
  - [User Panel](#user-panel)
  - [Admin Panel](#admin-panel)
- [Technologies Used](#technologies-used)
- [Design Structure](#design-structure)
- [Setup for Development](#setup-for-development)
- [Screenshots](#screenshots)
- [Future Implementation](#future-implementation)
- [Contributing](#contributing)
- [License](#license)

## Overview

The Books Store Design is a visually appealing and user-friendly interface for an online bookstore. It caters to two types of users:

- **Users**: Can browse books, search for their favorites, add books to the cart, and proceed to checkout.
- **Admins**: Can manage the book inventory, view orders, and monitor user activities through a dedicated dashboard.

The design emphasizes modern aesthetics with a pastel color scheme, clear typography, and intuitive navigation.

## Design Features

### User Panel

- **Home Page**:
  - Hero section with a call-to-action to "Buy and sell your books for the best prices."
  - Search bar for finding books.
  - Sections for New Releases, Best Sellers, Top Rated books, and 2025 National Book Awards shortlist.
- **Book Listings**:
  - Display books with cover images, titles, prices, and "Add to Cart" buttons.
  - Categories like New Releases and Most Popular Books.
- **Cart & Checkout**:
  - View selected books with a summary of the order (e.g., price, shipping, total).
  - Clean layout for a seamless checkout process.
- **Error Handling**:
  - Custom 404 page with a message: "Oops! Page Not Found."
- **Responsive Design**:
  - Fully responsive layout for desktops, tablets, and mobile devices.

### Admin Panel

- **Dashboard**:
  - Overview of book inventory with a table listing books, authors, categories, prices, and actions (edit/delete).
- **Books Management**:
  - Interface to add, update, or remove books from the inventory.
- **Minimalist Design**:
  - Clean and functional layout with a focus on usability for admins.

## Technologies Used

- **Frontend**:

  - [React](https://reactjs.org/): JavaScript library for building the user interface.
  - [Radix UI](https://www.radix-ui.com/): Accessible and customizable UI components.
  - [SwiperJS](https://swiperjs.com/): For creating carousels to showcase books.
  - [Tailwind CSS](https://tailwindcss.com/): Utility-first CSS framework for styling the design.
  - [FontAwesome](https://fontawesome.com/): Icon library for adding icons (e.g., cart, search, navigation).

- **Planned Backend** (for future implementation):
  - [Express.js](https://expressjs.com/): Node.js framework for building RESTful APIs.
  - [MySQL](https://www.mysql.com/): Relational database for storing book, user, and order data.
