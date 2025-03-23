import React from "react";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import FeatCard from "../components/Featured/FeatCard";
import Favorite from "../components/Favorite/Favorite";
import Footer from "../components/Footer/Footer";

function HomePage() {
  return (
    <div>
      <Header />
      <Hero />
      <FeatCard title="Best Seller Books" />
      <Favorite />
      <FeatCard title="New Releases" />
      <Footer />
    </div>
  );
}

export default HomePage;
