import React, { useRef, useState, useEffect, useCallback } from "react";
import "./FeatCard.css";
import { Button } from "@radix-ui/themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import Notification from "../Notifiaction/Notification";

// Simple in-memory cache to persist fetched books
let cachedBooks = null;

const FeatCard = ({ title = "Best Seller Books" }) => {
  const scrollContainerRef = useRef(null);
  const sectionRef = useRef(null);
  const [showLeftOverlay, setShowLeftOverlay] = useState(false);
  const [showRightOverlay, setShowRightOverlay] = useState(false);
  const [books, setBooks] = useState(cachedBooks || []);
  const [loading, setLoading] = useState(!cachedBooks); // Only load if no cache
  const [showSkeleton, setShowSkeleton] = useState(!cachedBooks); // Only show skeleton if no cache
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isHistoryNavigation, setIsHistoryNavigation] = useState(false); // Track back/forward navigation

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
      setIsHistoryNavigation(true); // Set flag when navigating via history
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Fetch books only if not cached
  useEffect(() => {
    const fetchBooks = async () => {
      if (cachedBooks) {
        setBooks(cachedBooks);
        setLoading(false);
        setShowSkeleton(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/books");
        const result = await response.json();
        if (result.status === "success") {
          const shuffledBooks = result.data.sort(() => Math.random() - 0.5);
          setBooks(shuffledBooks);
          cachedBooks = shuffledBooks; // Cache the books
          setLoading(false);
        } else {
          setError("Failed to fetch books");
          addNotification("error", "Failed to fetch books");
        }
      } catch (err) {
        setError("Error fetching books: " + err.message);
        addNotification("error", "Error fetching books: " + err.message);
      }
    };

    fetchBooks();
  }, []);

  // Intersection Observer to handle visibility and skeleton transition
  useEffect(() => {
    const currentSection = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading) {
          if (!cachedBooks || !isHistoryNavigation) {
            // Show skeleton with animation on initial load
            setTimeout(() => {
              setShowSkeleton(false);
              setTimeout(updateOverlays, 100);
            }, 1000);
          } else {
            // Skip animation on history navigation or cached data
            setShowSkeleton(false);
            updateOverlays();
          }
        }
      },
      { threshold: 0.1 }
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, [loading, updateOverlays, isHistoryNavigation]);

  // Scroll event listener for overlays
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", updateOverlays);
      if (!loading && !showSkeleton) updateOverlays();
      return () =>
        scrollContainer.removeEventListener("scroll", updateOverlays);
    }
  }, [updateOverlays, loading, showSkeleton]);

  // Notification timeout cleanup
  useEffect(() => {
    const timeoutIds = notifications.map((notification) =>
      setTimeout(() => removeNotification(notification.id), 5000)
    );
    return () => timeoutIds.forEach(clearTimeout);
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

  const displayedBooks = books.slice(0, 10);

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

  if (error) return <p>{error}</p>;
  if (displayedBooks.length === 0 && !loading && !showSkeleton)
    return <p>No books available.</p>;

  return (
    <>
      <Notification notifications={notifications} onClose={removeNotification} />
      <section className="Fead-card" ref={sectionRef}>
        <h1 className="heading">{title}</h1>
        {showSkeleton && !isHistoryNavigation ? ( // Only show skeleton on initial load
          <SkeletonLoader />
        ) : (
          <div className="scroll-container">
            <div className="book-scroll" ref={scrollContainerRef}>
              {displayedBooks.map((book) => (
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
        {!showSkeleton && !loading && (
          <div className="dots">
            {displayedBooks.map((_, index) => (
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