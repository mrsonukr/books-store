import React, { useRef, useState, useEffect, useCallback } from "react";
import "./FeatCard.css";
import { Button } from "@radix-ui/themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import Notification from "../Notifiaction/Notification";

// Hardcoded book data from SQL dump
const staticBooks = [
  {
    book_id: 2,
    book_name: "Mystery of the Lost Island",
    book_image: "/assets/images/book2.png",
    price: 14.99,
    author_name: "Jane Smith",
    rating: 3.0,
    summary: "A gripping mystery novel that keeps you guessing till the end.",
    category: "Mystery",
    pdf_link: null,
  },
  {
    book_id: 3,
    book_name: "Learning React",
    book_image: "/assets/images/book3.png",
    price: 29.99,
    author_name: "Alex Johnson",
    rating: 5.0,
    summary: "A comprehensive guide to mastering React.js and modern web development.",
    category: "Technology",
    pdf_link: null,
  },
  {
    book_id: 4,
    book_name: "Cooking Made Easy",
    book_image: "/assets/images/book4.png",
    price: 9.99,
    author_name: "Emily Clark",
    rating: 4.0,
    summary: "Simple and delicious recipes for everyday cooking.",
    category: "Cooking",
    pdf_link: null,
  },
  {
    book_id: 5,
    book_name: "Echoes of the Past",
    book_image: "/assets/images/book5.png",
    price: 17.50,
    author_name: "Michael Brown",
    rating: 5.0,
    summary: "A historical tale unraveling secrets buried in time.",
    category: "Historical Fiction",
    pdf_link: null,
  },
  {
    book_id: 6,
    book_name: "Quantum Secrets",
    book_image: "/assets/images/book6.png",
    price: 24.99,
    author_name: "Sarah Lee",
    rating: null,
    summary: "A sci-fi thriller exploring the mysteries of quantum physics.",
    category: "Biography",
    pdf_link: "jshjhj",
  },
  {
    book_id: 7,
    book_name: "The Silent Forest",
    book_image: "/assets/images/book7.png",
    price: 12.99,
    author_name: "David Kim",
    rating: 3.0,
    summary: "A chilling suspense story set in a haunted woodland.",
    category: "Thriller",
    pdf_link: null,
  },
  {
    book_id: 8,
    book_name: "Python for Beginners",
    book_image: "/assets/images/book8.png",
    price: 22.00,
    author_name: "Laura Evans",
    rating: 5.0,
    summary: "A beginner-friendly guide to mastering Python programming.",
    category: "Technology",
    pdf_link: null,
  },
  {
    book_id: 9,
    book_name: "Taste of Italy",
    book_image: "/assets/images/book9.png",
    price: 15.75,
    author_name: "Gina Rossi",
    rating: 4.0,
    summary: "Authentic Italian recipes to bring the flavors of Italy home.",
    category: "Cooking",
    pdf_link: null,
  },
  {
    book_id: 10,
    book_name: "The Lost Expedition",
    book_image: "/assets/images/book10.png",
    price: 18.25,
    author_name: "Tom Hardy",
    rating: 4.0,
    summary: "An adventurer’s perilous quest in the Amazon jungle.",
    category: "Adventure",
    pdf_link: null,
  },
  {
    book_id: 11,
    book_name: "Shadows of Doubt",
    book_image: "/assets/images/book11.png",
    price: 13.99,
    author_name: "Emma Watson",
    rating: 3.0,
    summary: "A detective novel filled with twists and unexpected turns.",
    category: "Mystery",
    pdf_link: null,
  },
  {
    book_id: 12,
    book_name: "Beyond the Stars",
    book_image: "/assets/images/book12.png",
    price: 26.50,
    author_name: "Neil Carter",
    rating: 5.0,
    summary: "A futuristic saga of humanity’s journey across the galaxy.",
    category: "Science Fiction",
    pdf_link: null,
  },
];

