import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styles from "./VideoCarousel.module.css"; // Ensure you have the necessary styles

const VideoCarousel = ({ videoUrls }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings} className={styles.carousel}>
      {videoUrls.map((url, index) => (
        <div key={index}>
          <video width="100%" height="auto" controls autoPlay muted loop className={styles.video}>
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
    </Slider>
  );
};

export default VideoCarousel;
