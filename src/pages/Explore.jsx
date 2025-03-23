import React from "react";
import Header from "../components/Header/Header";
import BookSearch from "../components/Search/BookSearch";
import FeatCard from "../components/Featured/FeatCard";
import Footer from "../components/Footer/Footer";

function HomePage() {
  return (
    <div>
      <Header />
      {/* Main content area */}
      <main className="flex-1 overflow-y-auto">
        <div className="h-[65px] bg-purple-200"></div>
        <section className="award margin bg-purple-200">
          <div className="details">
            <h1 className="py-4">Find Your Favorite — 1200+ Books Available</h1>
            <BookSearch />
          </div>
          <img src="/assets/images/books-search.webp" alt="Award" />
        </section>
        <FeatCard title="New Releases" />
        <FeatCard title="Top Rated Books" />
        <FeatCard title="Our Suggetion" />
        <FeatCard title="Most Popular Books" />
        <Footer />
      </main>
    </div>
  );
}

export default HomePage;
