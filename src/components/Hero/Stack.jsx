// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

import "./Stack.css";

// import required modules
import { EffectCards } from "swiper/modules";

export default function Stack() {
  return (
    <>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="/assets/images/slide1.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/images/slide2.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/images/slide3.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/images/slide4.png" alt="" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
