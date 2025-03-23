import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    updateCartCount(); // Initial check on mount
    window.addEventListener("cartUpdated", updateCartCount);
    window.addEventListener("storage", updateCartCount);
    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <h1>Books</h1>
      <nav>
        <ul className="nav-links">
          <li>
            <NavLink to="/" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/explore" activeClassName="active">
              Explore
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop" activeClassName="active">
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/sell" activeClassName="active">
              Sell Your Book
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" activeClassName="active">
              <FontAwesomeIcon icon={faShoppingCart} size="xl" />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
