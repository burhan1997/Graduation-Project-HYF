import React from "react";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import "./AboutUs.css";
import { images } from "../../../public/assets/images";

const AboutUs = () => {
  return (
    <div className="container">
      <div className="about-us">
        <header className="about-us-header">
          <h1>Stronger Together</h1>
        </header>
        <section className="about-us-content">
          <p className="about-us-description">
            Welcome! We&apos;re here to help you build more meaningful
            connections and make the most of your local community. Our app is
            designed to make it easier for you to discover people nearby,
            explore shared interests, and start conversations. If you wish, you
            can even arrange to meet in person and share your experiences
            through reviews.
          </p>
          <p className="about-us-description">
            What truly matters to us is creating a space where genuine support
            and strong connections thrive. We believe that together, we can
            build a more connected and supportive community.
          </p>
          <div className="about-us-images">
            <img
              src={images.Meeting1}
              alt="People Meeting 1"
              className="about-us-image"
            />
            <img
              src={images.Meeting2}
              alt="People Meeting 2"
              className="about-us-image"
            />
            <img
              src={images.Meeting3}
              alt="People Meeting 3"
              className="about-us-image"
            />
          </div>
        </section>
        <footer className="about-us-footer">
          <img src={images.LogoGreen} alt="Logo" className="footer-logo" />
          <img src={images.LogoPurple} alt="Logo" className="footer-logo" />

          <div className="footer-slogan">Connecting People</div>
          <div className="footer-contact">
            <p>Email: contact@ourapp.com</p>
            <p>Phone: 123-456-7890</p>
          </div>
          <div className="footer-social-media">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <FaTwitter />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AboutUs;