const FeatCard = ({ title = "Best Seller Books" }) => {
  const scrollContainerRef = useRef(null);
  const sectionRef = useRef(null);
  const [showLeftOverlay, setShowLeftOverlay] = useState(false);
  const [showRightOverlay, setShowRightOverlay] = useState(false);
  const [books] = useState(staticBooks); // Use static data directly
  const [notifications, setNotifications] = useState([]);
  const [showSkeleton, setShowSkeleton] = useState(true); // Show skeleton initially
  const [isHistoryNavigation, setIsHistoryNavigation] = useState(false);

  const updateOverlays = useCallback(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
    setShowLeftOverlay(scrollLeft > 0);
    setShowRightOverlay(scrollLeft < scrollWidth - clientWidth - 1);
  }, []);

  // Detect navigation via back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setIsHistoryNavigation(true);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Intersection Observer for skeleton transition
  useEffect(() => {
    const currentSection = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!isHistoryNavigation) {
            setTimeout(() => {
              setShowSkeleton(false);
              setTimeout(updateOverlays, 100);
            }, 1000);
          } else {
            setShowSkeleton(false);
            updateOverlays();
          }
        }
      },
      { threshold: 0.1 }
    );

    if (currentSection) observer.observe(currentSection);
    return () => {
      if (currentSection) observer.unobserve(currentSection);
    };
  }, [updateOverlays, isHistoryNavigation]);

  // Scroll event listener for overlays
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", updateOverlays);
      if (!showSkeleton) updateOverlays();
      return () => scrollContainer.removeEventListener("scroll", updateOverlays);
    }
  }, [updateOverlays, showSkeleton]);

  // Notification timeout cleanup
  useEffect(() => {
    const timeoutIds = notifications.map((notification) =>
      setTimeout(() => removeNotification(notification.id), 5000)
    );
    return () => timeoutIds.forEach(clearTimeout);
  }, [notifications]);

  const addNotification = (type, message) => {
    const newNotification = { id: Date.now(), type, message };
    setNotifications((prev) => [...prev, newNotification]);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const addToCart = (book) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const isBookInCart = existingCart.some(
      (item) => item.book_id === book.book_id
    );

    if (!isBookInCart) {
      const updatedCart = [...existingCart, book];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      window.dispatchEvent(new Event("cartUpdated"));
      addNotification(
        "success",
        `${book.book_name} has been added to your cart!`
      );
    } else {
      addNotification("info", `${book.book_name} is already in your cart!`);
    }
  };

  const scrollToItem = (index) => {
    const cardWidth = 200;
    const gap = 40;
    const scrollPosition = index * (cardWidth + gap);
    scrollContainerRef.current.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  };

  const SkeletonLoader = () => (
    <div className="scroll-container">
      <div className="book-scroll">
        {Array.from({ length: 5 }).map((_, index) => (
          <div className="book-card skeleton" key={index}>
            <div className="book-img skeleton-img"></div>
            <div className="title">
              <div className="skeleton-title"></div>
              <div className="skeleton-subtitle"></div>
              <div className="skeleton-summary"></div>
              <Button className="addtocart skeleton-button" disabled></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (books.length === 0 && !showSkeleton) return <p>No books available.</p>;

  return (
    <>
      <Notification notifications={notifications} onClose={removeNotification} />
      <section className="Fead-card" ref={sectionRef}>
        <h1 className="heading">{title}</h1>
        {showSkeleton && !isHistoryNavigation ? (
          <SkeletonLoader />
        ) : (
          <div className="scroll-container">
            <div className="book-scroll" ref={scrollContainerRef}>
              {books.map((book) => (
                <div className="book-card" key={book.book_id}>
                  <div className="book-img">
                    <img src={book.book_image} alt={book.book_name} />
                    <div className="price">
                      <h2>₹{book.price}</h2>
                    </div>
                  </div>
                  <div className="title">
                    <h1>{book.book_name}</h1>
                    <div className="subtitle">
                      <p>{book.author_name} •</p>
                      <div className="rating">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <FontAwesomeIcon
                            key={index}
                            icon={faStar}
                            size="sm"
                            style={{
                              color:
                                index < parseInt(book.rating || 0)
                                  ? "#84cc16"
                                  : "#c7d2fe",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="summary">
                      <p>{book.summary}</p>
                    </div>
                    <Button
                      className="addtocart"
                      onClick={() => addToCart(book)}
                    >
                      <FontAwesomeIcon icon={faCartPlus} size="lg" /> Add To Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div
              className={`overlay left-overlay ${
                showLeftOverlay ? "visible" : ""
              }`}
            ></div>
            <div
              className={`overlay right-overlay ${
                showRightOverlay ? "visible" : ""
              }`}
            ></div>
          </div>
        )}
        {!showSkeleton && (
          <div className="dots">
            {books.map((_, index) => (
              <button
                key={index}
                className="dot"
                onClick={() => scrollToItem(index)}
                aria-label={`Scroll to book ${index + 1}`}
              ></button>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default FeatCard;