import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@radix-ui/themes";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const cartItemsRef = useRef(null);
  const summaryRef = useRef(null);
  const [shouldStick, setShouldStick] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      const transformedCart = parsedCart.map((item) => ({
        id: item.book_id,
        title: item.book_name,
        author: item.author_name,
        price: parseFloat(item.price),
        image: item.book_image,
        rating: parseFloat(item.rating),
      }));
      setCartItems(transformedCart);
    }
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price),
    0
  );

  // Calculate shipping charge
  const shippingCharge = subtotal === 0 || subtotal >= 499 ? 0 : 80;
  const total = subtotal + shippingCharge;

  const removeItem = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem(
      "cart",
      JSON.stringify(
        updatedItems.map((item) => ({
          book_id: item.id,
          book_name: item.title,
          book_image: item.image,
          price: item.price,
          author_name: item.author,
          rating: item.rating,
        }))
      )
    );

    window.dispatchEvent(new Event("cartUpdated"));
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!cartItemsRef.current || !summaryRef.current) return;
      const cartItemsRect = cartItemsRef.current.getBoundingClientRect();
      const summaryHeight = summaryRef.current.getBoundingClientRect().height;
      if (cartItemsRect.bottom >= summaryHeight) {
        setShouldStick(true);
      } else {
        setShouldStick(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [cartItems]);

  return (
    <>
      <Header />
      <div className="min-h-screen py-10 pt-20 bg-zinc-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-zinc-900">Your Cart</h1>
            <p className="text-zinc-500">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2" ref={cartItemsRef}>
              {cartItems.length === 0 ? (
                <div className="bg-zinc-100 rounded-lg p-6 text-center">
                  <p className="text-zinc-600">Your cart is empty</p>
                  <Link
                    to="/"
                    className="mt-2 inline-block text-zinc-700 hover:text-zinc-900 font-medium"
                  >
                    Browse Books →
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-lg p-4 flex items-center justify-between border border-zinc-200"
                    >
                      <div className="flex items-start">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-24 object-cover rounded-md"
                        />
                        <div className="ml-4">
                          <h3 className="text-[16px] font-normal text-zinc-900 leading-none mb-1 mt-4">
                            {item.title}
                          </h3>
                          <p className="text-zinc-500 mt-1 mb-1 text-[13px]">
                            {item.author}
                          </p>
                          <div className="flex items-center mt-1">
                            {Array.from({ length: 5 }).map((_, index) => (
                              <FontAwesomeIcon
                                key={index}
                                icon={faStar}
                                className={
                                  index < item.rating
                                    ? "text-zinc-700"
                                    : "text-zinc-300"
                                }
                                size="sm"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex-col items-center space-x-4 mr-5">
                        <p className="text-zinc-900 font-semibold">
                          ₹{item.price.toFixed(2)}
                        </p>
                        <svg
                          className="text-zinc-600 hover:text-red-500 fill-current cursor-pointer"
                          onClick={() => removeItem(item.id)}
                          height="22"
                          width="22"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 128 128"
                        >
                          <path d="M 49 1 C 47.34 1 46 2.34 46 4 C 46 5.66 47.34 7 49 7 L 79 7 C 80.66 7 82 5.66 82 4 C 82 2.34 80.66 1 79 1 L 49 1 z M 24 15 C 16.83 15 11 20.83 11 28 C 11 35.17 16.83 41 24 41 L 101 41 L 101 104 C 101 113.37 93.37 121 84 121 L 44 121 C 34.63 121 27 113.37 27 104 L 27 52 C 27 50.34 25.66 49 24 49 C 22.34 49 21 50.34 21 52 L 21 104 C 21 116.68 31.32 127 44 127 L 84 127 C 96.68 127 107 116.68 107 104 L 107 40.640625 C 112.72 39.280625 117 34.14 117 28 C 117 20.83 111.17 15 104 15 L 24 15 z M 24 21 L 104 21 C 107.86 21 111 24.14 111 28 C 111 31.86 107.86 35 104 35 L 24 35 C 20.14 35 17 31.86 17 28 C 17 24.14 20.14 21 24 21 z M 50 55 C 48.34 55 47 56.34 47 58 L 47 104 C 47 105.66 48.34 107 50 107 C 51.66 107 53 105.66 53 104 L 53 58 C 53 56.34 51.66 55 50 55 z M 78 55 C 76.34 55 75 56.34 75 58 L 75 104 C 75 105.66 76.34 107 78 107 C 79.66 107 81 105.66 81 104 L 81 58 C 81 56.34 79.66 55 78 55 z"></path>
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div
              ref={summaryRef}
              className={`bg-white rounded-lg p-6 border border-zinc-200 h-max ${
                shouldStick ? "sticky top-24" : ""
              }`}
            >
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span className="text-zinc-700">Subtotal</span>
                <span className="text-zinc-900 font-medium">
                  ₹{subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-zinc-700">Shipping</span>
                <span className="text-zinc-900 font-medium">
                  {shippingCharge === 0
                    ? "Free"
                    : `₹${shippingCharge.toFixed(2)}`}
                </span>
              </div>
              {subtotal > 0 && subtotal < 499 && (
                <div className="mb-3 text-sm text-zinc-500">
                  Spend ₹{(499 - subtotal).toFixed(2)} more to get{" "}
                  <span className="font-semibold">FREE Shipping</span>!
                </div>
              )}
              <hr />

              <div className="border-t border-zinc-200 my-4"></div>

              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <Button className="mt-4 w-full bg-zinc-900 cursor-pointer text-white py-2 rounded-lg hover:bg-zinc-800">
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
