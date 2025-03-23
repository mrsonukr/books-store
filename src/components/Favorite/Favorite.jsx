import React from "react";
import "./Favorite.css";
import { Button } from "@radix-ui/themes";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { useNavigate } from "react-router-dom";
const Favorite = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });
  const navigate = useNavigate();

  return (
    <>
      <section className="favorite">
        <div className="container">
          <div className="favorite-img">
            <img src="/assets/images/favoritebook.jpg" alt="Favorite Book" />
          </div>
          <div className="favorite-info">
            <div className="details">
              <h1>Find Your favorite</h1>
              <h1 className="hlight">book here!</h1>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo ad
                non reprehenderit. Reiciendis illo iusto incidunt distinctio
                exercitationem officiis dicta dolores dolorem ea! Non saepe,
                voluptatum cupiditate beatae in dolore!
              </p>

              <div className="stats" ref={ref}>
                <div className="stat">
                  <h2>
                    {inView && <CountUp start={0} end={800} duration={2} />}+
                  </h2>
                  <p>Book Listing</p>
                </div>
                <div className="stat">
                  <h2>
                    {inView && <CountUp start={0} end={550} duration={2} />}+
                  </h2>
                  <p>Register User</p>
                </div>
                <div className="stat">
                  <h2>
                    {inView && <CountUp start={0} end={1200} duration={2} />}+
                  </h2>
                  <p>Books Sold</p>
                </div>
              </div>
            </div>
            <Button className="explore" onClick={() => navigate("/explore")}>
              Explore Now
            </Button>
          </div>
        </div>
      </section>

      <section className="award  bg-yellow-100">
        <div className="details">
          <h1>2025 National Book Awards for Fiction Shortlist</h1>
          <Button className="explore">Explore Now</Button>
        </div>
        <img src="/assets/images/award.png" alt="Award" />
      </section>
    </>
  );
};

export default Favorite;
