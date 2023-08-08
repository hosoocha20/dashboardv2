import React from "react";
import TimeWidget from "./Welcome Card/TimeWidget";
import WeatherWidget from "./Welcome Card/WeatherWidget";
import "./WelcomeCard.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css/pagination";
import "swiper/css";
function WelcomeCard() {
  return (
    <div className="widgets">
      <div className="widgets-laptop-view">
        <TimeWidget />
        <WeatherWidget />
      </div>
      <div className="widgets-mobile-view">
        <Swiper
          pagination={true}
          modules={[Pagination]}
          spaceBetween={10}
          className="widgetsSwiper"
        >
          <SwiperSlide>
            <div className="widgetsSlider">
              <TimeWidget />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="widgetsSlider">
              <WeatherWidget />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default WelcomeCard;
