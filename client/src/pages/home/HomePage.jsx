import React, { useEffect, useState } from "react";
import { homepageSlideshowImages } from "../../../public/assets/homepageImages/homepageImages";
import "./HomePage.css";

const HomePage = () => {
  const images = [...homepageSlideshowImages];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const homepageInterval = setInterval(() => {
      setIndex((prevIndex) => {
        return (prevIndex + 1) % images.length;
      });
    }, 6000);

    return () => clearInterval(homepageInterval);
  }, []);

  return (
    <div className="homepage-slideshow-container">
      <img
        src={images[index]}
        alt="people using the app"
        className="homepage-slideshow-image active"
      />
    </div>
  );
};

export default HomePage;
